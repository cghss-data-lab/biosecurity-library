export const urlString = (string: string) =>
  string.toLowerCase().trim().replace(/ /g, '-') + '/'

// This should match the transformation that
// gatsby-source-airtable is applying to column
// names, this is useful in cases where we need
// to match other strings from airtalbe with their
// cleaned key names in the blobs returned by queries
export const cleanAirtableKey = (string: string) =>
  string.replace(/[ .()]/g, '_')
