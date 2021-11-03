"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importStar(require("react"));
const internal_1 = require("./internal");
__exportStar(require("./internal"), exports);
function Network(_a) {
    var { initGraphData = internal_1.demoGraphData, hoveredNode, setHoveredNode, selectedNode, setSelectedNode, is3D = false, activeProj, customSettings, interactionSettings = {
        enablePanInteraction: true,
        enableZoomInteraction: true,
        minZoom: 0.01,
        maxZoom: 1000,
    } } = _a, props = __rest(_a, ["initGraphData", "hoveredNode", "setHoveredNode", "selectedNode", "setSelectedNode", "is3D", "activeProj", "customSettings", "interactionSettings"]);
    const [settings] = (0, react_1.useState)(Object.assign(Object.assign({}, internal_1.defaultSettings), customSettings));
    const [graphData, setGraphData] = (0, react_1.useState)(initGraphData);
    const [_is3D] = (0, react_1.useState)(is3D);
    const [_hoveredNode, _setHoveredNode] = (0, react_1.useState)(hoveredNode !== undefined ? hoveredNode : null);
    const [_selectedNode, _setSelectedNode] = (0, react_1.useState)(selectedNode !== undefined ? selectedNode : null);
    // create dummy project for visual interface
    // TODO implement project system
    const dummyProj = new internal_1.Project((newGraphData) => {
        setGraphData(newGraphData);
    }, "New project", settings);
    (0, react_1.useEffect)(() => {
        // bind internal graph data state function call
        if (activeProj !== undefined)
            activeProj.onGraphDataChange = (newGraphData) => {
                setGraphData(newGraphData);
            };
    }, [activeProj]);
    return ((0, jsx_runtime_1.jsx)(internal_1.NetworkMap, Object.assign({}, props, { activeProj: activeProj === undefined ? dummyProj : activeProj }, {
        graphData,
        is3D: _is3D,
        hoveredNode: hoveredNode !== undefined ? hoveredNode : _hoveredNode,
        setHoveredNode: setHoveredNode !== undefined ? setHoveredNode : _setHoveredNode,
        selectedNode: selectedNode !== undefined ? selectedNode : _selectedNode,
        setSelectedNode: setSelectedNode !== undefined ? setSelectedNode : _setSelectedNode,
        interactionSettings,
    }), void 0));
}
exports.Network = Network;
exports.default = Network;
//# sourceMappingURL=network.js.map