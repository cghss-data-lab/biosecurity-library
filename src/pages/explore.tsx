import React, { useEffect, useState } from 'react'
import { PageProps } from 'gatsby'
import qs from 'qs'

import FigmaProvider from '../figma/FigmaProvider'

import { applyFilters } from '../components/explorepage/FilterBar/filterOperations'
import { Filters } from '../components/explorepage/exploreReducer'

import AirtableCMSImage from '../airtable-cms/AirtableCMSImage'
import AirtableCMSText from '../airtable-cms/AirtableCMSText'

import NavBar from '../components/layout/NavBar/NavBar'
import Main from '../components/layout/Main'
import styled from 'styled-components'
import ColumnSection from '../components/explorepage/resourceColumns/ColumnSection'
import FilterBar from '../components/explorepage/FilterBar/FilterBar'
import ActiveFilters from '../components/explorepage/FilterBar/ActiveFilters'
import useExplorePageData, {
  ResourceGroup,
} from '../airtableQueryHooks/useExplorePageData'

const BannerImage = styled(AirtableCMSImage)`
  width: calc(100% - 10px);
  margin: 5px;
`
const Header = styled.header`
  text-align: center;
`

export interface ExploreState {
  defs?: string
  type?: string
  filters?: Filters
}

const ExplorePage: React.FC<PageProps> = () => {
  const { explorePageText, groupedResources, definitions } =
    useExplorePageData()

  const [exploreState, setExploreState] = useState<ExploreState>(
    typeof window !== 'undefined'
      ? qs.parse(window.location.search.split('?')[1])
      : {}
  )

  // store explore state in the query string whenever it chagnges
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location.search.split('?')[1] !== qs.stringify(exploreState)
    ) {
      const newURL =
        window.location.origin +
        window.location.pathname +
        '?' +
        qs.stringify(exploreState)

      window.history.replaceState({}, '', newURL)
    }
  }, [exploreState])

  let resources: ResourceGroup[] = groupedResources.map(group => ({
    ...group,
    totalCount: group.nodes.length,
  }))

  resources = applyFilters(resources, exploreState.filters)

  return (
    <FigmaProvider>
      <NavBar />
      <BannerImage name={'Banner Image'} data={explorePageText} />
      <Main>
        <Header>
          <h1>
            <AirtableCMSText name={'First Header'} data={explorePageText} />
          </h1>
        </Header>
        <FilterBar
          {...{
            definitions,
            exploreState,
            setExploreState,
          }}
        />
        <ActiveFilters {...{ exploreState, setExploreState }} />
        <ColumnSection {...{ exploreState, setExploreState, resources }} />
      </Main>
    </FigmaProvider>
  )
}

export default ExplorePage
