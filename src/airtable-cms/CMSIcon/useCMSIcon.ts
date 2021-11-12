import useIconsQuery from './useCMSIconsQuery'
import replaceFill from './replaceFill'

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
  const icons = useIconsQuery()
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
