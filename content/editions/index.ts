import type { Edition } from "@/lib/types";
import { edition2027 } from "./2027";

/** All editions, oldest first. Add a new year's file here. */
export const editions: Edition[] = [edition2027];

/** The edition the homepage and navigation are built around. */
export const currentEditionYear = 2027;
