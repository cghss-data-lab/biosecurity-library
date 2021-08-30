import styled from 'styled-components'

const TabContentContainer = styled.section`
  grid-area: content;
  padding: 0 50px;
  border-top: 1px solid ${({ theme }) => theme.colorMedGray};
  border-left: 1px solid ${({ theme }) => theme.colorMedGray};

  > h5 {
    margin-top: 30px;
    margin-bottom: 5px;
  }

  > p {
    margin: 0;
  }
`

export default TabContentContainer
