/**
 * Loader do next/image para export estático.
 *
 * O export não tem servidor de otimização, e `unoptimized: true` fazia cada
 * `<Image>` virar um `<img src>` sem `srcset` — um celular baixava o PNG de
 * 1900px para um slot de 360px. Aqui as variantes são geradas em build por
 * `scripts/generate-images.mjs` e este loader só monta o caminho delas, então
 * o next/image volta a emitir `srcset` normalmente.
 *
 * As larguras válidas são as de `scripts/image-sizes.json`; pedir outra aponta
 * para um arquivo inexistente.
 */

const raster = /\.(avif|jpe?g|png|webp)$/i;
const sourcePrefix = "/images/";
const outputPrefix = "/_img/";

export default function imageLoader({ src, width }: { src: string; width: number }) {
  // SVG não tem variante por largura, e caminhos externos não são nossos.
  if (!src.startsWith(sourcePrefix) || !raster.test(src)) return src;

  const stem = src.slice(sourcePrefix.length).replace(raster, "");
  return `${outputPrefix}${stem}-${width}.webp`;
}
