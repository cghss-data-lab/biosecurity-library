export type IconFrame = 'hexagon'
export type Frameable =
  | {
      frame?: undefined
      frameColor: never
    }
  | {
      frame?: IconFrame
      frameColor?: string
    }
