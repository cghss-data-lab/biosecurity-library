import styled from 'styled-components'

const TabContentContainer = styled.section`
  grid-area: content;
  padding: 5px 50px 50px 50px;
  // border-top: 8px solid ${({ theme }) => theme.colorDarkest};
  border-left: 1px solid #05396933;
  background: ${({ theme }) => theme.colorVeryLightGray};

  > h5 {
    margin-top: 30px;
    margin-bottom: 5px;
    display: flex;
    align-items: center;
  }

  p {
    margin: 0;
    padding-bottom: 1em;

    > a {
      white-space: pre-wrap;
      word-break: break-all;
    }
  }
`

export default TabContentContainer
