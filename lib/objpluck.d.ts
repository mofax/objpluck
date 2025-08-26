import type { PluckableObject } from "./types";
import type { StringToPath } from "./string-to-path.type";
/**
 * Helper type to get the value at a specific path in an object type
 */
type GetValueAtPath<T, P extends readonly unknown[]> = P extends readonly [infer K, ...infer Rest]
	? K extends keyof T
		? Rest extends readonly []
			? T[K]
			: GetValueAtPath<T[K], Rest>
		: T extends readonly unknown[]
		? K extends number
			? Rest extends readonly []
				? T[K]
				: GetValueAtPath<T[K], Rest>
			: K extends `${number}`
			? K extends `${infer N extends number}`
				? Rest extends readonly []
					? T[N]
					: GetValueAtPath<T[N], Rest>
				: undefined
			: undefined
		: undefined
	: T;
type Key = string | number;
/**
 * Gets the value at path of object.
 *
 * @param object - The object to query
 * @param path - The path of the property to get
 * @returns Returns the resolved value
 */
export declare function pluck<T extends PluckableObject, S extends Key>(
	inputObject: T,
	path: S
): S extends string ? GetValueAtPath<T, StringToPath<S>> : T[S];
export {};
