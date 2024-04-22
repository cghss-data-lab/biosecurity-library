import React from 'react'

import TabContentContainer from '../TabContentContainer'
import { PageContextData } from '../../../../templates/Detail'
import { commaSeparatedList } from '../../../../utilities/grammar'
import DownloadOrAccessDropdown from 'components/detailpage/DownloadOrAccessDropdown/DownloadOrAccessDropdown'

const DetailsTab = ({ data }: PageContextData): JSX.Element => {
  return (
    <TabContentContainer>
      <h5>RESOURCE TYPE</h5>
      <p>{data.Resource_type}</p>
      <h5>KEY TOPIC {data.Key_topic_area.length === 1 ? 'AREA' : 'AREAS'}</h5>
      <p>
        {commaSeparatedList(
          data.Key_topic_area.sort((a, b) =>
            a.data.Name.localeCompare(b.data.Name)
          ).map(({ data: { Name } }) => Name)
        )}
      </p>
      <h5>
        TARGET USER {data.Target_user_role.length === 1 ? 'ROLE' : 'ROLES'}
      </h5>
      <p>
        {commaSeparatedList(
          data.Target_user_role.sort((a, b) =>
            a.data.Name.localeCompare(b.data.Name)
          ).map(({ data: { Name } }) => Name)
        )}
      </p>
      {data.User_type && (
        <>
          <h5>USER {data.User_type.length === 1 ? 'TYPE' : 'TYPES'}</h5>
          <p>
            {commaSeparatedList(
              data.User_type.sort((a, b) => a.localeCompare(b))
            )}
          </p>
        </>
      )}
      <h5>ACCESS LIMITATIONS</h5>
      <p>{data.Access_limitations}</p>
      <h5>ACCESS INFORMATION</h5>
      <p>{data.Access_method}</p>
      <h5>
        RESOURCE {data.Resource_language.length > 1 ? 'LANGUAGES' : 'LANGUAGE'}
      </h5>
      <p>{commaSeparatedList(data.Resource_language)}</p>
      {data.Edition && (
        <>
          <h5>EDITION</h5>
          <p>{data.Edition}</p>
        </>
      )}
      <h5>DOWNLOAD OR ACCESS</h5>
      <div>
        <DownloadOrAccessDropdown showBothButtons {...{ data }} />
      </div>
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
