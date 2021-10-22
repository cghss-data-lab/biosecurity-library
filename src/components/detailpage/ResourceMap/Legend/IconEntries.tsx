/**
 * List of resource map icon entries
 */
import React from 'react'
import styled from 'styled-components'
import { Icon } from '../ResourceMap'
import AirtableIconEntry from './AirtableIconEntry'
import { Frameable } from './legendTypes'

// TODO refactor hexagon component into icon frames component(s)
// calculate hexagon dimensions and margins
const size: number = 30
const shrinkFactor: number = 1.75
const innerIconSize: number = size / shrinkFactor
const margin: number = size / 2 - innerIconSize / 2
const HexagonContainer = styled.div`
  z-index: -1;
  position: relative;
  height: ${size}px;
  width: ${size}px;
`

const HexagonGraphic = styled.div`
  height: ${size}px;
  width: ${size}px;
  > svg {
    position: absolute;
    z-index: -1;
    & + [role='img'] {
      svg {
        height: ${innerIconSize}px;
        width: ${innerIconSize}px;
        margin: ${margin}px;
      }
    }
  }
`
export const Hexagon = ({
  color,
  children,
}: {
  color: string
  children: any
}) => {
  return (
    <HexagonContainer style={{ color }}>
      <HexagonGraphic>
        <svg
          id="color-fill"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width={size}
          height={size}
          transform={'rotate(90)'}
          viewBox={`0 0 ${300} ${300}`}
        >
          <polygon
            fill={color}
            points="300,150 225,280 75,280 0,150 75,20 225,20"
          ></polygon>
        </svg>
        {children}
      </HexagonGraphic>
    </HexagonContainer>
  )
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
    <AirtableIconEntry
      {...props}
      label={props.label !== undefined ? props.label : props.value}
    />
  )
}

export default IconEntries
