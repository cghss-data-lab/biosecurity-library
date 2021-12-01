import CMS from '@talus-analytics/library.airtable-cms'
import React from 'react'
import styled, { useTheme } from 'styled-components'

const Tag = styled.div<{ dark: boolean }>`
  padding: 4px 15px 4px 15px;
  border: 1px solid ${({ theme }) => theme.colorDarkest};
  border-radius: 30px;
  width: fit-content;
  display: flex;
  align-items: center;
  color: ${({ theme, dark }) => (dark ? theme.colorWhite : theme.colorDarkest)};
  margin-bottom: 10px;
  ${({ theme, dark }) => dark && `background-color: ${theme.colorDarkest}`}
`

interface IconTagProps {
  name: string
  dark?: boolean
}

const IconTag = ({ name, dark = false }: IconTagProps): JSX.Element => {
  const theme: any = useTheme()

  return (
    <Tag dark={dark}>
      <CMS.Icon
        name={name}
        color={dark ? theme.colorWhite : theme.colorDarkest}
        style={{
          height: 24,
          width: 24,
          marginRight: 6,
          position: 'relative',
          top: -1,
        }}
      />
      {name}
    </Tag>
  )
}

export default IconTag
