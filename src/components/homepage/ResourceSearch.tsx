import React from 'react'
import styled, { useTheme } from 'styled-components'
import { navigate } from 'gatsby'

import CMS from '@talus-analytics/library.airtable-cms'
import Typeahead from '@talus-analytics/library.ui.typeahead'

import ButtonLink from '../ui/ButtonLink'

import useHomePageData from '../../airtableQueryHooks/useHomePageData'

import { getDetailURL } from '../../utilities/urls'

const SearchControls = styled.div`
  display: flex;
  align-items: baseline;
  max-width: 900px;
  margin: 0 auto;

  @media (max-width: 500px) {
    flex-direction: column-reverse;
    gap: 15px;
    padding: 10px;
  }
`
const SearchBoxContainer = styled.div`
  margin-left: 40px;
  flex-grow: 1;

  @media (max-width: 500px) {
    margin-left: 0;
    width: 100%;
  }
`
const StyledTypeaheadControl = styled(Typeahead)`
  margin-top: 0 !important;

  > input {
    height: unset;
    font-size: 18px;
    width: 100%;
    /* border: 2px solid ${({ theme }) => theme.colorGolden}; */
    border-radius: 2px;
    z-index: 11;

    &:focus {
      /* border: 2px solid ${({ theme }) => theme.colorYellow}; */
    }
    &:hover {
      /* border: 2px solid ${({ theme }) => theme.colorYellow}; */
    }
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
  const theme: any = useTheme()
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
      <ButtonLink to="/explore/">
        <CMS.Text name={'Button Text'} data={homePageText} />
      </ButtonLink>
      <SearchBoxContainer>
        <StyledTypeaheadControl
          placeholder={CMS.getText(homePageText, 'Search Placeholder') ?? ''}
          items={resources}
          borderColor={theme.colorGolden}
          iconLeft
          onAdd={resource => {
            if (resource)
              navigate(
                getDetailURL({
                  Resource_type: resource.Resource_Type,
                  Short_name: resource.key,
                })
              )
          }}
          iconSVG={`%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.01 11.255H12.22L11.94 10.985C12.92 9.845 13.51 8.365 13.51 6.755C13.51 3.165 10.6 0.254997 7.01001 0.254997C3.42001 0.254997 0.51001 3.165 0.51001 6.755C0.51001 10.345 3.42001 13.255 7.01001 13.255C8.62001 13.255 10.1 12.665 11.24 11.685L11.51 11.965V12.755L16.51 17.745L18 16.255L13.01 11.255ZM7.01001 11.255C4.52001 11.255 2.51001 9.245 2.51001 6.755C2.51001 4.265 4.52001 2.255 7.01001 2.255C9.50001 2.255 11.51 4.265 11.51 6.755C11.51 9.245 9.50001 11.255 7.01001 11.255Z' fill='%23757C85'/%3E%3C/svg%3E%0A`}
        />
        {/*<Examples>
          <AirtableCMSText name="Search Examples" data={homePageText} />
        </Examples>*/}
      </SearchBoxContainer>
    </SearchControls>
  )
}

export default ResourceSearch
