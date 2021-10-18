import React from 'react'
import { ThemeProvider } from 'styled-components'

import { semanticStyles } from './semanticStyles.module.scss'

import './fonts.css'

// inline webpack require because it's easier that way in gatsby
// eslint-disable-next-line import/no-webpack-loader-syntax
const figmaStyles = require('sass-extract-loader?{"plugins":["sass-extract-js"]}!./styles.scss')

const FigmaProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={figmaStyles}>
    <div className={semanticStyles}>{children}</div>
  </ThemeProvider>
)

export default FigmaProvider
