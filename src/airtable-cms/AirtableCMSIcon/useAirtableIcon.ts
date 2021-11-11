import replaceFill from './replaceFill'

import useAllAirtableIcons, { Icon } from './useAllAirtableIcons'

function useAirtableIcon(
  name: string,
  color: string,
  noEmitError: true
): Icon | undefined
function useAirtableIcon(
  name: string,
  color: string,
  noEmitError: boolean
): Icon | undefined
function useAirtableIcon(name: string, color: string, noEmitError?: false): Icon
function useAirtableIcon(
  name: string,
  color: string,
  noEmitError?: true | false | boolean | undefined
) {
  const icons = useAllAirtableIcons()
  const icon = icons.find(icon => icon.name === name)

  if (!icon) {
    if (noEmitError === true) return undefined

    throw new Error(
      `Icon ${name} not found in ` +
        `Airtable. Does the airtable base include the ` +
        `Icons table, and does that table include ` +
        `an icon called ${name}?`
    )
  }

  const svgString = replaceFill(icon.svg, color).toString()

  return { text: icon.text, svg: svgString }
}

export default useAirtableIcon
