import React, { useEffect, useLayoutEffect, useState } from 'react'
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
import Footer from 'components/layout/Footer'

const Header = styled.header`
  text-align: center;
`

export interface ExploreState {
  defs?: string
  type?: string
  filters?: Filters
  moreFilters?: string
  // sort?: {
  //   on: string // field name
  //   compare: 'gt' | 'lt'
  // }
}

const ExplorePage = (): JSX.Element => {
  const { explorePageText, groupedResources } = useExplorePageData()

  if (typeof window !== 'undefined')
    console.log('before setState ' + window.location.search)

  const [exploreState, setExploreState] = useState<ExploreState>({})

  console.log(exploreState)

  useLayoutEffect(() => {
    console.log('In useLayoutEffect ' + window.location.search)
    setExploreState(qs.parse(window.location.search.split('?')[1]))
  }, [])

  // store explore state in the query string whenever it chagnges
  useEffect(() => {
    console.log('In useEffect ' + window.location.search)
    console.log(qs.stringify(exploreState))
    if (
      typeof window !== 'undefined' &&
      // Object.keys(exploreState).length > 0 &&
      window.location.search.split('?')[1] !== qs.stringify(exploreState)
    ) {
      console.log('In useEffect if statement ' + window.location.search)
      const newURL =
        window.location.origin +
        window.location.pathname +
        '?' +
        qs.stringify(exploreState)

      console.log('replace history with ' + newURL)
      window.history.replaceState({}, '', newURL)
    }
  }, [exploreState])

  let resources: ResourceGroup[] = groupedResources.map(group => ({
    ...group,
    totalCount: group.nodes.length,
  }))

  resources = applyFilters(resources, exploreState.filters)

  resources.forEach(group => {
    group.nodes.sort((a, b) => {
      // if a is a seminal resource
      if (a.data.Seminal_resource === 'Yes')
        if (b.data.Seminal_resource === 'Yes')
          // if b is also seminal, alphabetize
          return a.data.Short_name.localeCompare(b.data.Short_name)
        // if b is not seminal, put a before b
        else return -1
      // if a is not seminal but b is, b goes first
      if (b.data.Seminal_resource === 'Yes') return 1
      // if neither is seminal, alphabetize
      return a.data.Short_name.localeCompare(b.data.Short_name)
    })
  })

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
      <Footer />
    </FigmaProvider>
  )
}

export default ExplorePage
