import { urlString } from '../airtable-cms/utilities'
import { Resource } from '../airtableQueryHooks/useExplorePageData'
import { PageContext } from '../templates/Detail'

/**
 * Returns the URL for the detail page of the resource having the given data.
 * @param data The resource data
 * @returns The URL
 */
export function getDetailURL(
  data: Resource['data'] | PageContext['data']
): string {
  return (
    '/resource/' + urlString(data.Resource_type) + urlString(data.Short_name)
  )
}
