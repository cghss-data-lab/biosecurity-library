/**
 * Returns a sorting function that compares two objects by comparing the result
 * of the defined function for both object instances.
 *
 * @param f The function
 * @returns The sorting function
 */
export function sortByCustom<T>(f: (inst: T) => any): (a: T, b: T) => number {
  return (a: T, b: T): number => {
    const valA: any = f(a)
    const valB: any = f(b)
    if (valA > valB) return -1
    else if (valA < valB) return 1
    else return 0
  }
}
