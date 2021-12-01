import CMS from '@talus-analytics/library.airtable-cms'
import React from 'react'
import styled, { useTheme } from 'styled-components'

const Tag = styled.div<{ dark: boolean }>`
  padding: 0.3em 1em;
  border: 1px solid ${({ theme }) => theme.colorDarkest};
  border-radius: 2em;
  width: fit-content;
  display: flex;
  align-items: center;
  color: ${({ theme, dark }) => (dark ? theme.colorWhite : theme.colorDarkest)};
  font-size: 16px;
  ${({ theme, dark }) => dark && `background-color: ${theme.colorDarkest}`}
`

interface IconTagProps extends React.ComponentPropsWithoutRef<'div'> {
  name: string
  dark?: boolean
}

const IconTag = ({
  name,
  dark = false,
  ...props
}: IconTagProps): JSX.Element => {
  const theme: any = useTheme()

  return (
    <Tag dark={dark} {...props}>
      <CMS.Icon
        name={name}
        color={dark ? theme.colorWhite : theme.colorDarkest}
        style={{
          height: '1.4em',
          width: '1.4em',
          marginRight: '0.375em',
        }}
      />
      {name}
    </Tag>
  )
}

export default IconTag
