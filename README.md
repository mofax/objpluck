# objpluck

A tiny utility for safely plucking deeply nested values from JavaScript objects and arrays using dot/bracket notation paths.

## Features

-   Access nested properties using dot (`a.b.c`) or bracket (`a[0].b[1]`) notation
-   Handles arrays, objects, and mixed structures
-   Returns `undefined` for missing paths, throws for invalid input
-   TypeScript support

## Installation

```bash
bun add objpluck
# or
npm install objpluck
```

## Usage

```typescript
import { pluck } from "objpluck";

const obj = { a: { b: [{ c: 42 }] } };

console.log(pluck(obj, "a.b[0].c")); // 42
console.log(pluck(obj, "a.b[1].c")); // undefined
```

### Array Example

```typescript
const arr = [{ x: 1 }, { x: 2 }];
console.log(pluck(arr, "1.x")); // 2
console.log(pluck(arr, 0)); // { x: 1 }
```

## API

### `pluck(object, path)`

-   `object`: The object or array to query (required)
-   `path`: Property path as a string (dot/bracket notation) or number (array index)

Returns the value at the given path, or `undefined` if not found.

Throws if `object` is `null`/`undefined` or if `path` is empty.

## Examples

```typescript
pluck({ a: { b: 2 } }, "a.b"); // 2
pluck([10, 20, 30], 1); // 20
pluck({ a: [{ b: 3 }] }, "a[0].b"); // 3
pluck({ a: undefined }, "a"); // undefined
pluck({ a: null }, "a"); // null
```

## License

MIT
