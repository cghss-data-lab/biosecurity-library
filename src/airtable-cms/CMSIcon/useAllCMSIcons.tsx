import { parse } from 'node-html-parser'
import { useMemo } from 'react'
import useIconsQuery from './useCMSIconsQuery'

const useAllCMSIcons = () => {
  const nodes = useIconsQuery()
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
