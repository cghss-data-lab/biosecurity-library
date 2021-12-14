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
  display: block;
  margin: 15px 33px;
`
const Logo = styled(CMS.Image)``

const Footer = (): JSX.Element => {
  const footerData = useFooterData()

  return (
    <Container>
      <LogoLink
        style={{ height: 90, width: 513 }}
        href={CMS.getText(footerData, 'Canada link')}
      >
        <Logo
          imgStyle={{ objectFit: 'contain' }}
          name="Canada logo"
          data={footerData}
        />
      </LogoLink>
      <LogoLink
        style={{ height: 90, width: 265 }}
        href={CMS.getText(footerData, 'Georgetown link')}
      >
        <Logo
          imgStyle={{ objectFit: 'contain' }}
          name="Georgetown logo"
          data={footerData}
        />
      </LogoLink>
      <LogoLink
        style={{ height: 90, width: 168 }}
        href={CMS.getText(footerData, 'Talus link')}
      >
        <Logo
          imgStyle={{ objectFit: 'contain' }}
          name="Talus logo"
          data={footerData}
        />
      </LogoLink>
    </Container>
  )
}

export default Footer
