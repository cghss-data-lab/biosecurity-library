export const urlString = (string: string) =>
  encodeURI(string.toLowerCase().trim().replace(/ /g, '-')) + '/'
