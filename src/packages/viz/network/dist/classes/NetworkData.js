"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkData = void 0;
/**
 * Define set of nodes and links between them.
 */
class NetworkData {
    constructor() {
        this.nodes = [];
        this.links = [];
    }
    /**
     * Return this network graph data in format required by network
     * map components.
     */
    getDataForMap() {
        return {
            nodes: this.nodes,
            links: this.links,
        };
    }
    /**
     * Update or add notes based on the input nodes, including updating links.
     * @param {GraphNode[]} inputNodes The input nodes
     */
    updateNodes(inputNodes) {
        const existingNodes = this.nodes
            .map((n) => {
            const match = inputNodes.find((nn) => nn._id === n._id);
            if (match !== undefined) {
                return Object.assign(Object.assign({}, match), { x: n.x, y: n.y, fx: n.x, fy: n.y });
            }
            return null;
        })
            .filter((v) => v !== null);
        const existingNodeIds = existingNodes.map((n) => n._id);
        const trulyNewNodes = inputNodes.filter((nn) => !existingNodeIds.includes(nn._id));
        const updatedNodes = [...existingNodes, ...trulyNewNodes];
        this.nodes = updatedNodes;
        this.links = this.links.map((l) => {
            const newSource = updatedNodes.find((n) => n._id === l.source._id);
            const newTarget = updatedNodes.find((n) => n._id === l.target._id);
            return Object.assign(Object.assign({}, l), { source: newSource !== undefined ? newSource : l.source, target: newTarget !== undefined ? newTarget : l.target });
        });
    }
    /**
     * Update or add notes based on the input links.
     * @param {GraphNode[]} inputLinks The input links
     */
    updateLinks(inputLinks) {
        this.links = inputLinks;
    }
    updateDataFromSource(ds) {
        return __awaiter(this, void 0, void 0, function* () {
            this.updateLinks(ds.links);
            this.updateNodes(ds.nodes);
        });
    }
}
exports.NetworkData = NetworkData;
//# sourceMappingURL=NetworkData.js.map