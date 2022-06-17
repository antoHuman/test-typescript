type primitive = string | number | boolean | undefined | null;
/*
type DeepReadonlyArray<T> = ReadonlyArray<DeepReadonly<T>>;
export type DeepReadonly<T> = T extends primitive | Function
  ? T
  : T extends Array<infer U>
  ? DeepReadonlyArray<T>
  : { readonly [K in keyof T]: DeepReadonly<T[K]> };
*/
export type TDeepReadonlyAttempt<T> = T extends object
  ? { readonly [K in keyof T]: TDeepReadonly<T[K]> }
  : T;
export type TDeepReadonly<T> = T extends Function
  ? T
  : T extends object
  ? { readonly [K in keyof T]: TDeepReadonly<T[K]> }
  : T;
type Test<T> = Exclude<T, unknown>;

type T2 = Test<unknown>;
type T3 = Test<string>;
type T4 = TDeepReadonly<unknown>;
type TD1 = TDeepReadonly<any>;
type TD2 = TDeepReadonly<string>;
type TD3 = TDeepReadonly<number>;
type TD4 = TDeepReadonly<"test" | "pippo">;
type TDS1 = TDeepReadonly<"test" | "pippo">;
type TDS2 = TDeepReadonly<"test"> | TDeepReadonly<"pippo">;
type TDS3 = TDeepReadonly<{x: "test"}> | TDeepReadonly<{x: "pippo"}>;
type TD5 = TDeepReadonly<never>;
type TD6 = TDeepReadonly<{}>;
type TD7 = TDeepReadonly<{ test: string }>;
type TD8 = TDeepReadonly<{ test: { test: string } }>;
type TD9 = TDeepReadonly<{ test: { test: unknown } }>;
type TD10 = TDeepReadonly<{ test: { test: null } }>;
type TD11 = TDeepReadonly<{ test: { test: undefined } }>;
type TD12 = TDeepReadonly<{ test: { test: {} } }>;
type TD13 = TDeepReadonly<primitive>;
type TDF1 = TDeepReadonly<Function>;
type TD14 = TDeepReadonly<`x_${number}`>
type TD15 = TDeepReadonly<`x_${number}`> & TDeepReadonly<`x_${string}`>
type TD16 = TDeepReadonly<`x_${number}`> & TDeepReadonly<'pippo'>
type TD17 = `x_${number}` & 'pippo'

const tds3: TDS3 = {x: 'test'};
// tds3.x = 'pippo';
const tds3_1: TDS3 = tds3;

type T5 = keyof unknown;
type TK1 = keyof any;
type T6 = { [K in never]: any };

type Test2<T> = T extends never ? string : number;
type T7 = Test2<never>;
type T8 = Test2<"string">;
type T9 = keyof {};
type T10 = Test2<keyof unknown>;

type Test3<T> = T extends string ? number : boolean;
type T11 = Test3<never>;
type T12 = Test3<string>;
type T13 = Test3<{}>;

type Test4<T> = T extends object ? number : boolean;
type T14 = Test4<unknown>;
type T15 = Test4<any>;
type T16 = Test4<any[]>;
type T17 = Test4<string>;
type T18 = Test4<null>;
type T19 = Test4<undefined>;
type T20 = Test4<Function> // !
