// TODO make into a bit component
import React, { FC, ReactElement } from 'react'
import Tippy from '@tippyjs/react'
import CMSIcon from '../../airtable-cms/CMSIcon/CMSIcon'
import styled, { useTheme } from 'styled-components'
// import 'tippy.js/dist/tippy.css' // optional

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 0;
  justify-content: center;
  text-align: center;
  margin-left: 0.25em;
`
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
      <Wrapper>
        <CMSIcon
          name={'Info'}
          color={theme.colorDarker}
          style={{ height: 10 }}
        />
      </Wrapper>
    </Tippy>
  )
}
