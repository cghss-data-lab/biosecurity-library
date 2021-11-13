import React from 'react'
import { GatsbyImage, GatsbyImageProps } from 'gatsby-plugin-image'

import { AirtableCMSData } from '@talus-analytics/library.airtable.cms-types'
import getCMSImage from './getCMSImage'

interface CMSImageProps extends Omit<GatsbyImageProps, 'image' | 'alt'> {
  /** Name of the image in the AirtableCMSData object */
  name: string
  /** The AirtableCMSData object (from a content query hook) */
  data: AirtableCMSData
  /**
   * Suppress errors if the image is not found
   * (component will render a fragment)
   **/
  noEmitError?: boolean
}

const CMSImage = ({
  data,
  name,
  noEmitError = false,
  ...props
}: CMSImageProps): JSX.Element => {
  const cmsImage = getCMSImage(data, name, noEmitError)
  if (!cmsImage) return <></>
  return <GatsbyImage {...props} image={cmsImage.sources} alt={cmsImage.alt} />
}

export default CMSImage
