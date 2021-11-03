"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkMap = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/**
 * Display a network map.
 */
const react_1 = __importDefault(require("react"));
const Network2D_1 = __importDefault(require("./Network2D/Network2D"));
const styled_components_1 = __importDefault(require("styled-components"));
const networkThemes_1 = require("../networkThemes");
const MapWindow = styled_components_1.default.div `
  height: 100%;
  width: 100%;
`;
const NetworkMap = (_a) => {
    var { activeProj, graphData, is3D, hoveredNode, setHoveredNode, selectedNode, setSelectedNode, interactionSettings, theme = networkThemes_1.defaultTheme } = _a, props = __rest(_a, ["activeProj", "graphData", "is3D", "hoveredNode", "setHoveredNode", "selectedNode", "setSelectedNode", "interactionSettings", "theme"]);
    if (activeProj === undefined ||
        (graphData !== undefined && graphData.nodes.length === 0))
        return (0, jsx_runtime_1.jsx)("div", {}, void 0);
    else
        return ((0, jsx_runtime_1.jsx)(MapWindow, { children: (0, jsx_runtime_1.jsx)(Network2D_1.default, Object.assign({ show: !is3D }, {
                activeProj,
                graphData,
                hoveredNode,
                setHoveredNode,
                selectedNode,
                setSelectedNode,
                interactionSettings,
                theme,
            }, props), void 0) }, void 0));
};
exports.NetworkMap = NetworkMap;
//# sourceMappingURL=NetworkMap.js.map