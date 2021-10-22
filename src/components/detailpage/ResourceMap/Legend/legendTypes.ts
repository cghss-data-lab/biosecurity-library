export type IconFrameShape = 'hexagon'
export type Frameable =
  | {
      frameShape?: undefined
      frameColor: never
    }
  | {
      frameShape?: IconFrameShape
      frameColor?: string
    }
