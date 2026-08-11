import { DataTexture, LinearFilter, RGBAFormat, type Texture } from "three";

/**
 * O brilho do registro lâmina não vem de post-processing — vem deste sprite.
 * É um passe a menos, um framebuffer a menos e dezenas de KB a menos que
 * `UnrealBloomPass`, e a diferença visual num halo pequeno é desprezível.
 *
 * A rampa é separada do canvas de propósito: assim o núcleo é puro e dá para
 * testá-lo sem DOM.
 */
export function haloPixels(size: number): Uint8ClampedArray {
  const px = new Uint8ClampedArray(size * size * 4);
  const c = size / 2;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      const dx = x + 0.5 - c;
      const dy = y + 0.5 - c;
      const d = Math.sqrt(dx * dx + dy * dy) / c;
      // Quártica: cai mais rápido que linear perto da borda, então o halo tem
      // núcleo denso e franja longa — o que faz leitura de brilho.
      const fall = d >= 1 ? 0 : (1 - d) * (1 - d) * (1 - d) * (1 - d);
      const i = (y * size + x) * 4;
      px[i] = 255;
      px[i + 1] = 255;
      px[i + 2] = 255;
      px[i + 3] = Math.round(fall * 255);
    }
  }
  return px;
}

export function haloTexture(size = 64): Texture {
  const texture = new DataTexture(haloPixels(size), size, size, RGBAFormat);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.needsUpdate = true;
  return texture;
}
