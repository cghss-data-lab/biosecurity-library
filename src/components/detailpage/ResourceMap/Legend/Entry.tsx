import React, { FC } from 'react'
import styled, { useTheme } from 'styled-components'
import AirtableCMSIcon from '../../../../airtable-cms/AirtableCMSIcon'

const LegendEntryContainer = styled.div`
  display: flex;
  align-items: center;
  line-height: 1.2;
  > div {
    &:last-child {
      margin-left: 1em;
      max-width: 200px;
    }
  }
  font-weight: 600;
  font-size: 0.8em;
`

interface LegendEntryProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: string
}

const Entry: FC<LegendEntryProps> = ({ label, value }) => {
  const theme: any = useTheme()
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

export default Entry
