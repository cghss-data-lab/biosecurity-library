"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
require("regenerator-runtime/runtime");
const react_1 = __importDefault(require("react"));
const react_2 = require("@testing-library/react");
const network_composition_1 = require("./network.composition");
const network_1 = require("./network");
it("should render with one canvas element", () => {
    const { container } = (0, react_2.render)((0, jsx_runtime_1.jsx)(network_composition_1.BasicNetwork, {}, void 0));
    const canvases = container.querySelectorAll("canvas");
    expect(canvases.length).toEqual(1);
});
it("should have no circular dependency issues", () => {
    expect(network_1.DataSource !== undefined).toStrictEqual(true);
    expect(network_1.AirtableDataSource !== undefined).toStrictEqual(true);
});
//# sourceMappingURL=network.spec.js.map