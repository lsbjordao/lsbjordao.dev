import type { NextConfig } from "next";
import imageSizes from "./scripts/image-sizes.json";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  images: {
    /**
     * O export estático não tem otimizador em runtime. Em vez de desligar a
     * otimização — o que remove o `srcset` de todas as imagens — as variantes
     * são geradas em build e este loader monta o caminho delas.
     */
    loader: "custom",
    loaderFile: "./scripts/image-loader.ts",
    deviceSizes: imageSizes.deviceSizes,
    imageSizes: imageSizes.imageSizes,
  },
};

export default nextConfig;
