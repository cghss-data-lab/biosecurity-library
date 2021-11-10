import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 400px minmax(0, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    'thumbnail header'
    'tabs content';
  margin-bottom: 10vw;
  margin-top: 15px;
`

export default Grid
