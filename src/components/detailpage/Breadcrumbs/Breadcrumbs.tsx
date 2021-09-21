import React from 'react'
import styled from 'styled-components'
import { PageContext } from '../../../templates/Detail'

// only using this for the text styles...
import * as styles from './Breadcrumbs.module.scss'

const Div = styled.div`
  margin-top: 40px;
  color: ${({ theme }) => theme.colorDarkGray};
`

const Breadcrumbs: React.FC<PageContext> = ({ data }) => (
  <Div className={styles.breadcrumbs}>
    Home / {data.Resource_Type} / {data.Unique_ID}
  </Div>
)

export default Breadcrumbs
