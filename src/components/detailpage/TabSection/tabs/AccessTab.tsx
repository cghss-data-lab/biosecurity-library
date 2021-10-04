import React from 'react'

import { PageContext } from '../../../../templates/Detail'
import { commaSeparatedList } from '../../../../utilities/grammar'
import TabContentContainer from '../TabContentContainer'

const AccessTab: React.FC<PageContext> = ({ data }) => (
  <TabContentContainer>
    <h5>URL</h5>
    <p>
      <a href={data.URL_for_resource}>{data.URL_for_resource}</a>
    </p>
    <h5>DOWNLOAD</h5>
    <p>
      Download the resource here or by clicking the button in the upper left
    </p>
    <h5>ACCESS INFORMATION</h5>
    <p>{data.Access_information}</p>
    <h5>ACCESS LIMITATIONS</h5>
    <p>{data.Access_limitations}</p>
    <h5>{data.Resource_language.length > 1 ? 'LANGUAGES' : 'LANGUAGE'}</h5>
    <p>{commaSeparatedList(data.Resource_language)}</p>
  </TabContentContainer>
)

export default AccessTab
