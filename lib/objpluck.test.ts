import { pluck } from "./objpluck";
import { describe, it, expect } from "bun:test";

describe("pluck", () => {
	it("should pluck a top-level property", () => {
		const obj = { a: 1, b: 2 };
		expect(pluck(obj, "a")).toBe(1);
		expect(pluck(obj, "b")).toBe(2);
	});

	it("should pluck a nested property using dot notation", () => {
		const obj = { a: { b: { c: 42 } } };
		expect(pluck(obj, "a.b.c")).toBe(42);
	});

	it("should pluck a nested property using bracket notation", () => {
		const obj = { a: { b: [10, 20, 30] } };
		expect(pluck(obj, "a.b[1]")).toBe(20);
	});

	it("should pluck an array element by index (number path)", () => {
		const arr = [100, 200, 300];
		expect(pluck(arr, 2)).toBe(300);
	});

	it("should return undefined for non-existent property", () => {
		const obj = { a: 1 };
		expect(pluck(obj, "b")).toBeUndefined();
	});

	it("should return undefined for non-existent nested property", () => {
		const obj = { a: { b: 2 } };
		expect(pluck(obj, "a.c")).toBeUndefined();
	});

	it("should throw error for null object", () => {
		expect(() => pluck(null as any, "a")).toThrow("pluck() cannot operate on a null object");
	});

	it("should throw error for undefined object", () => {
		expect(() => pluck(undefined as any, "a")).toThrow("pluck() cannot operate on a null object");
	});

	it("should throw error for empty path", () => {
		const obj = { a: 1 };
		expect(() => pluck(obj, "")).toThrow("pluck() cannot operate without a path");
	});

	it("should throw error for null path", () => {
		const obj = { a: 1 };
		expect(() => pluck(obj, null as any)).toThrow("pluck() cannot operate without a path");
	});

	it("should handle array of objects", () => {
		const arr = [{ x: 1 }, { x: 2 }];
		expect(pluck(arr, "1.x")).toBe(2);
	});

	it("should handle deeply nested arrays and objects", () => {
		const obj = { a: [{ b: [{ c: "deep" }] }] } as const;
		expect(pluck(obj, "a[0].b[0].c")).toBe("deep");
	});

	it("should handle numeric string keys", () => {
		const obj = { "1": { "2": 3 } };
		expect(pluck(obj, "1.2")).toBe(3);
	});

	it("should handle object with undefined value", () => {
		const obj = { a: undefined };
		expect(pluck(obj, "a")).toBeUndefined();
	});

	it("should handle object with null value", () => {
		const obj = { a: null };
		expect(pluck(obj, "a")).toBeNull();
	});

	it("should handle path with consecutive brackets", () => {
		const obj = {
			a: [
				[1, 2],
				[3, 4],
			],
		} as const;
		expect(pluck(obj, "a[1][0]")).toBe(3);
	});
});
