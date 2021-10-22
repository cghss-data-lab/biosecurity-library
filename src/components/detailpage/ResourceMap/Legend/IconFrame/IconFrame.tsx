import React, { ReactElement } from 'react'
import { IconFrameShape } from '../legendTypes'
import { Hexagon } from './Hexagon'

type IconFrameProps = {
  shape?: IconFrameShape
  color?: string
  children: ReactElement
}
/**
 * Frames an icon with a shape
 */
export const IconFrame = ({ shape, color, children }: IconFrameProps) => {
  switch (shape) {
    case undefined:
      return <>{children}</>
    case 'hexagon':
      return <Hexagon {...{ color }}>{children}</Hexagon>
    default:
      return <>{children}</>
  }
}
