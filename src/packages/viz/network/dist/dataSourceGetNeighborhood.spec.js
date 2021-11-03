"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("regenerator-runtime/runtime");
const network_1 = require("./network");
const _1 = require(".");
/**
 * Simple pair of nodes and links for testing purposes.
 */
const TEST_GRAPH_DATA = {
    nodes: [
        (0, network_1.initNode)("Node 1", 1, "square"),
        (0, network_1.initNode)("Node 2", 2),
        (0, network_1.initNode)("Node 3", 3),
    ],
    links: [
        { source: 1, target: 1, value: 1 },
        { source: 1, target: 2, value: 1 },
        { source: 2, target: 3, value: 1 },
    ],
};
const TEST_DATA_SOURCE = new network_1.DataSource({
    name: "default",
    projects: [],
});
const TEST_NODE = TEST_GRAPH_DATA.nodes[0];
TEST_DATA_SOURCE.nodes = TEST_GRAPH_DATA.nodes;
TEST_DATA_SOURCE.links = TEST_GRAPH_DATA.links;
TEST_DATA_SOURCE.graphConfig.nodeTypes.push(new _1.NodeType("default", TEST_DATA_SOURCE, {
    idFieldName: "_id",
    shape: _1.NodeShape.circle,
    hideUnlinked: false,
    hideUnselected: true,
    showLabels: true,
    labelPos: "center",
    fontSize: 16,
    size: 1,
}, _1.NodeOrigin.record));
describe("method: dataSource.getNeighborhood", () => {
    it("should return the node itself if `allowedNeighborDepth` is zero", () => {
        const graphData = TEST_DATA_SOURCE.getNeighborhood(TEST_NODE, TEST_GRAPH_DATA, 0);
        expect(graphData.nodes.length === 1).toStrictEqual(true); // only one node
        expect(graphData.links.length === 1).toStrictEqual(true); // only one link
        const firstResultNode = graphData.nodes[0];
        const nodeIsSelf = firstResultNode._id === TEST_NODE._id;
        expect(nodeIsSelf).toStrictEqual(true);
        const allLinksHaveSelf = !graphData.links.some((l) => {
            const linkEndsAreStrings = typeof l.source !== "object" && typeof l.target !== "object";
            if (linkEndsAreStrings)
                return l.source !== TEST_NODE._id && l.target !== TEST_NODE._id;
            else {
                return (l.source._id !== TEST_NODE._id &&
                    l.target._id !== TEST_NODE._id);
            }
        });
        expect(allLinksHaveSelf).toStrictEqual(true);
    });
    it("should return correct vals for demo data primary connections", () => {
        const graphData = TEST_DATA_SOURCE.getNeighborhood(TEST_NODE, TEST_GRAPH_DATA, 1);
        expect(graphData.nodes.length === 2).toStrictEqual(true);
        expect(graphData.links.length === 2).toStrictEqual(true);
        const nodeIds = graphData.nodes.map((n) => n._id);
        expect(nodeIds.includes(1) && nodeIds.includes(2));
    });
});
//# sourceMappingURL=dataSourceGetNeighborhood.spec.js.map