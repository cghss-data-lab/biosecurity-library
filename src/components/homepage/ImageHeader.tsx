import React from 'react'
import styled from 'styled-components'

import AirtableCMSImage from '../../airtable-cms/AirtableCMSImage'
import useHomePageData from '../../airtableQueryHooks/useHomePageData'

const ImageSection = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  width: 100%;
  overflow: hidden;
`
const StyledImage = styled(AirtableCMSImage)`
  object-fit: cover;
  height: 100%;
  width: 100%;
`

const ImageHeader = (): JSX.Element => {
  const { homePageText } = useHomePageData()
  return (
    <ImageSection>
      <StyledImage name={'Left Image'} data={homePageText} />
      <StyledImage name={'Center Image'} data={homePageText} />
      <StyledImage name={'Right Image'} data={homePageText} />
    </ImageSection>
  )
}

export default ImageHeader
