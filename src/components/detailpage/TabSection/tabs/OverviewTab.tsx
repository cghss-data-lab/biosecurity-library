import React from 'react'
import styled from 'styled-components'

import { PageContext } from '../../../../templates/detail'

const ContentSection = styled.section`
  grid-area: content;
  padding: 15px;
  border-top: 1px solid ${({ theme }) => theme.colorMedGray};
  border-left: 1px solid ${({ theme }) => theme.colorMedGray};
`

const OverviewTab: React.FC<PageContext> = ({ data }) => (
  <ContentSection>
    <h5>SUMMARY</h5>
    <p>{data.Long_Description}</p>
    <h5>RESOURCE TYPE</h5>
    <p>{data.Resource_Type}</p>
    <h5>CATEGORIES</h5>
    {console.log(data.Key_Topic_Area_s_)}
    <p>{data.Key_Topic_Area_s_?.map(topic => topic + ', ')}</p>
  </ContentSection>
)

export default OverviewTab
