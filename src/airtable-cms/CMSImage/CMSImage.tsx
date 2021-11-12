import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'

import { AirtableCMSData } from '@talus-analytics/library.airtable.cms-types'
import getCMSImage from './getCMSImage'

interface CMSImageProps {
  name: string
  data: AirtableCMSData
  className?: string
  noEmitError?: boolean
}

const CMSImage = ({
  data,
  name,
  className,
  noEmitError = false,
}: CMSImageProps): JSX.Element => {
  const cmsImage = getCMSImage(data, name, noEmitError)
  if (!cmsImage) return <></>
  return (
    <GatsbyImage
      className={className}
      image={cmsImage.sources}
      alt={cmsImage.alt}
    />
  )
}

export default CMSImage
