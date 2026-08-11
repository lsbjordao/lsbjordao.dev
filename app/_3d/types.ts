import type { Object3D, Vector3 } from "three";
import type { Lang } from "@/data/site";
import type { ActId } from "./progress";
import type { RegisterUniforms } from "./registers";

export type { ActId };

export type ActContext = {
  /** Contagens já reduzidas para o dispositivo: o ato não decide isso. */
  budget: { particles: number; segments: number };
  /** Ponteiro em coordenadas normalizadas de tela, ou null em toque. */
  pointer: () => { x: number; y: number } | null;
};

export type Act = {
  id: ActId;
  /** Seletor da âncora que define ato ativo e progresso. */
  anchor: string;
  /** null = tela cheia; um elemento = recorta no rect dele. */
  frame?: () => Element | null;
  /** Geometria em caixa unitária. Chamado uma vez, fora do rAF. */
  build(ctx: ActContext): Object3D;
  /**
   * `t` em segundos desde o mount; `progress` 0→1 dentro do ato. O registro
   * chega por parâmetro porque é do scroll, não do ato: a câmera atravessa
   * seção papel com este ato em quadro, e ali ele tem de virar traço.
   */
  update(t: number, progress: number, register: RegisterUniforms): void;
  station(progress: number): { position: Vector3; target: Vector3 };
  /** Legenda da barra de escala; string vazia = ato sem escala métrica. */
  scale: Record<Lang, string>;
  dispose(): void;
};
