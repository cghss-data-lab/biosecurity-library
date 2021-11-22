import { GraphNode } from '@talus-analytics/viz.charts.network-tools'
import { NodePos } from './shapeTypes'

// shape functions
// https://github.com/vasturiano/react-force-graph/blob/master/example/custom-node-shape/index-canvas.html

export function asTriangle({ x, y }: NodePos, color: string, ctx: any) {
  if (x === undefined || y === undefined) return
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.moveTo(x, y - 5)
  ctx.lineTo(x - 5, y + 5)
  ctx.lineTo(x + 5, y + 5)
  ctx.fill()
}

export function asRect(
  { x, y, _size }: GraphNode,
  color: string,
  ctx: any,
  w: number = 9,
  h: number = 9
) {
  if (x === undefined || y === undefined) return
  const scale: number = _size !== undefined ? _size : 1
  ctx.fillStyle = color
  ctx.fillRect(x - (w * scale) / 2, y - (h * scale) / 2, w * scale, h * scale)
}

export function asCircle({ x, y, _size }: GraphNode, ctx: any, r: number = 5) {
  if (x === undefined || y === undefined) return
  ctx.beginPath()
  const rScale: number = _size !== undefined ? _size : 1
  ctx.arc(x, y, r * rScale, 0, 2 * Math.PI, false)
  ctx.fill()
}

/**
 * Draws a hexagon with the defined center point and size on the canvas.
 * @param param0 Origin of hexagon and size
 * @param ctx Canvas rendering context (2D)
 */
export function asHexagon(
  { x, y, _size }: GraphNode,
  ctx: CanvasRenderingContext2D
): void {
  if (x === undefined || y === undefined) return
  const r: number = _size || 1
  const a = (2 * Math.PI) / 6
  const rotRad: number = Math.PI / 2
  ctx.beginPath()
  for (var i = 0; i < 6; i++) {
    ctx.lineTo(
      x + r * Math.cos(a * i + rotRad),
      y + r * Math.sin(a * i + rotRad)
    )
  }
  ctx.closePath()
  ctx.fill()
}