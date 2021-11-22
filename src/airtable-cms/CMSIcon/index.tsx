import CMSIcon from './CMSIcon'
import replaceFill from './replaceFill'
import useAllCMSIcons from './useAllCMSIcons'
import useCMSIcon from './useCMSIcon'
import CMSIconProvider from './CMSIconContext'

import type { CMSIconProps } from './CMSIcon'
import type { IconsQueryData, CMSIconProviderProps } from './CMSIconContext'

export type { CMSIconProps, IconsQueryData, CMSIconProviderProps }

export {
  // general purpose hook
  useCMSIcon,
  // batch-processing hook
  useAllCMSIcons,
  // utility function
  replaceFill,
  // icon context provider
  CMSIconProvider,
}

export default CMSIcon
