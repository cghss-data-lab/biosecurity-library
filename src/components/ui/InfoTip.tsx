import React from 'react'
import Tippy from '@tippyjs/react'
// import 'tippy.js/dist/tippy.css' // optional

export const InfoTip = () => {
  // return null
  return (
    <Tippy key={'info'} content={'Wow'}>
      <button>Test</button>
    </Tippy>
  )
}
