"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asHexagon = exports.asCircle = exports.asRect = exports.asTriangle = void 0;
// shape functions
// https://github.com/vasturiano/react-force-graph/blob/master/example/custom-node-shape/index-canvas.html
function asTriangle({ x, y }, color, ctx) {
    if (x === undefined || y === undefined)
        return;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y - 5);
    ctx.lineTo(x - 5, y + 5);
    ctx.lineTo(x + 5, y + 5);
    ctx.fill();
}
exports.asTriangle = asTriangle;
function asRect({ x, y, _size }, color, ctx, w = 9, h = 9) {
    if (x === undefined || y === undefined)
        return;
    const scale = _size !== undefined ? _size : 1;
    ctx.fillStyle = color;
    ctx.fillRect(x - (w * scale) / 2, y - (h * scale) / 2, w * scale, h * scale);
}
exports.asRect = asRect;
function asCircle({ x, y, _size }, ctx, r = 5) {
    if (x === undefined || y === undefined)
        return;
    ctx.beginPath();
    const rScale = _size !== undefined ? _size : 1;
    ctx.arc(x, y, r * rScale, 0, 2 * Math.PI, false);
    ctx.fill();
}
exports.asCircle = asCircle;
/**
 * Draws a hexagon with the defined center point and size on the canvas.
 * @param param0 Origin of hexagon and size
 * @param ctx Canvas rendering context (2D)
 */
function asHexagon({ x, y, _size }, ctx) {
    if (x === undefined || y === undefined)
        return;
    const r = _size;
    const a = (2 * Math.PI) / 6;
    const rotRad = Math.PI / 2;
    ctx.beginPath();
    for (var i = 0; i < 6; i++) {
        ctx.lineTo(x + r * Math.cos(a * i + rotRad), y + r * Math.sin(a * i + rotRad));
    }
    ctx.closePath();
    ctx.fill();
}
exports.asHexagon = asHexagon;
//# sourceMappingURL=shapeHelpers.js.map