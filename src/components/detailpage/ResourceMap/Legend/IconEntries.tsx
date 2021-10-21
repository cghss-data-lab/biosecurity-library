import React from 'react'
import styled from 'styled-components'
import { Icon } from '../ResourceMap'
import Entry from './Entry'
import { Frameable } from './legendTypes'

// const size: number = 50
const HexagonContainer = styled.div`
  position: absolute;
  z-index: -1;
  font-size: 57px;
  line-height: 14px;
  margin: 0;
`
export const Hexagon = ({ color }: { color: string }) => {
  return <HexagonContainer style={{ color }}>&#x2B22;</HexagonContainer>
}

export const IconEntries = ({ icons }: { icons: Icon[] }) => {
  return (
    <>
      {icons.map(icon => (
        <IconEntry value={icon.data.Name} />
      ))}
    </>
  )
}

type IconEntryProps =
  | {
      label?: string
      value: string
      color?: string
    } & Frameable

// TODO rename IconEntry and Entry so they're rationally named
export const IconEntry = (props: IconEntryProps) => {
  return (
    <Entry
      {...props}
      label={props.label !== undefined ? props.label : props.value}
    />
  )
}

export default IconEntries
