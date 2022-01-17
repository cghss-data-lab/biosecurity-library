import React from 'react'

import styled from 'styled-components'
import { RenderItemProps } from '@talus-analytics/library.ui.typeahead'

const TypeaheadResultContainer = styled.span<{ selected?: boolean }>`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
  text-align: left;
  padding: 8px 12px;
  background-color: rgba(0, 50, 100, 0);
  transition: 150ms ease;

  ${({ selected }) => selected && ` font-weight: 800; `}

  &:hover {
    background-color: #49515d;
    ${({ selected }) => selected && `background-color: #594141;`}
  }
`

const NavSearchResult = ({ item: { label } }: RenderItemProps) => (
  <TypeaheadResultContainer>{label}</TypeaheadResultContainer>
)

export default NavSearchResult
