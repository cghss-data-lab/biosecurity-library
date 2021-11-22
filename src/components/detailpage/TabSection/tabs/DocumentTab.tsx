import React from 'react'

import TabContentContainer from '../TabContentContainer'
import { PageContext } from '../../../../templates/Detail'

const DocumentTab = ({ data }: PageContext): JSX.Element => {
  return (
    <TabContentContainer>
      <iframe
        title="document preview"
        src={data.Files_INTERNAL.localFiles[0].publicURL}
        style={{ height: '80vh', width: '100%' }}
      />
    </TabContentContainer>
  )
}

export default DocumentTab
