import React from 'react'

import { AirtableCMSData } from '@talus-analytics/library.airtable.cms-types'
import getCMSDownloadInfo from './getCMSDownloadInfo'
import { OutboundLink } from 'gatsby-plugin-gtag'

export interface CMSDownloadProps extends React.ComponentPropsWithRef<'a'> {
  /**
   * name of the text section in the table
   */
  name: string
  /**
   * result from the standard-format airtable
   * CMS query; may include both text and images.
   */
  data: AirtableCMSData
  /**
   * Suppress error handling; this will return
   * an empty fragment instead of throwing an
   * error if the requested text is missing
   * or empty.
   */
  noEmitError?: boolean
  /**
   * Array of children. If ommitted, the text
   * inside the link will be pulled from the
   * "text" field in the airtable base.
   */
  children?: React.ReactNode
}

const CMSDownload = ({
  name,
  data,
  children,
  noEmitError = false,
  ...props
}: CMSDownloadProps) => {
  const downloadInfo = getCMSDownloadInfo(data, name, noEmitError)
  if (!downloadInfo) return <></>

  return (
    <OutboundLink href={downloadInfo.publicURL} target="_blank" {...props}>
      {children || downloadInfo.text}
    </OutboundLink>
  )
}

export default CMSDownload
