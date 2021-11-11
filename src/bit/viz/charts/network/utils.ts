/**
 * Returns a copy of the provided string capitalized.
 * @param s The string
 * @returns The string with first char. uppercase
 */
export function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.substring(1);
}

/**
 * Returns function to sort objects by the defined field
 * @param field The field
 * @returns The objects sorted by the field
 */
export const sortObjectsBy = (field: string) => {
  return (a: any, b: any): number => {
    if (a[field] > b[field]) {
      return 1;
    } else if (a[field] < b[field]) return -1;
    else return 0;
  };
};
