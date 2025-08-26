import { stringToPath } from "./string-to-path";
/**
 * Gets the value at path of object.
 *
 * @param object - The object to query
 * @param path - The path of the property to get
 * @returns Returns the resolved value
 */
export function pluck(inputObject, path) {
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
	let current = inputObject;
	for (let i = 0; i < pathArray.length; i++) {
		let temp = current[pathArray[i]];
		if (i === pathArray.length - 1) return temp;
		current = temp;
	}
	// This should never be reached, but typescript!
	return current;
}
