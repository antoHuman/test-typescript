export {};

/**
 *
 * @param x string that we need to convert
 * @param possibilities (**integer**) the amount of possible results that we want to have
 */
const getConsistentNumberFromString = (
  x: string,
  possibilities: number,
): number =>
  Array.from(x).reduce((prev, curr) => prev + curr.charCodeAt(0), 0) %
  possibilities;

console.log(getConsistentNumberFromString('ciao', 6))