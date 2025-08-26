import type { PluckableObject, PropertyPath } from "./types";
/**
 * Gets the value at path of object.
 *
 * @param object - The object to query
 * @param path - The path of the property to get
 * @returns Returns the resolved value
 */
export declare function pluck<T extends PluckableObject>(inputObject: T, path: PropertyPath): unknown;
