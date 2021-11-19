import React, { useEffect, useState } from 'react'
import qs from 'qs'

import FigmaProvider from '../figma/FigmaProvider'

import { applyFilters } from '../components/explorepage/FilterBar/filterOperations'
import { Filters } from '../components/explorepage/exploreReducer'

import CMS from '@talus-analytics/library.airtable-cms'

import NavBar from '../components/layout/NavBar/NavBar'
import Main from '../components/layout/Main'
import styled from 'styled-components'
import ColumnSection from '../components/explorepage/resourceColumns/ColumnSection'
import FilterBar from '../components/explorepage/FilterBar/FilterBar'
import ActiveFilters from '../components/explorepage/FilterBar/ActiveFilters'
import useExplorePageData, {
  ResourceGroup,
} from '../airtableQueryHooks/useExplorePageData'
import ImageHeader from '../components/layout/ImageHeader'

const Header = styled.header`
  text-align: center;
`

export interface ExploreState {
  defs?: string
  type?: string
  filters?: Filters
  // sort?: {
  //   on: string // field name
  //   compare: 'gt' | 'lt'
  // }
}

const ExplorePage = (): JSX.Element => {
  const { explorePageText, groupedResources } = useExplorePageData()

  const [exploreState, setExploreState] = useState<ExploreState>(
    typeof window !== 'undefined'
      ? qs.parse(window.location.search.split('?')[1])
      : {}
  )

  // useLayoutEffect(() => {
  //   setExploreState(qs.parse(window.location.search.split('?')[1]))
  // }, [])

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

  // resources.map(group =>
  //   group.nodes.sort(node => node.data.Authoring_organization)
  // )

  return (
    <FigmaProvider>
      <NavBar />
      <ImageHeader cmsData={explorePageText} />
      <Main>
        <Header>
          <h1>
            <CMS.Text name={'First Header'} data={explorePageText} />
          </h1>
        </Header>
        <FilterBar
          {...{
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
