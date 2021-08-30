import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Link } from 'gatsby'

import { Resource } from '../../../pages/explore'
import { urlString } from '../../../airtable-cms/utilities'
import AirtableCMSIcon from '../../../airtable-cms/AirtableCMSIcon'

const ResourceContainer = styled.section`
  background: ${({ theme }) => theme.colorVeryLightGray};
  padding: 20px;
`
const Title = styled.div`
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  color: ${({ theme }) => theme.colorBlack};
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 8px;
`

const SubTitle = styled.div`
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  color: ${({ theme }) => theme.colorVeryDarkGray};
  font-weight: 500;
  font-size: 16px;
`

const IconContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colorMedGray};
  padding-top: 10px;
  padding-bottom: 15px;
  display: flex;
  gap: 8px;
`

const ResourcePreview: React.FC<Resource> = ({ data }) => {
  const theme: any = useTheme()
  return (
    <ResourceContainer key={data.Short_Name}>
      <Link
        to={
          '/resource/' +
          urlString(data.Resource_Type) +
          urlString(data.Short_Name)
        }
      >
        <Title>{data.Resource_Name}</Title>
        <SubTitle>{data.Authoring_Organization}</SubTitle>
        <IconContainer>
          <AirtableCMSIcon
            name="Lab research"
            color={theme.colorDarkest}
            style={{ height: 25 }}
          />
          <AirtableCMSIcon
            name="Risk assessment"
            color={theme.colorDarkest}
            style={{ height: 25 }}
          />
        </IconContainer>
      </Link>
    </ResourceContainer>
  )
}

export default ResourcePreview
