import styled from 'styled-components'

export const FilterContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
`
export const NameContainer = styled.div<{ expanded: boolean }>`
  display: flex;
  justify-content: space-between;
  font-family: 'Open Sans';
  font-weight: Bold;
  font-size: 18px;
  min-height: 30px;

  ${({ expanded, theme }) =>
    expanded &&
    `
    color: ${theme.colorOrange};
   `}
`
