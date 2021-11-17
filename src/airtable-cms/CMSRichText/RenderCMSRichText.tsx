import React from 'react'
import parseCMSRichText from './parseCMSRichText'

export interface RenderCMSRichTextProps {
  /**
   * string containing raw markdown from
   * an airtable rich text column
   */
  markdown: string
}

const RenderCMSRichText = ({
  markdown,
}: RenderCMSRichTextProps): JSX.Element => (
  <div dangerouslySetInnerHTML={{ __html: parseCMSRichText(markdown) }} />
)

export default RenderCMSRichText
