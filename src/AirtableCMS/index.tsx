import CMSText, {
  getCMSText,
  CMSTextProps,
} from '@talus-analytics/library.airtable.cms-text'
import CMSIcon, {
  useCMSIcon,
  CMSIconProps,
  CMSIconProvider,
  CMSIconProviderProps,
} from '@talus-analytics/library.airtable.cms-icon'
import CMSImage, {
  getCMSImage,
  CMSImageProps,
} from '@talus-analytics/library.airtable.cms-image'
import CMSRichText, {
  RenderCMSRichText,
  parseCMSRichText,
} from '@talus-analytics/library.airtable.cms-rich-text'
import CMSPlotIcon, {
  CMSPlotIconProps,
} from '@talus-analytics/library.airtable.cms-plot-icon'

// AirtableCMSData type declaration
import type { AirtableCMSData } from '@talus-analytics/library.airtable.cms-types'

export type {
  // query data type
  AirtableCMSData,
  // component prop types
  CMSTextProps,
  CMSIconProps,
  CMSImageProps,
  CMSPlotIconProps,
  CMSIconProviderProps,
}

const CMS = {
  // components
  Image: CMSImage,
  Text: CMSText,
  RichText: CMSRichText,
  Icon: CMSIcon,
  PlotIcon: CMSPlotIcon,
  // non-AirtableCMSData components
  RenderRichText: RenderCMSRichText,
  // getters
  getImage: getCMSImage,
  getText: getCMSText,
  // hooks
  useIcon: useCMSIcon,
  // utiliries
  parseRichText: parseCMSRichText,
  // contexts
  IconProvider: CMSIconProvider,
}

export default CMS
