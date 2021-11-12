import React from 'react'
import styled from 'styled-components'

import AirtableCMSImage from '../../airtable-cms/AirtableCMSImage'
import { AirtableCMSData } from '../../airtable-cms/CMSTypes'

const ImageSection = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 5px;
  padding: 5px;
  width: 100%;
  overflow: hidden;
`
const StyledImage = styled(AirtableCMSImage)`
  object-fit: cover;
  height: 100%;
  width: 100%;
`

const ImageHeader = ({
  cmsData,
}: {
  cmsData: AirtableCMSData
}): JSX.Element => (
  <ImageSection>
    <StyledImage name={'Left image'} data={cmsData} />
    <StyledImage name={'Center image'} data={cmsData} />
    <StyledImage name={'Right image'} data={cmsData} />
  </ImageSection>
)

export default ImageHeader
