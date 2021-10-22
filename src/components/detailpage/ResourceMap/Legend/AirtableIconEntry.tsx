/**
 * Resource map legend entry based on an Airtable icon, possible w/ a frame
 */

// TODO add docs

import React, { FC } from 'react'
import styled, { useTheme } from 'styled-components'
import AirtableCMSIcon from '../../../../airtable-cms/AirtableCMSIcon'
import { Hexagon } from './IconEntries'
import { Frameable } from './legendTypes'
import WrappedLabel from './WrappedLabel'

const LegendEntryContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.2;
  > span {
    &:last-child {
      margin-left: 1em;
    }
  }
  font-weight: 600;
  font-size: 0.8em;
`

const LegendIconContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`

type LegendEntryProps = {
  label: string
  value: string
  color?: string
} & Frameable

const AirtableIconEntry: FC<LegendEntryProps> = ({
  label,
  value,
  color,
  frame,
  frameColor,
}) => {
  const theme: any = useTheme()
  return (
    <LegendEntryContainer>
      <LegendIconContainer>
        {frame === 'hexagon' && (
          <Hexagon color={frameColor || 'lightgray'}>
            <AirtableCMSIcon
              name={value}
              color={color === undefined ? theme.colorDarker : color}
              style={{ height: 30 }}
            />
          </Hexagon>
        )}
        {frame === undefined && (
          <AirtableCMSIcon
            name={value}
            color={color === undefined ? theme.colorDarker : color}
            style={{ height: 30 }}
          />
        )}
      </LegendIconContainer>
      <WrappedLabel>{label}</WrappedLabel>
    </LegendEntryContainer>
  )
}

export default AirtableIconEntry
