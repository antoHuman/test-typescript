// this is the Redux compose function, with types take from Redux type definitions as well

/* compose */
export {}
type Func0<R> = () => R
type Func1<T1, R> = (a1: T1) => R
type Func2<T1, T2, R> = (a1: T1, a2: T2) => R
type Func3<T1, T2, T3, R> = (a1: T1, a2: T2, a3: T3, ...args: any[]) => R

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for the
 * resulting composite function.
 *
 * @param funcs The functions to compose.
 * @returns R function obtained by composing the argument functions from right
 *   to left. For example, `compose(f, g, h)` is identical to doing
 *   `(...args) => f(g(h(...args)))`.
 */
function compose(): <R>(a: R) => R

function compose<F extends Function>(f: F): F

/* two functions */
function compose<A, R>(f1: (b: A) => R, f2: Func0<A>): Func0<R>
function compose<A, T1, R>(
  f1: (b: A) => R,
  f2: Func1<T1, A>
): Func1<T1, R>
function compose<A, T1, T2, R>(
  f1: (b: A) => R,
  f2: Func2<T1, T2, A>
): Func2<T1, T2, R>
function compose<A, T1, T2, T3, R>(
  f1: (b: A) => R,
  f2: Func3<T1, T2, T3, A>
): Func3<T1, T2, T3, R>

/* three functions */
function compose<A, B, R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func0<A>
): Func0<R>
function compose<A, B, T1, R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func1<T1, A>
): Func1<T1, R>
function compose<A, B, T1, T2, R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func2<T1, T2, A>
): Func2<T1, T2, R>
function compose<A, B, T1, T2, T3, R>(
  f1: (b: B) => R,
  f2: (a: A) => B,
  f3: Func3<T1, T2, T3, A>
): Func3<T1, T2, T3, R>

/* four functions */
function compose<A, B, C, R>(
  f1: (b: C) => R,
  f2: (a: B) => C,
  f3: (a: A) => B,
  f4: Func0<A>
): Func0<R>
function compose<A, B, C, T1, R>(
  f1: (b: C) => R,
  f2: (a: B) => C,
  f3: (a: A) => B,
  f4: Func1<T1, A>
): Func1<T1, R>
function compose<A, B, C, T1, T2, R>(
  f1: (b: C) => R,
  f2: (a: B) => C,
  f3: (a: A) => B,
  f4: Func2<T1, T2, A>
): Func2<T1, T2, R>
function compose<A, B, C, T1, T2, T3, R>(
  f1: (b: C) => R,
  f2: (a: B) => C,
  f3: (a: A) => B,
  f4: Func3<T1, T2, T3, A>
): Func3<T1, T2, T3, R>

/* rest */
function compose<R>(
  f1: (b: any) => R,
  ...funcs: Function[]
): (...args: any[]) => R

function compose<R>(...funcs: Function[]): (...args: any[]) => R
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose(...funcs: Function[]) {
  if (funcs.length === 0) {
    return (arg: any) => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args: any[]) => a(b(...args)))
}
