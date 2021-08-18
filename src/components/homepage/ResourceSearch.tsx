import { navigate } from 'gatsby'
import React, { useState } from 'react'
import styled from 'styled-components'

import { HomePageText, ResourceSearchData } from '../../pages'
import Button from '../ui/Button'

import TypeaheadControl from '../ui/TypeaheadControl/TypeaheadControl'
import TypeaheadResult from '../ui/TypeaheadControl/TypeaheadResult'

const makeUrl = string =>
  encodeURI(string.toLowerCase().trim().replace(/ /g, '-'))

const findByName = (homePageText: HomePageText, name: string) =>
  homePageText.nodes.find(n => n.data.Name === name).data.Text

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
  homePageText: HomePageText
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
      <Button>{findByName(homePageText, 'Button Text')}</Button>
      <StyledTypeaheadControl
        className={''}
        placeholder={findByName(homePageText, 'Search Placeholder')}
        items={resources}
        value={selectedResource}
        onChange={resource => {
          if (resource)
            navigate(
              `/resource/${makeUrl(resource.Resource_Type)}/${makeUrl(
                resource.key
              )}`
            )
        }}
        renderItem={({ label }) => <TypeaheadResult>{label}</TypeaheadResult>}
      />
    </SearchControls>
  )
}

export default ResourceSearch
