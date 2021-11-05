import { urlString } from '../airtable-cms/utilities'

/**
 * Returns the URL for the detail page of the resource having the given data.
 * @param data The resource data
 * @returns The URL
 */
export function getDetailURL(data: {
  Resource_type: string
  Short_name: string
}): string {
  return (
    '/resource/' + urlString(data.Resource_type) + urlString(data.Short_name)
  )
}
