import React from 'react'
import styled, { useTheme } from 'styled-components'
import CMS from '@talus-analytics/library.airtable-cms'

// prettier-ignore
const Tag = styled.div<{ foregroundColor: string, backgroundColor: string, borderColor: string, name: string}>`
  padding: 0.3em 1em;
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 2em;
  width: fit-content;
  display: flex;
  align-items: center;
  color: ${({ foregroundColor }) => foregroundColor};
  font-size: 16px;
  background-color: ${({ backgroundColor }) => backgroundColor}; ;

  ${({name, foregroundColor}) => name !== 'Key resource' && `
      &:hover {
        text-decoration: underline;
        text-decoration-color: ${foregroundColor};
      }
  `}
`

interface IconTagProps extends React.ComponentPropsWithoutRef<'div'> {
  name: string
  dark?: boolean
  overrideBackground?: string
  overrideBorder?: string
  overrideForeground?: string
}

const IconTag = ({
  name,
  dark = false,
  overrideBackground,
  overrideBorder,
  overrideForeground,
  ...props
}: IconTagProps): JSX.Element => {
  const theme: any = useTheme()

  // let iconOverride

  let backgroundColor: string =
    overrideBackground ?? (dark ? theme.colorDarker : `rgba(0,0,0,0)`)
  let borderColor: string =
    overrideBorder ?? (dark ? theme.colorSuperDarkest : theme.colorDarkest)
  let foregroundColor: string =
    overrideForeground ?? (dark ? theme.colorWhite : theme.colorDarkest)

  // special case for key resource
  if (name === 'Key resource') {
    backgroundColor = theme.colorYellow
    borderColor = theme.colorGolden
    foregroundColor = theme.colorDarkest
  }

  return (
    <Tag {...{ foregroundColor, backgroundColor, borderColor, name, ...props }}>
      <CMS.Icon
        name={name}
        color={foregroundColor}
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
