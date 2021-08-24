import React from 'react'

import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'
import { GatsbyImage } from 'gatsby-plugin-image'

import { AirtableCMSData } from './types'

export const getCMSImage = (data: AirtableCMSData, name: string) => {
  const image = data.nodes.find(i => i.data.Name === name)
  if (image) {
    const sources: IGatsbyImageData | undefined = getImage(
      image.data.Image.localFiles[0]
    )

    const alt: string | undefined = image?.data.Text

    if (sources && alt) return { sources, alt }
  }
  throw new Error(`Image ${name} not found.`)
}

const AirtableCMSImage: React.FC<{
  name: string
  data: AirtableCMSData
  className?: string
}> = ({ data, name, className }) => {
  const { sources, alt } = getCMSImage(data, name)

  return <GatsbyImage className={className} image={sources} alt={alt} />
}

export default AirtableCMSImage
