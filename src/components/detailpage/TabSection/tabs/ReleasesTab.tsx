import React from 'react'
import TabContentContainer from '../TabContentContainer'

import { PageContext } from '../../../../templates/Detail'

const ReleasesTab: React.FC<PageContext> = ({ data }) => (
  <TabContentContainer>
    {data.Edition && (
      <>
        <h5>EDITION</h5>
        <p>{data.Edition}</p>
      </>
    )}
    <h5>FIRST RELEASE DATE</h5>
    <p>{data.First_release_date?.split('-')[0]}</p>
    <h5>LAST UPDATE</h5>
    <p>{data.Last_update_date?.split('-')[0]}</p>
    <h5>UPDATE FREQUENCY</h5>
    <p>{data.Update_frequency}</p>
  </TabContentContainer>
)

export default ReleasesTab
