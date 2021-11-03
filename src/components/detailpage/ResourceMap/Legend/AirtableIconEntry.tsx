// TODO add docs

import React, { FC } from 'react'
import styled, { useTheme } from 'styled-components'
import AirtableCMSIcon from '../../../../airtable-cms/AirtableCMSIcon'
import { IconFrame } from './IconFrame/IconFrame'
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
  /* font-weight: 600; */
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

/**
 * Resource map legend entry based on an Airtable icon, possibly w/ a frame
 */
const AirtableIconEntry: FC<LegendEntryProps> = ({
  label,
  value,
  color,
  frameShape,
  frameColor,
}) => {
  const theme: any = useTheme()
  return (
    <LegendEntryContainer>
      <LegendIconContainer>
        <IconFrame shape={frameShape} color={frameColor}>
          <AirtableCMSIcon
            name={value}
            color={color === undefined ? theme.colorDarker : color}
            style={{ height: 30 }}
          />
        </IconFrame>
      </LegendIconContainer>
      <WrappedLabel>{label}</WrappedLabel>
    </LegendEntryContainer>
  )
}

export default AirtableIconEntry
