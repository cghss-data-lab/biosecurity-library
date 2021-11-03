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
exports.Project = void 0;
const internal_1 = require("../internal");
class Project {
    constructor(onGraphDataChange, name = "New project", settings) {
        this.name = name;
        this.dataSources = [];
        this.graphData = { nodes: [], links: [] };
        this.onGraphDataChange = onGraphDataChange;
        this.nodeIdMap = {};
        this.internalIdCounter = 0;
        this.networkGraphData = new internal_1.NetworkData();
        this.globalSettings = settings;
        this.selectedNode = null;
        // subscribe to data source config change events
        const listener = (eTmp) => __awaiter(this, void 0, void 0, function* () {
            const e = eTmp;
            if (e.detail !== undefined) {
                const ds = e.detail.dataSource;
                if (this.dataSources.includes(ds)) {
                    yield this.updateDataFromSource(ds);
                    console.debug("Updated because data source updated: " + ds);
                }
            }
        });
        if (typeof window !== "undefined")
            window.addEventListener("dataSourceConfigChange", listener.bind(this));
    }
    /**
     * Add the provided data source to the project.
     * @param {DataSource} s The source
     */
    addSource(s) {
        if (!this.dataSources.map((ds) => ds.name).some((name) => name === s.name)) {
            this.dataSources.push(s);
            s.onAdd();
            this.update();
        }
        else
            throw new Error("All project data sources must have unique names but this was" +
                " reused: " +
                s.name);
    }
    update(options) {
        this.onGraphDataChange(this.networkGraphData.getDataForMap(), options);
    }
    /**
     * Update nodes and links from the defined data source and trigger the
     * project's update function (i.e., to update the network map).
     * @param {DataSource} ds The source
     */
    updateDataFromSource(ds) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.networkGraphData.updateDataFromSource(ds);
            this.update({ reheat: true });
        });
    }
    getNodeDataFromJson(json, def = internal_1.defaultNodeDef) {
        const newNodes = json["nodes"] !== undefined ? json["nodes"] : json;
        return newNodes.map((row) => {
            const id = row[def.idFieldName];
            // TODO dynamically
            const uniqueIdField = "id";
            const internalId = this.internalIdCounter.toString();
            this.internalIdCounter++;
            this.nodeIdMap[id] = internalId;
            return Object.assign(Object.assign({}, row), { 
                // unique node id
                _id: row[uniqueIdField] || internalId, 
                // assume color hex is defined in color field
                _color: row[def.colorByField || "color"], _shape: row[def.shapeByField || "shape"], 
                // label
                name: row[def.labelByField || "label"] });
        });
    }
    parseMultiLinks(rawLinks) {
        return rawLinks.links !== undefined ? rawLinks.links : rawLinks; // TODO fix
    }
    addLinksFromJson(json, doUpdate = true) {
        const newLinks = json.edges !== undefined ? json.edges : json;
        const finalNewLinks = this.parseMultiLinks(newLinks);
        this.graphData = {
            nodes: this.graphData.nodes,
            links: [...this.graphData.links, ...finalNewLinks],
        };
        if (doUpdate)
            this.update();
        return finalNewLinks.length;
    }
    addNodesFromJson(newNodes, doUpdate = true) {
        const existingAndUpdatedNodes = this.graphData.nodes.map((n) => {
            const match = newNodes.find((nn) => nn.id === n.id);
            if (match)
                return Object.assign(Object.assign({}, match), { x: n.x, y: n.y, fx: n.x, fy: n.y });
            else
                return n;
        });
        // TODO efficiently ensure duplicate IDs cannot happen
        const trulyNewNodes = newNodes.filter((nn) => !existingAndUpdatedNodes.map((n) => n.id).includes(nn.id));
        const updatedNodes = [...existingAndUpdatedNodes, ...trulyNewNodes];
        this.graphData = {
            nodes: updatedNodes,
            // nodes: [...this.graphData.nodes, ...newNodes],
            links: this.graphData.links.map((l) => {
                const newSource = updatedNodes.find((n) => n.id === l.source.id);
                const newTarget = updatedNodes.find((n) => n.id === l.target.id);
                return Object.assign(Object.assign({}, l), { source: newSource !== undefined ? newSource : l.source, target: newTarget !== undefined ? newTarget : l.target });
            }),
        };
        if (doUpdate)
            this.update();
        return newNodes.length;
    }
    graphDataIsEmpty() {
        return (this.graphData.nodes.length === 0 && this.graphData.links.length === 0);
    }
    addFileData(fs) {
        return __awaiter(this, void 0, void 0, function* () {
            const addedSources = yield this.createSourcesFromFiles(fs);
            this.addSourceData(addedSources);
        });
    }
    updateNodesFor(source) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.dataSources.includes(source))
                throw new Error(`Project ${this.name} doesn't include data source ${source.name}`);
            const ns = yield source.getNodes();
            // this.removeSourceData([source], ["nodes"]);
            this.addNodesFromJson(ns, true);
        });
    }
    updateEdgesFor(source) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.dataSources.includes(source))
                throw new Error(`Project ${this.name} doesn't include data source ${source.name}`);
            // this.removeSourceData([source], ["links"]);
            const links = yield source.getLinks();
            this.addLinksFromJson(links, true);
        });
    }
    updateSourceData(sources) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addSourceData(sources);
        });
    }
    addSourceData(sources) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const s of sources) {
                yield s.load();
                yield this.updateDataFromSource(s);
            }
        });
    }
    createSourcesFromFiles(fs) {
        return __awaiter(this, void 0, void 0, function* () {
            let numProcessed = 0;
            const newSources = [];
            for (const f of fs) {
                if (f.name.endsWith(".csv")) {
                    const newSource = yield this.addCsvDataSourceFromFile(f);
                    newSources.push(newSource);
                    numProcessed++;
                }
                else {
                    throw new Error("Only CSV files supported at this time.");
                }
            }
            return newSources;
        });
    }
    addCsvDataSourceFromFile(f) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDataSource = new internal_1.CsvDataSource({
                name: f.name,
                filename: f.name,
                file: f,
                projects: [this],
            });
            yield newDataSource.load();
            this.dataSources.push(newDataSource);
            return newDataSource;
        });
    }
}
exports.Project = Project;
//# sourceMappingURL=Project.js.map