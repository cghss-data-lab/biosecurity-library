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
import CMSRichText, {
  RenderCMSRichText,
  parseCMSRichText,
} from '@talus-analytics/library.airtable.cms-rich-text'
import type { AirtableCMSData } from '@talus-analytics/library.airtable.cms-types'

export type { AirtableCMSData, CMSTextProps, CMSIconProps, CMSImageProps }

const CMS = {
  // components
  Image: CMSImage,
  Text: CMSText,
  RichText: CMSRichText,
  Icon: CMSIcon,
  // non-AirtableCMSData components
  RenderRichText: RenderCMSRichText,
  // getters
  getImage: getCMSImage,
  getText: getCMSText,
  // hooks
  useIcon: useCMSIcon,
  // utiliries
  parseRichText: parseCMSRichText,
}

export default CMS
