import React from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'

import CMS from '@talus-analytics/library.airtable-cms'

import ButtonLink from '../ui/ButtonLink'
import TypeaheadControl from '../ui/Typeahead/Typeahead'
import TypeaheadResult from '../ui/Typeahead/TypeaheadResult'

import useHomePageData from '../../airtableQueryHooks/useHomePageData'

import { getDetailURL } from '../../utilities/urls'

const SearchControls = styled.div`
  display: flex;
  align-items: baseline;
  max-width: 900px;
  margin: 0 auto;
`
const SearchBoxContainer = styled.div`
  margin-left: 40px;
  flex-grow: 1;
`
const StyledTypeaheadControl = styled(TypeaheadControl)`
  margin-top: 0 !important;

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
// const Examples = styled.p`
//   padding-top: 15px;
//   font-size: 16px !important;
//   line-height: 22px !important;
//   color: ${({ theme }) => theme.colorDarkGray} !important;
// `

const ResourceSearch = (): JSX.Element => {
  const { homePageText, resourceSearchData } = useHomePageData()

  const resources = resourceSearchData.nodes.map(r => ({
    key: r.data.Short_name,
    label: r.data.Resource_name,
    Description: r.data.Short_description,
    Resource_Name: r.data.Resource_name,
    Resource_Type: r.data.Resource_type,
  }))

  return (
    <SearchControls>
      <ButtonLink to="/explore">
        <CMS.Text name={'Button Text'} data={homePageText} />
      </ButtonLink>
      <SearchBoxContainer>
        <StyledTypeaheadControl
          placeholder={CMS.getText(homePageText, 'Search Placeholder') ?? ''}
          items={resources}
          values={[]}
          onAdd={resource => {
            if (resource)
              navigate(
                getDetailURL({
                  Resource_type: resource.Resource_Type,
                  Short_name: resource.key,
                })
              )
          }}
          onRemove={() => {}}
          RenderItem={({ item: { label } }) => (
            <TypeaheadResult>{label}</TypeaheadResult>
          )}
        />
        {/*<Examples>
          <AirtableCMSText name="Search Examples" data={homePageText} />
        </Examples>*/}
      </SearchBoxContainer>
    </SearchControls>
  )
}

export default ResourceSearch
