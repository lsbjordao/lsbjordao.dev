import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Points,
  PointsMaterial,
  Vector3,
} from "three";
import { haloTexture } from "../glow";
import { pseudoRandom } from "../random";
import type { RegisterUniforms } from "../registers";
import type { Act, ActContext } from "../types";

/**
 * Ato I — partículas em suspensão sobre o hero.
 *
 * Este ato tinha um ramo de *Mimosa osmarii* procedural, gerado pelo mesmo hash
 * do `Frond.tsx`, com folíolos instanciados e tigmonastia no ponteiro. A ideia
 * era boa no papel e ruim na tela: 756 quads pequenos não leem como folha
 * bipinada, leem como manchas, e ao lado da foto real do espécime a comparação
 * era desfavorável. Removido em 2026-08-11 por decisão do Lucas, olhando o
 * resultado renderizado.
 *
 * O que sobrou é deliberadamente mínimo: partículas com halo, à deriva. Não
 * afirma ser nada — e por isso a barra de escala fica vazia neste ato, já que
 * não há espécime para escalar. Dizer "5 cm" sem objeto medido seria uma
 * alegação falsa numa página que argumenta rigor.
 *
 * A lição para os atos seguintes: geometria orgânica procedural competindo com
 * fotografia real do mesmo objeto tende a perder. O tricoma e o cladograma não
 * têm foto ao lado, então não caem nessa armadilha — mas convém olhar cada um
 * renderizado antes de investir nele.
 */
export function createBranchAct(): Act {
  const group = new Group();
  const geometry = new BufferGeometry();
  const halo = haloTexture(64);
  const material = new PointsMaterial({
    size: 0.026,
    map: halo,
    transparent: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });
  const points = new Points(geometry, material);
  const haloColor = new Color();

  return {
    id: "branch",
    anchor: "#top",
    /** Vazio: não há espécime em quadro, então não há escala a declarar. */
    scale: { pt: "", en: "" },

    build(ctx: ActContext) {
      const total = Math.floor(ctx.budget.particles / 2);
      const pos = new Float32Array(total * 3);
      for (let i = 0; i < total; i += 1) {
        pos[i * 3] = (pseudoRandom(i, 1) - 0.5) * 2.4;
        pos[i * 3 + 1] = (pseudoRandom(i, 2) - 0.5) * 1.8;
        pos[i * 3 + 2] = (pseudoRandom(i, 3) - 0.5) * 1.6;
      }
      geometry.setAttribute("position", new Float32BufferAttribute(pos, 3));
      group.add(points);
      return group;
    },

    update(t: number, _progress: number, register: RegisterUniforms) {
      haloColor.setRGB(register.halo[0], register.halo[1], register.halo[2]);
      material.color.copy(haloColor);
      material.opacity = register.haloAlpha;
      // No papel o blending aditivo não tem brilho para somar e as partículas
      // virariam quadrados escuros. Melhor não desenhá-las.
      points.visible = register.haloAlpha > 0.01;

      // A deriva move o objeto, não as 4.000 posições: a variação entre
      // partículas já está congelada no atributo, e o embalo a matriz resolve.
      points.rotation.y = t * 0.02;
      points.position.y = Math.sin(t * 0.35) * 0.03;
    },

    station(progress: number) {
      return {
        position: new Vector3(0.45 + progress * 0.25, 0.12 - progress * 0.3, 2.1),
        target: new Vector3(0.25, -0.05, 0),
      };
    },

    dispose() {
      geometry.dispose();
      material.dispose();
      halo.dispose();
    },
  };
}
