import React from 'react'
import { ThemeProvider } from 'styled-components'

import { semanticStyles } from './semanticStyles.module.scss'

// inline webpack require because it's easier that way in gatsby
const figmaStyles = require('sass-extract-loader?{"plugins":["sass-extract-js"]}!./styles.scss')

const FigmaProvider: React.FC = props => (
  <ThemeProvider theme={figmaStyles}>
    <div className={semanticStyles}>{props.children}</div>
  </ThemeProvider>
)

export default FigmaProvider
