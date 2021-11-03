"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicNetwork = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const network_1 = require("./network");
const BasicNetwork = () => (0, jsx_runtime_1.jsx)(network_1.Network, { initGraphData: network_1.demoGraphData }, void 0);
exports.BasicNetwork = BasicNetwork;
//# sourceMappingURL=network.composition.js.map