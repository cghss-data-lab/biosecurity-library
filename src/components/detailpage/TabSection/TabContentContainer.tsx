import styled from 'styled-components'

const TabContentContainer = styled.section`
  grid-area: content;
  padding: 15px;
  border-top: 1px solid ${({ theme }) => theme.colorMedGray};
  border-left: 1px solid ${({ theme }) => theme.colorMedGray};
`

export default TabContentContainer
