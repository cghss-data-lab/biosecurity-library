"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demoGraphData = exports.emptyGraphData = exports.defaultNodeDef = exports.LinkDirections = exports.NodeOrigin = exports.NodeShape = void 0;
const internal_1 = require("../internal");
var NodeShape;
(function (NodeShape) {
    NodeShape[NodeShape["circle"] = 0] = "circle";
    NodeShape[NodeShape["square"] = 1] = "square";
    NodeShape[NodeShape["triangle"] = 2] = "triangle";
})(NodeShape = exports.NodeShape || (exports.NodeShape = {}));
var NodeOrigin;
(function (NodeOrigin) {
    NodeOrigin[NodeOrigin["record"] = 0] = "record";
    NodeOrigin[NodeOrigin["field"] = 1] = "field";
})(NodeOrigin = exports.NodeOrigin || (exports.NodeOrigin = {}));
/**
 * Possible link direction(s)
 */
var LinkDirections;
(function (LinkDirections) {
    LinkDirections[LinkDirections["source"] = 0] = "source";
    LinkDirections[LinkDirections["target"] = 1] = "target";
    LinkDirections[LinkDirections["both"] = 2] = "both";
    LinkDirections[LinkDirections["either"] = 3] = "either";
})(LinkDirections = exports.LinkDirections || (exports.LinkDirections = {}));
exports.defaultNodeDef = {
    idFieldName: "id",
    labelByField: "label",
    colorByField: "color",
    iconByField: "icon",
    shape: NodeShape.circle,
    hideUnlinked: false,
    hideUnselected: true,
    showLabels: internal_1.defaultSettings.nodes.showNodeLabels,
    labelPos: internal_1.defaultSettings.nodes.labelPos,
    fontSize: internal_1.defaultSettings.nodes.fontSize,
    size: 1,
};
/**
 * Empty graph data structure.
 */
exports.emptyGraphData = {
    nodes: [],
    links: [],
};
/**
 * Simple set of nodes and links for demonstration purposes.
 */
exports.demoGraphData = {
    nodes: [
        (0, internal_1.initNode)("Node 1", 1, "square"),
        (0, internal_1.initNode)("Node 2", 2),
        (0, internal_1.initNode)("Node 3", 3),
        (0, internal_1.initNode)("Node 4", 4),
        (0, internal_1.initNode)("Node 5", 5),
    ],
    links: [
        { source: 1, target: 1, value: 1 },
        { source: 1, target: 2, value: 1 },
        { source: 2, target: 3, value: 1 },
        { source: 2, target: 4, value: 1 },
        { source: 4, target: 1, value: 1 },
        { source: 5, target: 1, value: 1 },
        { source: 5, target: 4, value: 1 },
        { source: 5, target: 3, value: 1 },
        { source: 5, target: 2, value: 1 },
    ],
};
//# sourceMappingURL=networkTypes.js.map