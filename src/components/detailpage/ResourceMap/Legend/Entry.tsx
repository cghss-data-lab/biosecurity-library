import React, { FC } from 'react'
import styled, { withTheme } from 'styled-components'
import AirtableCMSIcon from '../../../../airtable-cms/AirtableCMSIcon'

const LegendEntryContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  line-height: 1.2;
  > div:last-child {
    margin-left: 1em;
  }
  font-weight: 600;
  font-size: 0.8em;
`

interface LegendEntryProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string
  theme: any
}

const Entry: FC<LegendEntryProps> = ({ label, value, theme }) => {
  return (
    <LegendEntryContainer>
      <AirtableCMSIcon
        name={value}
        color={theme.colorDarker}
        style={{ height: 30 }}
      />
      <div>{label}</div>
    </LegendEntryContainer>
  )
}

export default withTheme(Entry)
