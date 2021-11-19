import React from 'react'
import { ThemeProvider } from 'styled-components'

import { semanticStyles } from './semanticStyles.module.scss'

import './fonts.css'

import CMS, { useIconsQuery } from '@talus-analytics/library.airtable-cms'

// inline webpack require because it's easier that way in gatsby
// eslint-disable-next-line import/no-webpack-loader-syntax
const figmaStyles = require('sass-extract-loader?{"plugins":["sass-extract-js"]}!./styles.scss')

const FigmaProvider: React.FC = ({ children }) => {
  const icons = useIconsQuery()

  return (
    <ThemeProvider theme={figmaStyles}>
      <CMS.IconProvider data={icons}>
        <div className={semanticStyles}>{children}</div>
      </CMS.IconProvider>
    </ThemeProvider>
  )
}

export default FigmaProvider
