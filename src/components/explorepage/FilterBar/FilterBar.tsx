import React from 'react'
import styled from 'styled-components'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional

import { Definition, ExploreState } from '../../../pages/explore'
import AuthoringOrganization from './filters/AuthoringOrganization'
import KeyTopic from './filters/KeyTopic'
import UserRollup from './filters/RecommendedUsership'
import TargetUserRole from './filters/TargetUserRole'

const FilterSection = styled.section`
  display: flex;
  justify-content: stretch;
  gap: 15px;
  margin-top: 50px;
`
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

// This interface should be used by each of the filters
export interface FilterProps {
  exploreState: ExploreState
  setExploreState: React.Dispatch<React.SetStateAction<ExploreState>>
}

// All the filter options queries should follow this interface
export interface FilterOptions {
  distinctOptions: { distinct: string[] }
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
      {exploreState.defs !== '' &&
        definitions
          .filter(def => def.data.Column[0] === exploreState.defs)
          .map(def => (
            <Tippy key={def.data.Glossary_Name} content={def.data.Definition}>
              <DefinitionButton>{def.data.Glossary_Name}</DefinitionButton>
            </Tippy>
          ))}
    </DefinitionsContainer>
    <FilterSection>
      <KeyTopic {...{ exploreState, setExploreState }} />
      <TargetUserRole {...{ exploreState, setExploreState }} />
      <UserRollup {...{ exploreState, setExploreState }} />
      <AuthoringOrganization {...{ exploreState, setExploreState }} />
    </FilterSection>
  </>
)

export default FilterBar
