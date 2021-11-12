// TODO add docs

import React, { FC } from 'react'
import styled, { useTheme } from 'styled-components'
import CMSIcon from '../../../../../airtable-cms/CMSIcon/CMSIcon'
import { IconFrame } from './IconFrame/IconFrame'
import { Frameable } from './legendTypes'
import WrappedLabel from './WrappedLabel'

const LegendEntryContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.33;
  > span {
    &:last-child {
      margin-left: 1em;
    }
  }
  /* font-weight: 600; */
  font-size: 0.8em;
  white-space: nowrap;
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
          <CMSIcon
            name={value}
            color={color === undefined ? theme.colorDarker : color}
            style={{ width: 30 }}
          />
        </IconFrame>
      </LegendIconContainer>
      <WrappedLabel>{label}</WrappedLabel>
    </LegendEntryContainer>
  )
}

export default AirtableIconEntry
