import React from 'react'
import { Link } from 'gatsby'
import styled, { useTheme } from 'styled-components'

import AirtableCMSIcon from '../../../airtable-cms/AirtableCMSIcon'

import { Resource } from '../../../pages/explore'
import { urlString } from '../../../airtable-cms/utilities'

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
    <ResourceContainer>
      <Link
        to={
          '/resource/' +
          urlString(data.Resource_Type) +
          urlString(data.Short_Name)
        }
      >
        <Title>{data.Short_Name}</Title>
        <SubTitle>{data.Authoring_Organization}</SubTitle>
        <IconContainer>
          {JSON.parse(data.Topic_Area_Icons).map((name: string) => (
            <AirtableCMSIcon
              key={name}
              name={name}
              color={theme.colorDarkest}
              style={{ width: 30 }}
            />
          ))}
        </IconContainer>
      </Link>
    </ResourceContainer>
  )
}

export default ResourcePreview
