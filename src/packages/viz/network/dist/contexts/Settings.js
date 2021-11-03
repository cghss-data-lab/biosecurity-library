"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsContext = exports.defaultSettings = exports.labelPosOptionNames = void 0;
const react_1 = __importDefault(require("react"));
exports.labelPosOptionNames = ["center", "bottom"];
exports.defaultSettings = {
    theme: "light",
    nodes: {
        showNodeLabels: true,
        selectedColor: "#F6D356",
        allowedNeighborDepth: 1,
        fontSize: 9.5,
        labelPos: "bottom",
    },
    edges: {
        showEdges: true,
        edgeWidth: 0.5,
    },
    network: {
        paused: false,
    },
};
exports.SettingsContext = react_1.default.createContext(exports.defaultSettings);
//# sourceMappingURL=Settings.js.map