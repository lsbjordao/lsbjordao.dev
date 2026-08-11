"use client";

import { useEffect, useRef, useState } from "react";
import { copy as allCopy } from "@/data/copy";
import type { Lang } from "@/data/site";
import type { ActId } from "../_3d/progress";

/**
 * O shell da cena. Renderiza canvas vazio e barra de escala; o diretor e o
 * three.js entram por `import()` depois do first paint, então o LCP da página
 * não muda. Se WebGL não subir, o canvas sai do DOM e a página fica exatamente
 * como era — nada do conteúdo depende dele.
 */
export default function Stage({ lang }: { lang: Lang }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [act, setAct] = useState<ActId | null>(null);
  const c = allCopy[lang];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Quem pediu para economizar dados não pediu por atmosfera.
    const connection = (navigator as { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData || !("WebGL2RenderingContext" in window)) {
      canvas.remove();
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 820px)").matches;

    let director: { destroy(): void } | null = null;
    let cancelled = false;

    const boot = async () => {
      try {
        const { createDirector } = await import("../_3d/director");
        if (cancelled) return;
        director = createDirector(canvas, { onAct: setAct, reducedMotion, compact });
      } catch {
        // Contexto que não sobe não é erro do visitante: a página inteira
        // funciona sem a cena, então o silêncio aqui é deliberado.
        canvas.remove();
      }
    };

    const idle =
      window.requestIdleCallback ?? ((cb: IdleRequestCallback) => window.setTimeout(cb, 200));
    const handle = idle(() => void boot());

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) window.cancelIdleCallback(handle as number);
      director?.destroy();
    };
  }, []);

  const legenda = act ? c.stage.scale[act] : "";

  return (
    <>
      <canvas className="stage" ref={canvasRef} aria-hidden="true" />
      {/* A barra de escala é conteúdo, não decoração: fica fora do aria-hidden. */}
      <div className="stage-scale" hidden={!legenda}>
        <span>{c.stage.label}</span>
        <strong>{legenda}</strong>
      </div>
    </>
  );
}
