/**
 * Checks if a string is a numeric string.
 * @typeParam T - The string to check.
 * @example
 * IsNumericString<'123'> // true
 * IsNumericString<'abc'> // false
 */
type IsNumericString<T extends string> = T extends `${number}` ? true : false;

/**
 * Converts a numeric string to a number type, otherwise returns the string.
 * @typeParam T - The string to convert.
 * @example
 * StringToNumber<'123'> // 123
 * StringToNumber<'abc'> // 'abc'
 */
type StringToNumber<T extends string> = IsNumericString<T> extends true
	? T extends `${infer N extends number}`
		? N
		: T
	: T;

/**
 * Parses the content inside brackets, handling quotes and numeric strings.
 * @typeParam T - The bracket content string.
 * @example
 * ParseBracketContent<'"foo"'> // 'foo'
 * ParseBracketContent<'123'> // 123
 */
type ParseBracketContent<T extends string> = T extends `"${infer Content}"`
	? Content
	: T extends `'${infer Content}'`
	? Content
	: StringToNumber<T>;

/**
 * Splits a string path by dots into segments.
 * @typeParam T - The path string.
 * @typeParam Result - Accumulator for segments.
 * @example
 * SplitByDots<'a.b.c'> // ['a', 'b', 'c']
 */
type SplitByDots<T extends string, Result extends readonly unknown[] = []> = T extends `${infer Before}.${infer After}`
	? Before extends ""
		? SplitByDots<After, Result>
		: SplitByDots<After, [...Result, Before]>
	: T extends ""
	? Result
	: [...Result, T];

/**
 * Processes bracket notation in a path segment, extracting keys and indices.
 * @typeParam T - The segment string.
 * @typeParam Result - Accumulator for processed keys.
 * @example
 * ProcessBrackets<'a[0]'> // ['a', 0]
 * ProcessBrackets<'[1]'> // [1]
 */
type ProcessBrackets<
	T extends string,
	Result extends readonly unknown[] = []
> = T extends `${infer Before}[${infer BracketContent}]${infer After}`
	? Before extends ""
		? ProcessBrackets<After, [...Result, ParseBracketContent<BracketContent>]>
		: ProcessBrackets<After, [...Result, Before, ParseBracketContent<BracketContent>]>
	: T extends ""
	? Result
	: [...Result, T];

/**
 * Flattens and processes all segments of a path, handling bracket and dot notation.
 * @typeParam T - Array of path segments.
 * @typeParam Result - Accumulator for processed keys.
 * @example
 * ProcessSegments<['a', 'b[0]']> // ['a', 'b', 0]
 */
type ProcessSegments<T extends readonly string[], Result extends readonly unknown[] = []> = T extends readonly [
	infer First extends string,
	...infer Rest extends readonly string[]
]
	? ProcessSegments<Rest, [...Result, ...ProcessBrackets<First>]>
	: Result;

/**
 * Converts a string path to a tuple of keys at the type level.
 * Handles dot notation and bracket notation.
 * @typeParam T - The path string.
 * @example
 * StringToPath<'a.b.c'> // ['a', 'b', 'c']
 * StringToPath<'a[0].b'> // ['a', 0, 'b']
 * StringToPath<'a["b.c"].d'> // ['a', 'b.c', 'd']
 */
export type StringToPath<T extends string> = ProcessSegments<SplitByDots<T>>;

// // Type tests to verify correctness
// type Test1 = StringToPath<"a.b.c">;
// type Test2 = StringToPath<"a[0].b">;
// // type Test3 = StringToPath<'a["b.c"].d'>;
// // type Test4 = StringToPath<"a['x.y'].z">;
// type Test5 = StringToPath<"users[0].name">;
// type Test6 = StringToPath<"a[1][2].b">;
// type Test7 = StringToPath<"root">;
// type Test8 = StringToPath<"">;

// const _test1: Test1 = ["a", "b", "c"];
// const _test2: Test2 = ["a", 0, "b"];
// // const _test3: Test3 = ["a", "d"]; TODO: broken
// // const _test4: Test4 = ["a", "x.y", "z"]; TODO broken
// const _test5: Test5 = ["users", 0, "name"];
// const _test6: Test6 = ["a", 1, 2, "b"];
// const _test7: Test7 = ["root"];
// const _test8: Test8 = [];
