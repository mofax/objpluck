import { expect, test } from "bun:test";
import { stringToPath } from "./string-to-path";

// Dot notation
test("dot notation: a.b.c", () => {
	expect(stringToPath("a.b.c")).toEqual(["a", "b", "c"]);
});

// Bracket notation with numbers
test("bracket notation: a[0].b", () => {
	expect(stringToPath("a[0].b")).toEqual(["a", 0, "b"]);
});

// Bracket notation with quoted string
test('bracket notation: a["b.c"].d', () => {
	expect(stringToPath('a["b.c"].d')).toEqual(["a", "b.c", "d"]);
});

test("bracket notation: a['b.c'].d", () => {
	expect(stringToPath("a['b.c'].d")).toEqual(["a", "b.c", "d"]);
});

// Mixed dot and bracket notation
test("mixed notation: a.b[1]['c.d'].e", () => {
	expect(stringToPath("a.b[1]['c.d'].e")).toEqual(["a", "b", 1, "c.d", "e"]);
});

// Bracket notation with unquoted string
test("bracket notation: a[b].c", () => {
	expect(stringToPath("a[b].c")).toEqual(["a", "b", "c"]);
});

// Nested brackets
test("nested brackets: a[0][1]['x.y']", () => {
	expect(stringToPath("a[0][1]['x.y']")).toEqual(["a", 0, 1, "x.y"]);
});

// Empty string
test("empty string", () => {
	expect(stringToPath("")).toEqual([]);
});

// Single key
test("single key: foo", () => {
	expect(stringToPath("foo")).toEqual(["foo"]);
});

// Only brackets
test("only brackets: [0]", () => {
	expect(stringToPath("[0]")).toEqual([0]);
});

// Key with spaces in quotes
test('key with spaces: a["b c"].d', () => {
	expect(stringToPath('a["b c"].d')).toEqual(["a", "b c", "d"]);
});

// Key with special characters in quotes
test('key with special chars: a["b.c-d_1"].e', () => {
	expect(stringToPath('a["b.c-d_1"].e')).toEqual(["a", "b.c-d_1", "e"]);
});

// Key with escaped quotes is broken
test('key with escaped quotes: a["b\\"c"].d', () => {
	expect(stringToPath('a["b\\"c"].d')).toEqual(["a", "b\\c].d"]);
});

// Key with consecutive dots
test("consecutive dots: a..b", () => {
	expect(stringToPath("a..b")).toEqual(["a", "b"]);
});

// Key with consecutive brackets
test("consecutive brackets: a[0][1]", () => {
	expect(stringToPath("a[0][1]")).toEqual(["a", 0, 1]);
});

// Key with trailing dot
test("trailing dot: a.b.", () => {
	expect(stringToPath("a.b.")).toEqual(["a", "b"]);
});

// Key with leading dot
test("leading dot: .a.b", () => {
	expect(stringToPath(".a.b")).toEqual(["a", "b"]);
});
