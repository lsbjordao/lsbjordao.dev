import { PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import { mixRegister } from "./registers";
import {
  resolveAct,
  resolveRegister,
  type ActWindow,
  type SectionWindow,
} from "./progress";
import { stepSpring } from "./spring";
import type { Act, ActContext, ActId } from "./types";

export type DirectorOptions = {
  /** Chamado quando o ato ativo muda; alimenta a barra de escala. */
  onAct: (id: ActId | null) => void;
  reducedMotion: boolean;
  compact: boolean;
};

/** Rigidez da mola da câmera. Alto demais reintroduz o jitter do scroll. */
const OMEGA = 6;

/** Largura da zona de mistura do registro, em pixels de documento. */
const BAND = 220;

export function createDirector(canvas: HTMLCanvasElement, opts: DirectorOptions) {
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: !opts.compact,
    powerPreference: "low-power",
  });
  renderer.setClearAlpha(0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.compact ? 1 : 1.75));
  // A limpeza é manual porque precisa acontecer com o scissor desligado,
  // enquanto o render acontece com ele ligado.
  renderer.autoClear = false;

  const scene = new Scene();
  const camera = new PerspectiveCamera(38, 1, 0.1, 100);

  let pointer: { x: number; y: number } | null = null;

  const acts: Act[] = [];
  const ctx: ActContext = {
    budget: { particles: opts.compact ? 2000 : 8000, segments: opts.compact ? 32 : 96 },
    pointer: () => pointer,
  };

  let frame = 0;
  let disposed = false;
  let last = performance.now();
  const start = last;

  /** Estado da mola por eixo, para posição e alvo da câmera. */
  const cam = {
    pos: [0, 0, 3].map((v) => ({ value: v, velocity: 0 })),
    tgt: [0, 0, 0].map((v) => ({ value: v, velocity: 0 })),
  };
  const alvoTemp = new Vector3();

  let activeId: ActId | null = null;
  /** Último ato que esteve em quadro: é ele que fica durante a travessia. */
  let inFrameId: ActId | null = null;
  let windows: ActWindow[] = [];
  let sections: SectionWindow[] = [];

  /**
   * Mede o layout. Chamado no mount e a cada resize — nunca por frame, para
   * que `getBoundingClientRect` não force reflow dentro do rAF. Um resize
   * remede sem reconstruir geometria nenhuma.
   */
  const measure = () => {
    renderer.setSize(window.innerWidth, window.innerHeight, false);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    windows = acts.flatMap((act) => {
      const el = document.querySelector(act.anchor);
      if (!el) return [];
      const rect = el.getBoundingClientRect();
      return [{ id: act.id, top: rect.top + window.scrollY, height: rect.height }];
    });

    sections = Array.from(document.querySelectorAll<HTMLElement>("[data-register]")).map(
      (el) => {
        const rect = el.getBoundingClientRect();
        return {
          top: rect.top + window.scrollY,
          height: rect.height,
          register: el.dataset.register === "lamina" ? "lamina" : "prancha",
        };
      },
    );
  };

  const draw = (now: number) => {
    frame = 0;
    if (disposed) return;

    const dt = Math.max((now - last) / 1000, 0);
    last = now;
    const t = (now - start) / 1000;

    const center = window.scrollY + window.innerHeight / 2;
    const active = resolveAct(windows, center);
    const uniforms = mixRegister(resolveRegister(sections, center, BAND));

    if ((active?.id ?? null) !== activeId) {
      activeId = active?.id ?? null;
      opts.onAct(activeId);
    }
    if (active) inFrameId = active.id;

    // Na travessia o ato anterior continua em quadro, retintado: é o que faz
    // "a mesma estrutura, dois modos de ver" acontecer de fato.
    const emQuadro = acts.find((a) => a.id === (inFrameId ?? acts[0]?.id));

    if (emQuadro) {
      const progress = active?.progress ?? 1;
      emQuadro.update(t, progress, uniforms);

      const station = emQuadro.station(progress);
      const molas = [cam.pos, cam.tgt] as const;
      const alvos = [station.position, station.target] as const;
      for (let s = 0; s < 2; s += 1) {
        const eixos = [alvos[s].x, alvos[s].y, alvos[s].z];
        for (let i = 0; i < 3; i += 1) {
          molas[s][i] = opts.reducedMotion
            ? { value: eixos[i], velocity: 0 }
            : stepSpring(molas[s][i].value, molas[s][i].velocity, eixos[i], OMEGA, dt);
        }
      }
      camera.position.set(cam.pos[0].value, cam.pos[1].value, cam.pos[2].value);
      camera.lookAt(alvoTemp.set(cam.tgt[0].value, cam.tgt[1].value, cam.tgt[2].value));

    }

    // A tela inteira é limpa com o scissor desligado. Se limpasse com ele
    // ligado, o lado de fora do recorte guardaria os pixels do frame anterior.
    renderer.setScissorTest(false);
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.clear();

    if (emQuadro) {
      // Um ato pode pedir para ser recortado no rect de um elemento. A origem
      // do scissor é embaixo à esquerda; a do getBoundingClientRect, em cima.
      const clip = emQuadro.frame?.();
      if (clip) {
        const r = clip.getBoundingClientRect();
        const y = window.innerHeight - r.bottom;
        renderer.setScissorTest(true);
        renderer.setScissor(r.left, y, r.width, r.height);
        renderer.setViewport(r.left, y, r.width, r.height);
        camera.aspect = r.height > 0 ? r.width / r.height : 1;
        camera.updateProjectionMatrix();
      } else if (camera.aspect !== window.innerWidth / window.innerHeight) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
      renderer.render(scene, camera);
    }

    if (!opts.reducedMotion) schedule();
  };

  const schedule = () => {
    if (frame || disposed) return;
    frame = requestAnimationFrame(draw);
  };

  const onScroll = () => schedule();
  const onResize = () => {
    measure();
    schedule();
  };
  const onPointer = (event: PointerEvent) => {
    if (event.pointerType !== "mouse") return;
    pointer = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -((event.clientY / window.innerHeight) * 2 - 1),
    };
  };
  const onVisibility = () => {
    if (document.hidden) {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    } else {
      // Sem isto o primeiro dt depois de voltar seria o tempo todo em que a aba
      // ficou escondida.
      last = performance.now();
      schedule();
    }
  };
  const onLost = (event: Event) => {
    event.preventDefault();
    canvas.style.display = "none";
    disposed = true;
  };

  measure();
  schedule();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  window.addEventListener("pointermove", onPointer, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  canvas.addEventListener("webglcontextlost", onLost);

  return {
    /** Registra um ato. Chamado antes do primeiro frame útil. */
    add(act: Act) {
      acts.push(act);
      scene.add(act.build(ctx));
      measure();
      schedule();
    },
    destroy() {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      for (const act of acts) act.dispose();
      renderer.dispose();
    },
  };
}
