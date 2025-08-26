import { stringToPath } from "./string-to-path";
/**
 * Gets the value at path of object.
 *
 * @param object - The object to query
 * @param path - The path of the property to get
 * @returns Returns the resolved value
 */
export function pluck(inputObject, path) {
	// Handle null/undefined object
	if (inputObject == null) {
		throw new Error("pluck() cannot operate on a null object");
	}
	// Handle empty path
	if (path == null || path === "") {
		throw new Error("pluck() cannot operate without a path");
	}
	if (typeof path === "number") {
		return inputObject[path];
	}
	// Convert path to array if it's a string
	const pathArray = stringToPath(path);
	// Traverse the object
	let current = inputObject;
	for (let i = 0; i < pathArray.length; i++) {
		let temp = current[pathArray[i]];
		if (i === pathArray.length - 1) return temp;
		current = temp;
	}
	return undefined;
}
