import React, { createContext } from 'react'

export interface IconsQueryData {
  iconsQuery: {
    nodes: {
      data: {
        Name: string
        Text: string
        SVG: {
          localFiles: {
            childSvg: {
              svgString: string
            }
          }[]
        }
      }
    }[]
  }
}

export const IconsContext = createContext<null | IconsQueryData>(null)

export interface CMSIconProviderProps {
  children: React.ReactNode
  data: IconsQueryData
}

const CMSIconProvider = ({
  children,
  data,
}: CMSIconProviderProps): JSX.Element => (
  <IconsContext.Provider value={data}>{children}</IconsContext.Provider>
)

export default CMSIconProvider
