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
export function stringToPath(path: string): PropertyName[] {
	const result: PropertyName[] = [];
	let current = "";
	let inBrackets = false;
	let inQuotes = false;
	let quoteChar = "";

	for (let i = 0; i < path.length; i++) {
		const char = path[i];

		if (!inBrackets && !inQuotes) {
			if (char === ".") {
				if (current) {
					result.push(current);
					current = "";
				}
			} else if (char === "[") {
				if (current) {
					result.push(current);
					current = "";
				}
				inBrackets = true;
			} else {
				current += char;
			}
		} else if (inBrackets && !inQuotes) {
			if (char === '"' || char === "'") {
				inQuotes = true;
				quoteChar = char;
			} else if (char === "]") {
				if (current) {
					// Convert numeric strings to numbers for array indices
					const parsed = /^\d+$/.test(current) ? parseInt(current, 10) : current;
					result.push(parsed);
					current = "";
				}
				inBrackets = false;
			} else {
				current += char;
			}
		} else if (inQuotes) {
			if (char === quoteChar) {
				inQuotes = false;
				quoteChar = "";
			} else {
				current += char;
			}
		}
	}

	if (current) {
		result.push(current);
	}

	return result;
}
