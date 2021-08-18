import styled from 'styled-components'

const TypeaheadResult = styled.span`
  display: block;
  width: 100%;
  font-size: 16px;
  text-align: left;
  padding: 8px 6px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  background-color: rgba(0, 50, 100, 0);
  transition: 150ms ease;

  &:hover {
    background-color: rgba(0, 50, 100, 0.08);
  }
`

export default TypeaheadResult
