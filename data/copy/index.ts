import type { Lang } from "../site";
import { pt, type Copy } from "./pt";
import { en } from "./en";

export type { Copy };

export const copy: Record<Lang, Copy> = { pt, en };
