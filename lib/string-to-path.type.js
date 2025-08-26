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
