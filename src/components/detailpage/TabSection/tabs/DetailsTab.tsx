import React from 'react'

import TabContentContainer from '../TabContentContainer'
import { PageContext } from '../../../../templates/Detail'
import { commaSeparatedList } from '../../../../utilities/grammar'

const DetailsTab = ({ data }: PageContext): JSX.Element => {
  return (
    <TabContentContainer>
      <h5>RESOURCE TYPE</h5>
      <p>{data.Resource_type}</p>
      <h5>CATEGORIES</h5>
      <p>{commaSeparatedList(data.Key_topic_area)}</p>
      <h5>TARGET USERS</h5>
      <p>{commaSeparatedList(data.Target_user_role)}</p>
      <h5>RECOMMENDED USERSHIP</h5>
      <p>{commaSeparatedList(data.Potential_user_role)}</p>
      <h5>URL</h5>
      <p>
        <a href={data.URL_for_resource}>{data.URL_for_resource}</a>
      </p>
      <h5>ACCESS INFORMATION</h5>
      <p>{data.Access_method}</p>
      <h5>ACCESS LIMITATIONS</h5>
      <p>{data.Access_limitations}</p>
      <h5>{data.Resource_language.length > 1 ? 'LANGUAGES' : 'LANGUAGE'}</h5>
      <p>{commaSeparatedList(data.Resource_language)}</p>
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
}

export default DetailsTab
