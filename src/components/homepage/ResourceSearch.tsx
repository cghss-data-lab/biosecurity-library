import React, { useState } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'

import { AirtableCMSText } from '../../airtable-cms/types'
import getCMSText from '../../airtable-cms/getCMSText'

import ButtonLink from '../ui/ButtonLink'
// @ts-ignore: implicit any
import TypeaheadControl from '../ui/TypeaheadControl/TypeaheadControl'
// @ts-ignore: implicit any
import TypeaheadResult from '../ui/TypeaheadControl/TypeaheadResult'

import { ResourceSearchData } from '../../pages'

const makeUrl = (string: string) =>
  encodeURI(string.toLowerCase().trim().replace(/ /g, '-'))

const SearchControls = styled.div`
  display: flex;
  align-items: baseline;
`

const StyledTypeaheadControl = styled(TypeaheadControl)`
  margin-top: 0 !important;
  margin-left: 15px;
  flex-grow: 1;

  > input {
    height: unset;
    font-size: 1.3rem;
    padding: 12px 50px 12px 20px;
    width: 100%;
    border: 2px solid ${({ theme }) => theme.colorGolden};
    border-radius: 2px;
    font-size: 20px;
  }
  > button {
    box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25%);
    border-radius: 50%;
    height: 24px;
    width: 24px;
    top: calc(50% - 12px);
    right: 18px;
  }
`

const ResourceSearch = ({
  homePageText,
  resourceSearchData,
}: {
  homePageText: AirtableCMSText
  resourceSearchData: ResourceSearchData
}) => {
  const [selectedResource, setSelectedResource] = useState()
  const resources = resourceSearchData.nodes.map(r => ({
    key: r.data.Short_Name,
    label: r.data.Resource_Name,
    Description: r.data.Description,
    Resource_Name: r.data.Resource_Name,
    Resource_Type: r.data.Resource_Type,
  }))

  return (
    <SearchControls>
      <ButtonLink to="/explore">
        {getCMSText(homePageText, 'Button Text')}
      </ButtonLink>
      <StyledTypeaheadControl
        className={''}
        placeholder={getCMSText(homePageText, 'Search Placeholder')}
        items={resources}
        value={selectedResource}
        onChange={(resource: any) => {
          if (resource)
            navigate(
              `/resource/${makeUrl(resource.Resource_Type)}/${makeUrl(
                resource.key
              )}`
            )
        }}
        renderItem={({ label }: { label: string }) => (
          <TypeaheadResult>{label}</TypeaheadResult>
        )}
      />
    </SearchControls>
  )
}

export default ResourceSearch
