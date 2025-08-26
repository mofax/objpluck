import { stringToPath } from "./string-to-path";
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
export function pluck<T extends PluckableObject, S extends Key>(
	inputObject: T,
	path: S
): S extends string ? GetValueAtPath<T, StringToPath<S>> : T[S] {
	if (inputObject == null) {
		throw new Error("pluck() cannot operate on a null object");
	}

	if (path == null || path === "") {
		throw new Error("pluck() cannot operate without a path");
	}

	if (typeof path === "number") {
		return inputObject[path];
	}

	const pathArray = stringToPath(path);

	// Traverse the object
	let current: any = inputObject;
	for (let i = 0; i < pathArray.length; i++) {
		let temp = current[pathArray[i]!];
		if (i === pathArray.length - 1) return temp;
		current = temp;
	}

	// This should never be reached, but typescript!
	return current;
}
