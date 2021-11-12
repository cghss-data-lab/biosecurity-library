import React from 'react'

import { getImage } from 'gatsby-plugin-image'
import { GatsbyImage } from 'gatsby-plugin-image'

import { AirtableCMSData } from './CMSTypes'

export const getCMSImage = (data: AirtableCMSData, name: string) => {
  const image = data.nodes.find(i => i.data.Name === name)
  if (image) {
    const sources = getImage(image.data.Image.localFiles[0])

    // const url = image.data.Image.publicUrl

    const alt: string | undefined = image?.data.Text

    if (sources && alt) return { sources, alt }
  }
  throw new Error(
    `Image ${name} not found in ` +
      `Airtable. Does the query include the ` +
      `right tables, and does one of those ` +
      `tables include a section called ${name}?.`
  )
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
