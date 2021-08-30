import styled from 'styled-components'

const RemoveFilterButton = styled.button`
  /*font-size: 0.9rem;*/
  font-size: 1em;
  border: none;
  background: none;
  background-color: ${({ theme }) => theme.colorLighter};
  padding: 0.2em 0.4em;
  border-radius: 3px;
  margin: 0.125em;
  color: ${({ theme }) => theme.colorBlack};
  text-align: left;
  background-repeat: no-repeat;
  background-size: 1em;
  background-position: calc(100% - 0.4em) 0.3em;
  padding-right: 2em;
  /*border: 1px solid ${({ theme }) => theme.colorPrimaryBlue3};*/
  border: 1px solid rgba(0, 0, 0, 0.05);
  background-image: url("data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 105 105' style='enable-background:new 0 0 105 105;' xml:space='preserve'%3E%3Cpath style='fill:%2300000055;' d='M52.5,0C23.51,0,0,23.51,0,52.5C0,81.49,23.51,105,52.5,105c28.99,0,52.5-23.51,52.5-52.5 C105,23.51,81.49,0,52.5,0z M74.42,82.91L52.5,60.99L30.93,82.55l-8.49-8.49L44.01,52.5L22.09,30.58l8.49-8.49L52.5,44.01 l21.57-21.57l8.49,8.49L60.99,52.5l21.92,21.92L74.42,82.91z'/%3E%3C/svg%3E%0A");
  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.15),
    inset 0 0 8px 0px rgba(255, 255, 255, 0.5);

  &:first-of-type {
    margin-left: 0;
  }
`

export default RemoveFilterButton
