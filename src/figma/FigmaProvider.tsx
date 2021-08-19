import React from 'react'
import { ThemeProvider } from 'styled-components'

import * as styles from './semanticStyles.module.scss'

import './fonts.css'

// inline webpack require because it's easier that way in gatsby
const figmaStyles = require('sass-extract-loader?{"plugins":["sass-extract-js"]}!./styles.scss')

const FigmaProvider: React.FC = ({ children }) => (
  <ThemeProvider theme={figmaStyles}>
    <div className={styles.semanticStyles}>{children}</div>
  </ThemeProvider>
)

export default FigmaProvider
