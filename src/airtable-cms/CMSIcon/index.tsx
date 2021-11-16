import CMSIcon from './CMSIcon'
import replaceFill from './replaceFill'
import useAllCMSIcons from './useAllCMSIcons'
import useCMSIcon from './useCMSIcon'
import useCMSIconsQuery from './useCMSIconsQuery'

import type { CMSIconProps } from './CMSIcon'
export type { CMSIconProps }

export {
  // general purpose hook
  useCMSIcon,
  // batch-processing hook
  useAllCMSIcons,
  // utility function
  replaceFill,
  // acccess the raw airtable CMS query
  useCMSIconsQuery,
}

export default CMSIcon
