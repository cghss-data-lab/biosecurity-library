import React from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'

import { AirtableCMSData } from '../../airtable-cms/types'
import AirtableCMSText, { getCMSText } from '../../airtable-cms/AirtableCMSText'

import ButtonLink from '../ui/ButtonLink'
import TypeaheadControl, { Item } from '../ui/TypeaheadControl/TypeaheadControl'
import TypeaheadResult from '../ui/TypeaheadControl/TypeaheadResult'

import { ResourceSearchData } from '../../pages'

import { urlString } from '../../airtable-cms/utilities'

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
  homePageText: AirtableCMSData
  resourceSearchData: ResourceSearchData
}) => {
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
        <AirtableCMSText name={'Button Text'} data={homePageText} />
      </ButtonLink>
      <StyledTypeaheadControl
        className={''}
        placeholder={getCMSText(homePageText, 'Search Placeholder') ?? ''}
        items={resources}
        values={[]}
        onAdd={resource => {
          if (resource)
            navigate(
              `/resource/` +
                urlString(resource.Resource_Type) +
                urlString(resource.key)
            )
        }}
        onRemove={() => {}}
        RenderItem={({ item: { label } }) => (
          <TypeaheadResult>{label}</TypeaheadResult>
        )}
      />
    </SearchControls>
  )
}

export default ResourceSearch
