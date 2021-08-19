import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: 400px auto;
  grid-template-rows: auto;
  grid-template-areas:
    'thumbnail header'
    'tabs content';
`

export default Grid
