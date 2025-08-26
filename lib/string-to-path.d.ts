import type { PropertyName } from "./types";
/**
 * Converts a string path to an array of keys.
 * Handles dot notation and bracket notation
 * Examples:
 * ```
 * 'a.b.c' -> ['a', 'b', 'c']
 * 'a[0].b' -> ['a', '0', 'b']
 * 'a["b.c"].d' -> ['a', 'b.c', 'd']
 * ```
 */
export declare function stringToPath(path: string): PropertyName[];
