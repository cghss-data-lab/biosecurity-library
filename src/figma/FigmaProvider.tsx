import React from 'react'
import { ThemeProvider } from 'styled-components'

import { semanticStyles } from './semanticStyles.module.scss'

import './fonts.css'
import theme from './styles'

import CMS from 'AirtableCMS'
import useCMSIconsQuery from 'airtableQueryHooks/useIconsQuery'
import useSiteMetadataQuery from 'airtableQueryHooks/useSiteMetadataQuery'
import getTrackingId from 'utilities/trackingId'

// inline webpack require because it's easier that way in gatsby
// eslint-disable-next-line import/no-webpack-loader-syntax
// const figmaStyles = require('sass-extract-loader?{"plugins":["sass-extract-js"]}!./styles.scss')
const figmaStyles = theme

const FigmaProvider: React.FC = ({ children }) => {
  const icons = useCMSIconsQuery()

  const siteMetadata = useSiteMetadataQuery()
  // get GA tracking ID
  const trackingId = getTrackingId()

  return (
    <ThemeProvider theme={figmaStyles}>
      <CMS.IconProvider data={icons}>
        <CMS.SiteMetadataProvider data={siteMetadata} trackingId={trackingId}>
          <div className={semanticStyles}>{children}</div>
        </CMS.SiteMetadataProvider>
      </CMS.IconProvider>
    </ThemeProvider>
  )
}

export default FigmaProvider
