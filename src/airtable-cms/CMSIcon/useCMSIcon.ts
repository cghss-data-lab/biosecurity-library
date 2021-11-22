import { useContext } from 'react'

import replaceFill from './replaceFill'

import { IconsContext } from './CMSIconContext'

interface Icon {
  svg: string
  text: string
}

function useCMSIcon(
  name: string,
  color: string,
  noEmitError: true
): Icon | undefined
function useCMSIcon(
  name: string,
  color: string,
  noEmitError: boolean
): Icon | undefined
function useCMSIcon(name: string, color: string, noEmitError?: false): Icon
function useCMSIcon(
  name: string,
  color: string,
  noEmitError?: true | false | boolean | undefined
) {
  const iconsQuery = useContext(IconsContext)
  if (!iconsQuery) return undefined
  const icons = iconsQuery.iconsQuery.nodes

  if (icons.length === 0) {
    if (noEmitError) return undefined
    throw new Error(
      `No icons found in icons context. Does a parent ` +
        `component include the <CMSIconsProvider /> ` +
        `component and is that component passed a non-empty ` +
        `result from useCMSIconsQuery() query hook? `
    )
  }

  const icon = icons.find(icon => icon.data.Name === name)

  if (!icon) {
    if (noEmitError === true) return undefined

    throw new Error(
      `Icon ${name} not found in ` +
        `Airtable. Does the airtable base include the ` +
        `Icons table, and does that table include ` +
        `an icon called ${name}?`
    )
  }

  const svgString = replaceFill(
    icon.data.SVG.localFiles[0].childSvg.svgString,
    color
  )

  return { text: icon.data.Text, svg: svgString }
}

export default useCMSIcon
