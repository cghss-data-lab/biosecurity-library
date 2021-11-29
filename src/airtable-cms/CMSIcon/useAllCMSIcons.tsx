import { useContext, useMemo } from 'react'
import { parse } from 'node-html-parser'

import { IconsContext } from './CMSIconContext'

const useAllCMSIcons = () => {
  let iconsQuery = useContext(IconsContext)
  if (!iconsQuery) iconsQuery = { iconsQuery: { nodes: [] } }

  const nodes = iconsQuery.iconsQuery.nodes

  const icons = useMemo(() => {
    return nodes.map(node => ({
      name: node.data.Name,
      svg: parse(node.data.SVG.localFiles[0].childSvg.svgString),
      text: node.data.Text,
    }))
  }, [nodes])

  return icons
}

export default useAllCMSIcons
