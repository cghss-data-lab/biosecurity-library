import styled from 'styled-components'

export const FilterContainer = styled.div`
  flex: 1 1 0;
  display: flex;
  flex-direction: column;

  @media (max-width: 1100px) {
    flex-basis: 45%;
  }
  @media (max-width: 570px) {
    flex-basis: 100%;
  }
`
export const NameContainer = styled.div<{ expanded: boolean }>`
  display: flex;
  justify-content: space-between;
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  text-transform: uppercase;

  min-height: 30px;

  ${({ expanded, theme }) =>
    expanded &&
    `
    @media(min-width: 700px){
      color: ${theme.colorOrange};
    }
   `}
`
