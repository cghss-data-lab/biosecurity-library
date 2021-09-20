import React from 'react'
import styled from 'styled-components'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional

import { Definition, ExploreState } from '../../../pages/explore'

import FilterSection from './FilterSection'
import { cleanAirtableKey } from '../../../airtable-cms/utilities'
import { toggleFilter } from './filterOperations'

const DefinitionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const DefinitionButton = styled.button`
  border: none;
  background: none;
  padding: 15px;
  border: 1px solid darkgrey;
  margin: 2px;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.025);
`

export interface FilterProps {
  exploreState: ExploreState
  setExploreState: React.Dispatch<React.SetStateAction<ExploreState>>
}

interface FilterBarProps extends FilterProps {
  definitions: Definition[]
}

const FilterBar: React.FC<FilterBarProps> = ({
  definitions,
  exploreState,
  setExploreState,
}) => (
  <>
    <DefinitionsContainer>
      {exploreState.defs &&
        definitions
          .filter(def =>
            def.data.Column.some(col =>
              exploreState.defs?.includes(cleanAirtableKey(col))
            )
          )
          .map(def => (
            <Tippy key={def.data.Glossary_Name} content={def.data.Definition}>
              <DefinitionButton
                onClick={() => {
                  toggleFilter(
                    { [exploreState.defs!]: [def.data.Glossary_Name] },
                    setExploreState
                  )
                }}
              >
                {def.data.Glossary_Name}
              </DefinitionButton>
            </Tippy>
          ))}
    </DefinitionsContainer>
    <FilterSection {...{ exploreState, setExploreState }} />
  </>
)

export default FilterBar
