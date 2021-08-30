import React from 'react'

import { PageContext } from '../../../../templates/detail'
import { commaSeparatedList } from '../../../../utilities/grammar'
import TabContentContainer from '../TabContentContainer'

const AccessTab: React.FC<PageContext> = ({ data }) => (
  <TabContentContainer>
    <h5>URL</h5>
    <p>
      <a href={data.URL_for_Resource}>{data.URL_for_Resource}</a>
    </p>
    <h5>DOWNLOAD</h5>
    <p>
      Download the resource here or by clicking the button in the upper left
    </p>
    <h5>ACCESS INFORMATION</h5>
    <p>{data.Access_Information}</p>
    <h5>ACCESS LIMITATIONS</h5>
    <p>{data.Access_Limitations}</p>
    <h5>{data.Resource_Language.length > 1 ? 'LANGUAGES' : 'LANGUAGE'}</h5>
    <p>{commaSeparatedList(data.Resource_Language)}</p>
  </TabContentContainer>
)

export default AccessTab
