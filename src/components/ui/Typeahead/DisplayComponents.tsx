import styled from 'styled-components'

export const Container = styled.form`
  position: relative;
  margin-top: 0.5rem;
  background-color: #fff;
  box-shadow: 3px 2px 10px rgba(0, 0, 0, 0.125);
  border-radius: 5px;

  &:focus-within {
    outline: none;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0); */
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;

    &:after {
      content: '';
      position: absolute;
      bottom: 0px;
      left: 12px;
      right: 12px;
      height: 1px;
      background-color: rgb(211, 211, 211);
    }
  }
`
export const SearchBar = styled.input<{ iconLeft: boolean }>`
  border: none;
  width: 100%;
  border-radius: 5px;

  /* padding: 0.33rem 0.5rem; */
  padding: ${({ iconLeft }) =>
    iconLeft ? `12px 15px 12px 36px` : `12px 15px 12px 15px`};
  font-weight: normal;
  background: none;
  border: 1px solid #aaa;

  &:focus {
    outline: none;
    /* border-bottom: 1px solid rgba(0, 0, 0, 0); */
    padding-bottom: 13px;
    border-bottom: none;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }
`
export const Results = styled.div`
  /* position: absolute; */
  /* left: 0; */
  /* right: 0; */
  display: flex;
  max-height: 30rem;
  overflow-y: scroll;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 3px 10px 10px rgba(0, 0, 0, 0.125);
  border-radius: 10px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  border: 1px solid #aaa;
  border-top: none;
  align-items: flex-start;
  z-index: 1;
  padding-top: none;
`

export const Selected = styled.div`
  /* border-bottom: 1px solid ${({ theme }) => theme.colorMedGray}; */
  position: relative;
  /* padding-bottom: 5px;
  padding-top: 5px;
  margin-bottom: 5px; */
  display: flex;
  flex-direction: column;
  width: 100%;

  :after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 11px;
    right: 11px;
    height: 1px;
    background-color: rgb(211, 211, 211);
  }
`

export const ItemButton = styled.button`
  background: none;
  border: none;
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
`

const clearButtonHeight = 18
export const SearchIcon = styled.div<{
  searchString: string
  iconSVG?: string
  iconLeft: boolean
}>`
  display: ${({ searchString, iconLeft }) =>
    iconLeft || searchString === '' ? 'block' : 'none'};
  position: absolute;
  top: calc(50% - ${clearButtonHeight / 2}px);
  ${({ iconLeft }) => (iconLeft ? `left: 12px` : `right: 12px`)};
  border: none;
  background: none;
  background-image: ${({ iconSVG }) =>
    iconSVG
      ? `url("data:image/svg+xml,${iconSVG}")`
      : `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9H6Z' fill='%23333333'/%3E%3C/svg%3E%0A")`};
  /* background-image: ${({ searchString }) =>
    searchString === ''
      ? `url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='15' cy='15' r='15' fill='%23AAACAE'/%3E%3Cpath d='M18.2083 16.8333H17.4842L17.2275 16.5858C18.1258 15.5408 18.6667 14.1842 18.6667 12.7083C18.6667 9.4175 15.9992 6.75 12.7083 6.75C9.4175 6.75 6.75 9.4175 6.75 12.7083C6.75 15.9992 9.4175 18.6667 12.7083 18.6667C14.1842 18.6667 15.5408 18.1258 16.5858 17.2275L16.8333 17.4842V18.2083L21.4167 22.7825L22.7825 21.4167L18.2083 16.8333V16.8333ZM12.7083 16.8333C10.4258 16.8333 8.58333 14.9908 8.58333 12.7083C8.58333 10.4258 10.4258 8.58333 12.7083 8.58333C14.9908 8.58333 16.8333 10.4258 16.8333 12.7083C16.8333 14.9908 14.9908 16.8333 12.7083 16.8333Z' fill='white' stroke='white' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 105 105' style='enable-background:new 0 0 105 105;' xml:space='preserve'%3E%3Cpath style='fill:%2300000055;' d='M52.5,0C23.51,0,0,23.51,0,52.5C0,81.49,23.51,105,52.5,105c28.99,0,52.5-23.51,52.5-52.5 C105,23.51,81.49,0,52.5,0z M74.42,82.91L52.5,60.99L30.93,82.55l-8.49-8.49L44.01,52.5L22.09,30.58l8.49-8.49L52.5,44.01 l21.57-21.57l8.49,8.49L60.99,52.5l21.92,21.92L74.42,82.91z'/%3E%3C/svg%3E%0A")`}; */
  background-repeat: no-repeat;
  height: ${clearButtonHeight}px;
  width: ${clearButtonHeight}px;
  background-position: right center;
  background-size: contain;
`
