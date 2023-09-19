import React from 'react'
import styled from 'styled-components'
import useFooterData from 'airtableQueryHooks/useFooterData'
import CMS from 'AirtableCMS'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #565e69;
`

const LogoLink = styled.a`
  display: flex;
  margin: 15px 33px;
  align-items: center;
  justify-content: center;
`
const Logo = styled(CMS.Image)``

const Footer = (): JSX.Element => {
  const footerData = useFooterData()

  const imgScale = 0.75

  return (
    <Container>
      <LogoLink
        style={{ height: 90 * imgScale, width: 272 * imgScale }}
        href={CMS.getText(footerData, 'WOAH link')}
      >
        <Logo
          imgStyle={{ objectFit: 'contain' }}
          name="WOAH logo"
          data={footerData}
        />
      </LogoLink>
      <LogoLink
        style={{ height: 90 * imgScale, width: 448 * imgScale }}
        href={CMS.getText(footerData, 'Canada link')}
      >
        <Logo
          imgStyle={{ objectFit: 'contain' }}
          name="Canada logo"
          data={footerData}
        />
      </LogoLink>
      <LogoLink
        style={{ height: 90 * imgScale, width: 460 * imgScale }}
        href={CMS.getText(footerData, 'Georgetown link')}
      >
        <Logo
          style={{ top: 2 }}
          imgStyle={{ objectFit: 'contain' }}
          name="Georgetown logo"
          data={footerData}
        />
      </LogoLink>
    </Container>
  )
}

export default Footer
