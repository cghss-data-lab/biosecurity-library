import React from 'react'
import styled from 'styled-components'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css' // optional

import { Definition, Filter } from '../../../pages/explore'
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

// This should be inhereted by each of the filters
export interface FilterProps {
  // filters: Filter[]
  // setFilters: React.Dispatch<React.SetStateAction<Filter[]>>
  // setExpandDefinitions: React.Dispatch<React.SetStateAction<string>>
  exploreState: ExploreState
  setExploreState: React.Dispatch<React.SetStateAction<ExploreState>>
}

// All the filter options queries should follow this interface
export interface FilterOptions {
  distinctOptions: { distinct: string[] }
}

interface FilterBarProps extends FilterProps {
  definitions: Definition[]
  expandDefinitions: string
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  setFilters,
  definitions,
  expandDefinitions,
  setExpandDefinitions,
}) => {
  // const [expandTopic, setExpandTopic] =
  console.log(expandDefinitions)
  console.log(
    definitions.filter(def => def.data.Column[0] === expandDefinitions)
  )
  return (
    <>
      <DefinitionsContainer>
        {expandDefinitions !== '' &&
          definitions
            .filter(def => def.data.Column[0] === expandDefinitions)
            .map(def => (
              <Tippy key={def.data.Glossary_Name} content={def.data.Definition}>
                <DefinitionButton>{def.data.Glossary_Name}</DefinitionButton>
              </Tippy>
            ))}
      </DefinitionsContainer>
      <FilterSection>
        <KeyTopic {...{ filters, setFilters, setExpandDefinitions }} />
        <TargetUserRole {...{ filters, setFilters, setExpandDefinitions }} />
        <UserRollup {...{ filters, setFilters, setExpandDefinitions }} />
        <AuthoringOrganization
          {...{ filters, setFilters, setExpandDefinitions }}
        />
      </FilterSection>
    </>
  )
}

export default FilterBar
