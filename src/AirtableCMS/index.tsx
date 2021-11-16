import CMSText, {
  getCMSText,
  CMSTextProps,
} from '@talus-analytics/library.airtable.cms-text'
import CMSIcon, {
  useCMSIcon,
  CMSIconProps,
} from '@talus-analytics/library.airtable.cms-icon'
import CMSImage, {
  getCMSImage,
  CMSImageProps,
} from '@talus-analytics/library.airtable.cms-image'
import type { AirtableCMSData } from '@talus-analytics/library.airtable.cms-types'

export type { AirtableCMSData, CMSTextProps, CMSIconProps, CMSImageProps }

const CMS = {
  // components
  Image: CMSImage,
  Text: CMSText,
  Icon: CMSIcon,
  // getters
  getImage: getCMSImage,
  getText: getCMSText,
  // hooks
  useIcon: useCMSIcon,
}

export default CMS
