// TODO refactor into viz.network package and hide

/**
 * Returns the minimum horizontal distance in pixels of the current canvas
 * pixels to the left edge of the canvas element.
 *
 * @param c The HTML canvas element
 * @returns The number of pixels away from the left edge of the canvas of the
 * non-transparent pixels.
 */
export default function getCanvasPixelsXMin(c: HTMLCanvasElement): number {
  const width: number = c?.getBoundingClientRect().width
  const canvasWidth: number = c?.width || 0
  if (canvasWidth === 0 || width === 0) return Infinity
  const canvasHeight: number = c?.height || 0
  let xMin: number = Infinity
  const ctx = c.getContext('2d')
  if (ctx === null) return Infinity
  for (let i = 0; i < canvasHeight; i++) {
    const rowData = ctx.getImageData(0, i, canvasWidth, 1)
    const arr: Uint8ClampedArray = rowData.data
    for (let j = 0; j < canvasWidth * 4; j += 4) {
      if (arr[j] !== 0 || arr[j + 1] !== 0 || arr[j + 2] !== 0) {
        if (j / 4 < xMin) {
          xMin = j / 4
        }
      }
    }
  }
  const scaleFactor: number = width / canvasWidth
  return scaleFactor * xMin
}
