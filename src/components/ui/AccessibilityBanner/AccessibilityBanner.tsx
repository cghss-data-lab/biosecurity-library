import CMS from '@talus-analytics/library.airtable-cms'
import React from 'react'
import styled, { useTheme } from 'styled-components'

const Container = styled.section`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colorYellow};
  background-color: ${({ theme }) => theme.colorVeryLightYellow};
  border-radius: 2px;
  padding: 15px;
  flex-grow: 0;
  width: 100%;
  margin: 0 auto;

  p {
    font-family: Open Sans, Arial, Helvetica, sans-serif !important;
    font-style: normal;
    font-weight: normal;
    font-size: 16px !important;
    line-height: 22px;
    margin-top: 0em !important;
    margin-bottom: 0em !important;
    > a {
      font-size: 16px !important;
    }
  }
`

const AccessibilityBanner = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const theme: any = useTheme()

  return (
    <Container>
      <CMS.Icon
        name="Notice"
        color={theme.colorGolden}
        style={{ position: 'relative', top: -1, marginRight: 4 }}
      />
      {children}
    </Container>
  )
}

export default AccessibilityBanner
