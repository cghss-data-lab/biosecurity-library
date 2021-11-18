import React from 'react'
import { ThemeProvider } from 'styled-components'

import { semanticStyles } from './semanticStyles.module.scss'

import './fonts.css'

import { CMSIconProvider } from '@talus-analytics/library.airtable.cms-icon'
import useCMSIconsQuery from '../airtableQueryHooks/useCMSIconsQuery'

// inline webpack require because it's easier that way in gatsby
// eslint-disable-next-line import/no-webpack-loader-syntax
const figmaStyles = require('sass-extract-loader?{"plugins":["sass-extract-js"]}!./styles.scss')

const FigmaProvider: React.FC = ({ children }) => {
  const icons = useCMSIconsQuery()

  return (
    <ThemeProvider theme={figmaStyles}>
      <CMSIconProvider data={icons}>
        <div className={semanticStyles}>{children}</div>
      </CMSIconProvider>
    </ThemeProvider>
  )
}

export default FigmaProvider
