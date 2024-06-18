// TODO make into a bit component
import React, { FC, ReactElement } from 'react'
import Tippy from '@tippyjs/react'
import CMS from 'AirtableCMS'
import { useTheme } from 'styled-components'
// import 'tippy.js/dist/tippy.css' // optional

interface InfoTipProps {
  /**
   * String or React element to display in info tooltip popup.
   */
  content: string | ReactElement
}
/**
 * Info tooltip displaying the string or React element provided on hover using
 * an Airtable CMS icon named "Info"
 *
 * Note: If using `InfoTip` on same page as `ResourceMap` component, refreshing
 * the page may cause unexpected `ResourceMap` sizing in develop mode, but this
 * issue has not yet occurred in builds.
 *
 * @param props `InfoTipProps`
 * @returns Info tooltip
 */
export const InfoTip: FC<InfoTipProps> = ({ content }) => {
  const theme: any = useTheme()

  return (
    <Tippy {...{ content }}>
      {/* Wrapper needed for icon hover to register, and alignment */}
      <CMS.Icon
        name={'Info'}
        color={theme.colorDarker}
        style={{ height: '.5em', marginLeft: '.25em' }}
      />
    </Tippy>
  )
}
