import CMSText, { getCMSText, CMSTextProps } from 'airtable-cms/CMSText'
import CMSIcon, {
  useCMSIcon,
  CMSIconProps,
  CMSIconProvider,
  CMSIconProviderProps,
} from 'airtable-cms/CMSIcon'
import CMSImage, { getCMSImage, CMSImageProps } from 'airtable-cms/CMSImage'
import CMSRichText, {
  RenderCMSRichText,
  parseCMSRichText,
} from 'airtable-cms/CMSRichText'
import CMSPlotIcon, { CMSPlotIconProps } from 'airtable-cms/CMSPlotIcon'
import CMSDownload, {
  CMSDownloadProps,
  getCMSDownloadInfo,
} from 'airtable-cms/CMSDownload'

import SEO, {
  SEOProps,
  SiteMetadataContext,
  SiteMetadataProvider,
  SiteMetadataProviderProps,
} from '../../library/airtable/cms-seo'

// AirtableCMSData type declaration
import type { AirtableCMSData } from 'airtable-cms/CMSTypes'

export type {
  // query data type
  AirtableCMSData,
  // component prop types
  SEOProps,
  CMSTextProps,
  CMSIconProps,
  CMSImageProps,
  CMSDownloadProps,
  CMSPlotIconProps,
  CMSIconProviderProps,
  SiteMetadataProviderProps,
}

const CMS = {
  // components
  Image: CMSImage,
  Text: CMSText,
  RichText: CMSRichText,
  Icon: CMSIcon,
  PlotIcon: CMSPlotIcon,
  Download: CMSDownload,
  SEO,
  // non-AirtableCMSData components
  RenderRichText: RenderCMSRichText,
  // getters
  getImage: getCMSImage,
  getText: getCMSText,
  getDownloadInfo: getCMSDownloadInfo,
  // hooks
  useIcon: useCMSIcon,
  // utilities
  parseRichText: parseCMSRichText,
  // contexts
  IconProvider: CMSIconProvider,
  SiteMetadataProvider,
  SiteMetadataContext,
}

export default CMS
