"use strict";
/**
 * Generic network data source containing nodes and/or links.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirtableDataSource = exports.DataSourceConfig = exports.CsvDataSource = exports.FileDataSource = exports.DataSource = void 0;
const airtable_1 = __importDefault(require("airtable"));
const csvtojson_1 = __importDefault(require("csvtojson"));
const airtable_meta_1 = __importDefault(require("../../custom_modules/airtable-meta"));
const internal_1 = require("../../internal");
class DataSource {
    constructor({ name, projects }) {
        this.name = name;
        this.projects = projects;
        this.nodes = [];
        this.links = [];
        this.graphConfig = {
            nodeTypes: [],
            linkTypes: [],
        };
        this.tableMeta = [];
        this.records = [];
    }
    /**
     * Given a list of graph links, returns the node IDs for all sources and
     * targets of those links as a unique list.
     * @param links The links
     * @returns The list of IDs
     */
    getNodeIdsForLinks(links) {
        // TODO Refactor method
        if (links.length === 0)
            return [];
        const isStruct = links[0].source._id !== undefined;
        return isStruct
            ? [
                ...new Set(links
                    .map((n) => [
                    n.source._id,
                    n.target._id,
                ])
                    .flat()),
            ]
            : [
                ...new Set(links.map((n) => [n.source, n.target]).flat()),
            ];
    }
    /**
     * Returns the graph links that have a source and target with one of the
     * provided node IDs
     * @param ids The node ID(s)
     * @param linkDir The direction(s) for which the link must have an ID match.
     * Defaults to either.
     * @returns The links
     */
    getLinksForNodesWithIds(ids, links, linkDir = internal_1.LinkDirections.either) {
        // TODO Refactor method
        if (links.length === 0)
            return [];
        const isStruct = links[0].source._id !== undefined;
        const getHasId = isStruct
            ? (l, field) => ids.includes(l[field]._id)
            : (l, field) => ids.includes(l[field]);
        return links.filter((l) => {
            const sourceHasId = getHasId(l, "source");
            const targetHasId = getHasId(l, "target");
            if (linkDir === internal_1.LinkDirections.both)
                return sourceHasId && targetHasId;
            if (linkDir === internal_1.LinkDirections.either)
                return sourceHasId || targetHasId;
            if (linkDir === internal_1.LinkDirections.source)
                return sourceHasId;
            if (linkDir === internal_1.LinkDirections.target)
                return targetHasId;
            return false;
        });
    }
    /**
     * Returns the node's neighbors to the specified degree, including all links
     * @param node The node
     * @param allowedNeighborDepth The maximum degree of neighbor to include,
     * defaults to 1
     * @returns The graph data for the node's neighborhood
     */
    getNeighborhood(node, graphData, allowedNeighborDepth = 1, tableConfig) {
        if (allowedNeighborDepth === 0)
            return {
                nodes: [node],
                links: this.getLinksForNodesWithIds([node._id], graphData.links, internal_1.LinkDirections.both),
            };
        let shownLinks = [];
        let checkedNodesIds = [node._id];
        let neighborLevel = 0;
        let primaryNodesIds = [node._id];
        while (neighborLevel < allowedNeighborDepth) {
            // Get all links for the current primary set and
            // add them to the set of visible links
            const allPrimaryLinks = this.getLinksForNodesWithIds(primaryNodesIds, graphData.links, internal_1.LinkDirections.either);
            shownLinks = shownLinks.concat(allPrimaryLinks);
            // get node IDs from primary links that aren't already in the visible
            // node set and add them
            // N/A
            // set the current primary set equal to all nodes in shown links that
            // were not already in the checked nodes list
            const secondaryNodesIds = this.getNodeIdsForLinks(shownLinks).filter(
            // eslint-disable-next-line no-loop-func
            (nId) => !primaryNodesIds.includes(nId) && !checkedNodesIds.includes(nId));
            const allSecondaryLinks = this.getLinksForNodesWithIds(secondaryNodesIds, graphData.links, internal_1.LinkDirections.both);
            shownLinks = shownLinks.concat(allSecondaryLinks);
            // update the checked nodes list
            checkedNodesIds = [
                ...new Set([
                    ...primaryNodesIds,
                    ...secondaryNodesIds,
                    ...checkedNodesIds,
                ]),
            ];
            primaryNodesIds = secondaryNodesIds;
            neighborLevel += 1;
        }
        shownLinks.forEach((l) => (l.color = undefined));
        const ignoreNodeType = tableConfig === undefined || tableConfig.nodeTypes.length === 0;
        let shownNodes = graphData.nodes;
        if (!ignoreNodeType)
            tableConfig === null || tableConfig === void 0 ? void 0 : tableConfig.nodeTypes.forEach((nt) => {
                if (!nt.config.hideUnselected)
                    return;
                graphData.nodes.forEach((n) => {
                    if (n._nodeType !== nt.name)
                        return;
                    n._show = checkedNodesIds.includes(n._id);
                });
                shownNodes = graphData.nodes.filter((n) => {
                    return n._nodeType !== nt.name || n._show;
                });
            });
        else {
            graphData.nodes.forEach((n) => {
                n._show = checkedNodesIds.includes(n._id);
            });
            shownNodes = graphData.nodes.filter((n) => {
                return n._show;
            });
        }
        return { nodes: shownNodes, links: shownLinks };
    }
    hasNodeTypeOfName(name) {
        return this.graphConfig.nodeTypes.map((nt) => nt.name).includes(name);
    }
    /**
     * Removes nodes and related links for the defined node type name from the
     * network map and the data system.
     * @param {string} name Name of node type
     */
    removeNodeTypeOfName(name) {
        if (!this.hasNodeTypeOfName(name))
            throw new Error("No node type of name " + name);
        this.graphConfig.nodeTypes = this.graphConfig.nodeTypes.filter((nt) => nt.name !== name);
        this.nodes = this.nodes.filter((n) => n._nodeType !== name);
        const linkTypesToDelete = this.graphConfig.linkTypes
            .filter((lt) => lt.source.name === name || lt.target.name === name)
            .map((lt) => lt.name);
        this.graphConfig.linkTypes = this.graphConfig.linkTypes.filter((lt) => lt.source.name !== name && lt.target.name !== name);
        this.links = this.links.filter((l) => l._linkType === undefined || !linkTypesToDelete.includes(l._linkType));
        this.projects.forEach((p) => p.updateDataFromSource(this));
    }
    /**
     * Removes links of the specified link type.
     * @param {LinkType} lt The link type to remove
     */
    removeLinkType(lt) {
        this.graphConfig.linkTypes = this.graphConfig.linkTypes.filter((otherLt) => otherLt.name !== lt.name);
        this.links = this.links.filter((l) => l._linkType !== lt.name);
        this.projects.forEach((p) => p.updateDataFromSource(this));
    }
    /**
     * Interface method: return node list.
     */
    getNodes() {
        throw new Error("Not implemented");
    }
    /**
     * Interface method: return link list.
     */
    getLinks() {
        throw new Error("Not implemented");
    }
    /**
     * Abstract method: Is data ready to be ingested by network map?
     * @returns {boolean} True if data source is ready to be ingested,
     * false otherwise.
     */
    isReady() {
        return true;
    }
    /**
     * Function called when the link field is updated.
     */
    onLinkConfigUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Subclasses must implement");
        });
    }
    /**
     * Function called when a node field is updated.
     */
    onNodeConfigUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Subclasses must implement");
        });
    }
    /**
     * Dispatches event that tells app the data source config params changed
     */
    signalConfigChange() {
        if (typeof window !== "undefined") {
            const sourceEvent = new CustomEvent("dataSourceConfigChange", {
                detail: {
                    dataSource: this,
                },
            });
            // sourceEvent.dataSource =
            window.dispatchEvent(sourceEvent);
        }
    }
    /**
     * Returns the values of the field in the table specified.
     * @param baseId
     * @param table
     * @param field
     */
    getFieldValues(baseId, table, field) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented");
        });
    }
    /**
     * Get records from the data source, i.e., rows.
     */
    getRecords(...args) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented");
        });
    }
    getInferredPossibleValuesFromField(fieldKey) {
        return [
            ...new Set(this.nodes.map((n) => {
                return n[fieldKey];
            })
            // .flat()
            ),
        ];
    }
    /**
     * Called when source added to project.
     */
    onAdd() { }
    /**
     * Called when source data are converted into nodes and links
     */
    load() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    dataIsNodes() {
        return this.records.length > 0 && this.records[0].id !== undefined;
    }
    dataIsLinks() {
        return (this.records.length > 0 &&
            this.records[0].source !== undefined &&
            this.records[0].target !== undefined);
    }
    dataIsTable() {
        return !this.dataIsLinks() && !this.dataIsNodes();
    }
    /**
     * Sets the fields on the node data object according to the current node
     * settings so that labels, colors, shapes, etc. appear as desired.
     * @param r The node data
     * @param nt The definitions (i.e., settings) for node fields
     */
    loadNodeFromRawRecord(r, nt) {
        const colorByField = nt.config.colorByField || "color";
        const colorByValue = r[colorByField];
        const nodeColor = nt.config.colorMap !== undefined &&
            nt.config.colorMap[colorByValue] !== undefined
            ? nt.config.colorMap[colorByValue]
            : colorByValue;
        const iconByField = nt.config.iconByField || "icon";
        const iconByValue = r[iconByField];
        const nodeIcon = nt.config.iconMap !== undefined &&
            nt.config.iconMap[iconByValue] !== undefined
            ? nt.config.iconMap[iconByValue]
            : iconByValue;
        return Object.assign(Object.assign({}, r), { 
            // unique node id
            _id: r[nt.config.idFieldName], 
            // assume color hex is defined in color field
            _color: nodeColor, _shape: internal_1.NodeShape[nt.config.shape], 
            // label
            _label: r[nt.config.labelByField || "label"], _nodeType: nt.name, _show: true, _showLabel: nt.config.showLabels, _labelPos: nt.config.labelPos, _fontSize: nt.config.fontSize, _icon: nodeIcon, _size: r[nt.config.sizeByField || "size"] || nt.config.size });
    }
    /**
     * Returns links between the defined record and other records.
     * @param r The record
     * @param otherRs The other records, potentially linked to this one
     * @param lt The edge configuration
     * @returns {GraphLink[]} Links between `r` and `otherRs`
     */
    loadLinkFromRawRecord(r, otherRs, lt) {
        // get relationship field
        const uniqueIdField = lt.config.idFieldName;
        const relField = lt.config.targetField;
        const links = [];
        const relLinks = r[relField];
        otherRs
            .filter((otherR) => {
            if (relLinks === undefined)
                return false;
            else {
                const linkValueMatches = relLinks.includes(otherR[uniqueIdField]) ||
                    relLinks === otherR[uniqueIdField];
                const linkDirectionMatches = r._nodeType === lt.source.name &&
                    otherR._nodeType === lt.target.name;
                return linkDirectionMatches && linkValueMatches;
            }
        })
            .forEach((otherR) => {
            links.push({
                source: r[uniqueIdField],
                target: otherR[uniqueIdField],
                value: 1,
                color: lt.config.color,
                _linkType: lt.name,
            });
        });
        return links;
    }
    /**
     * Creates a record representing an implicit node (derived from an optionset)
     * @param name The name of the node
     * @param table The metadata for the table
     */
    createValueNodeRecord(name, id, table, nodeType, otherFields = {}) {
        throw new Error("Method not implemented.");
    }
    /**
     * Adds new node type to the data system.
     *
     * Adds the node type to the list of node types, and initializes nodes for
     * the node type in the the network map.
     *
     * @param {NodeType} nodeType
     * The node type
     *
     * @param {any[]} newRecords
     * The new records to be added for the node type
     */
    initNewNodeType(nodeType, newRecords, nodeTypeTableMeta) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Not implemented, subclasses must implement");
        });
    }
}
exports.DataSource = DataSource;
class FileDataSource extends DataSource {
    constructor({ name, filename, file, projects }) {
        super({ name, projects });
        this.filename = filename;
        this.file = file;
    }
}
exports.FileDataSource = FileDataSource;
class Nodeable {
    constructor(nodeList) {
        this.nodeList = nodeList;
        this.nodeListCreated = false;
    }
}
class Linkable {
    constructor(nodeList) {
        this.linkList = nodeList;
        this.linkListCreated = false;
    }
}
class CsvDataSource extends FileDataSource {
    constructor({ name, filename, file, projects }) {
        super({ name, filename, file, projects });
        this.nodeList = [];
        this.nodeListCreated = false;
        this.linkList = [];
        this.linkListCreated = false;
        this.records = [];
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.readCsvAsJson();
        });
    }
    readCsvAsJson() {
        return new Promise((resolve) => {
            const fr = new FileReader();
            fr.onload = () => {
                if (fr.result !== null) {
                    // convert to JSON
                    (0, csvtojson_1.default)()
                        .fromString(fr.result)
                        .then((out) => {
                        this.records = out;
                        resolve(this.records);
                    });
                }
                else
                    resolve([]);
            };
            fr.readAsText(this.file);
        });
    }
    getNodes() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                const fr = new FileReader();
                fr.onload = (event) => {
                    if (fr.result !== null) {
                        // convert to JSON
                        (0, csvtojson_1.default)()
                            .fromString(fr.result)
                            .then((out) => {
                            resolve(out);
                        });
                    }
                    else
                        resolve([]);
                };
                fr.readAsText(this.file);
            });
        });
    }
}
exports.CsvDataSource = CsvDataSource;
class DataSourceConfig {
    constructor({ fields }) {
        this.fields = fields;
    }
}
exports.DataSourceConfig = DataSourceConfig;
/**
 * Use an Airtable base as a data source for nodes and edges.
 */
class AirtableDataSource extends DataSource {
    /**
     * Creates new Airtable data source connection.
     * @param apiKey Airtable user's API key
     * @param name Name of data source
     * @param baseId Base ID in Airtable
     * @param table Table name in base
     * @param view View name in table
     */
    constructor(name, projects, apiKey = "", baseId = "", table = "", view = "") {
        super({
            name,
            projects,
        });
        // require API key in constructor argument or env var
        const initApiKey = process.env.REACT_APP_AIRTABLE_API_KEY !== undefined
            ? process.env.REACT_APP_AIRTABLE_API_KEY
            : apiKey;
        if (initApiKey === undefined)
            throw new Error("Please provide an Airtable API key.");
        this.apiKey = initApiKey || "";
        // get and use default base ID from env var if present
        const initBaseId = process.env.REACT_APP_DEFAULT_BASE_ID;
        if (baseId === "" && initBaseId !== undefined)
            this.baseId = initBaseId;
        else
            this.baseId = baseId;
        this.table = table;
        this.view = view;
        this.records = [];
        this.tableMeta = [];
        this.baseMeta = [];
        this.nodes = [];
        this.links = [];
        // TODO initialize dynamically
        this.graphConfig = {
            nodeTypes: [],
            linkTypes: [],
        };
    }
    /**
     * Returns the values of the field in the table specified.
     * @param baseId
     * @param table
     * @param field
     */
    getFieldValues(baseId, table, field) {
        return __awaiter(this, void 0, void 0, function* () {
            const at = new airtable_1.default({ apiKey: this.apiKey });
            const base = at.base(baseId);
            // this.records = this.records.filter((r) => r._table.name !== this.table);
            const newRecords = yield base(table)
                .select({ fields: [field] })
                // .select({ view: this.view, maxRecords: 500 })
                .all();
            return [
                ...new Set(newRecords.map((r) => r.get(field)).flat()),
            ].filter((v) => v !== undefined);
        });
    }
    getRecords(baseId, table, field, recordIds = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const at = new airtable_1.default({ apiKey: this.apiKey });
            const base = at.base(baseId);
            const params = field !== undefined ? { fields: [field], filterByFormula: "" } : {};
            if (recordIds.length > 0) {
                params.filterByFormula = `OR(${recordIds
                    .map((id) => `RECORD_ID()="${id}"`)
                    .join(", ")})`;
            }
            // this.records = this.records.filter((r) => r._table.name !== this.table);
            const newRecords = yield base(table).select(params).all();
            return newRecords;
        });
    }
    /**
     * Loads all Airtable records from the view defined in instance variables.
     * @returns {Record[]} The records
     */
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            // remove node type if it already exists
            if (this.hasNodeTypeOfName(this.table))
                this.removeNodeTypeOfName(this.table);
            // connect to airtable and fetch data
            const at = new airtable_1.default({ apiKey: this.apiKey });
            const base = at.base(this.baseId);
            this.records = this.records.filter((r) => r._table.name !== this.table);
            const newRecords = yield base(this.table)
                .select({ view: this.view })
                // .select({ view: this.view, maxRecords: 500 })
                .all();
            const globalSettings = this.projects[0].globalSettings;
            const nodeType = new internal_1.NodeType(this.table, this, {
                idFieldName: "source_id",
                shape: internal_1.NodeShape.circle,
                hideUnlinked: false,
                hideUnselected: true,
                showLabels: false,
                labelPos: globalSettings.nodes.labelPos,
                size: 1,
                fontSize: globalSettings.nodes.fontSize,
            }, internal_1.NodeOrigin.record);
            // add node type for the table
            yield this.initNewNodeType(nodeType, newRecords);
            nodeType.tableMeta =
                this.tableMeta.find((tm) => tm.name === nodeType.name) ||
                    nodeType.tableMeta;
            yield this.loadNodes();
            yield this.loadLinks();
        });
    }
    /**
     * Adds new node type to the data system.
     *
     * Adds the node type to the list of node types, and initializes nodes for
     * the node type in the the network map.
     *
     * @param {NodeType} nodeType
     * The node type
     *
     * @param {Records<FieldSet> | any[]} newRecords
     * The new records to be added for the node type
     */
    initNewNodeType(nodeType, newRecords, nodeTypeTableMeta) {
        return __awaiter(this, void 0, void 0, function* () {
            this.graphConfig.nodeTypes.push(nodeType);
            nodeType.fieldTypes = {};
            const addNewRecord = (r) => {
                nodeType.inferFieldTypesFromRecord(r);
                this.records.push(Object.assign(Object.assign({}, r), { fields: Object.assign(Object.assign({}, r.fields), { source_id: r.id, _nodeType: nodeType.name }) }));
            };
            newRecords.forEach(addNewRecord.bind(this));
            // get all table metadata
            // TODO don't do this on each load
            const meta = new airtable_meta_1.default({ apiKey: this.apiKey });
            this.tableMeta = yield meta.getTablesOfBase(this.baseId);
            if (nodeTypeTableMeta !== undefined)
                nodeType.tableMeta = nodeTypeTableMeta;
            this.initIdAndLabelFields();
        });
    }
    /**
     * Updates the select options for "TABLE" if API key and base ID are both
     * populated and one was changed.
     */
    refetchTableMeta() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.tableMeta = yield new airtable_meta_1.default({
                apiKey: this.apiKey,
            }).getTablesOfBase(this.baseId);
            if (this.tableMeta !== undefined)
                this.signalConfigChange();
            else {
                const e = new Error(`Could not access base with ID = ${this.baseId} and name "${(_a = this.baseMeta.find((bm) => bm.id === this.baseId)) === null || _a === void 0 ? void 0 : _a.name}". If this base is not on a Pro plan, then it cannot be accessed` +
                    ` in the Talus Network Suite.`);
                alert(e.message);
                throw e;
            }
        });
    }
    refetchBaseMeta() {
        return __awaiter(this, void 0, void 0, function* () {
            this.baseMeta = yield new airtable_meta_1.default({
                apiKey: this.apiKey,
            }).getBases();
            if (this.baseMeta !== undefined)
                this.signalConfigChange();
        });
    }
    /**
     * Load nodes from data source's raw data, either for the first time or
     * because it needs to be refreshed.
     */
    loadNodes() {
        return __awaiter(this, void 0, void 0, function* () {
            this.nodes = [];
            this.graphConfig.nodeTypes.forEach((nt) => {
                this.records
                    .filter((r) => r._table.name === nt.name)
                    .forEach((r) => {
                    const node = this.loadNodeFromRawRecord(r.fields, nt);
                    this.nodes.push(node);
                });
            });
        });
    }
    /**
     * Load links from data source's raw data, either for the first time or
     * because it needs to be refreshed.
     */
    loadLinks() {
        return __awaiter(this, void 0, void 0, function* () {
            this.links = [];
            this.graphConfig.linkTypes.forEach((lt) => {
                this.links = this.links.concat(this.records
                    .map((r) => this.loadLinkFromRawRecord(r.fields, this.records.map((r) => r.fields), lt))
                    .flat());
            });
            this.hideLinks();
        });
    }
    /**
     * Hide links that should be hidden, if any
     * @returns
     */
    hideLinks() {
        this.nodes.forEach((n) => (n._show = true));
        // hide unselected nodes if that setting is enabled
        // hide unlinked nodes if that setting is enabled
        this.hideUnlinkedNodes();
        this.hideUnselected(this.projects[0].globalSettings.nodes.allowedNeighborDepth);
    }
    /**
     * Hide unlinked nodes, if needed
     */
    hideUnlinkedNodes() {
        // TODO refactor method
        if (!this.graphConfig.nodeTypes.some((nt) => nt.config.hideUnlinked))
            return;
        if (this.links === undefined || this.links.length === 0) {
            this.nodes.forEach((n) => (n._show = false));
            return;
        }
        const isStruct = this.links[0].source._id !== undefined;
        const linkedNodeIds = isStruct
            ? [
                ...new Set(this.links
                    .map((n) => [
                    n.source._id,
                    n.target._id,
                ])
                    .flat()),
            ]
            : [
                ...new Set(this.links
                    .map((n) => [n.source, n.target])
                    .flat()),
            ];
        this.graphConfig.nodeTypes.forEach((nt) => {
            if (!nt.config.hideUnlinked)
                return;
            this.nodes.forEach((n) => {
                n._show = n._nodeType !== nt.name || linkedNodeIds.includes(n._id);
            });
            // this.nodes = this.nodes.filter((n) => {
            //   return n._nodeType !== nt.name || n._show;
            // });
        });
    }
    /**
     * Hide unselected nodes, if a node has been selected and this option
     * is enabled.
     * @param {number} allowedNeighborDepth The number of degrees of which to
     * display neighboring nodes. Defaults to 1.
     */
    hideUnselected(allowedNeighborDepth = 1) {
        // TODO refactor method
        const noSelectedNodes = this.projects[0].selectedNode === null;
        const alwaysShowUnselected = !this.graphConfig.nodeTypes.some((nt) => nt.config.hideUnselected);
        const showEverything = alwaysShowUnselected || noSelectedNodes;
        if (showEverything) {
            this.links.forEach((l) => (l.color = "lightgray"));
            return;
        }
        this.links.forEach((l) => (l.color = "transparent"));
        // cannot find selected node?
        const selectedNode = this.nodes.find((n) => n._id === this.projects[0].selectedNode);
        if (selectedNode === undefined)
            return;
        // if (
        //   allowedNeighborDepth === 0 ||
        //   this.links === undefined ||
        //   this.links.length === 0
        // ) {
        //   this.nodes.forEach((n) => (n._show = false));
        //   selectedNode._show = true;
        //   return;
        // }
        const visibleGraphData = this.getNeighborhood(selectedNode, { nodes: this.nodes, links: this.links }, allowedNeighborDepth);
        this.nodes = visibleGraphData.nodes;
        this.links = visibleGraphData.links;
        this.links.forEach((l) => (l.color = "lightgray"));
    }
    onLinkConfigUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadLinks();
            this.signalConfigChange();
        });
    }
    onNodeConfigUpdate() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadNodes();
            yield this.loadLinks();
            this.signalConfigChange();
        });
    }
    /**
     * Get the node list
     * @returns {GraphNode[]} Node list
     */
    getNodes() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.nodes;
        });
    }
    /**
     * Get the link list
     * @returns {GraphNode[]} link list
     */
    getLinks() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.links;
        });
    }
    /**
     * Called when source added to projects
     */
    onAdd() {
        this.signalConfigChange();
    }
    /**
     * @returns {boolean} True if enough config info has been set to connect to
     * Airtable, false otherwise.
     */
    isReady() {
        return this.view !== "";
    }
    /**
     * Infer the values of the ID and label fields, which may be overridden.
     */
    initIdAndLabelFields() {
        this.graphConfig.nodeTypes.forEach((nt) => {
            nt.config.idFieldName = "source_id";
            nt.config.labelByField = nt.getInferredLabelFieldFromFieldTypes();
        });
    }
    /**
     * Creates a record representing an implicit node (derived from an optionset)
     * @param name The name of the node
     * @param table The metadata for the table
     */
    createValueNodeRecord(name, id, table, nodeType, otherFields = {}) {
        return {
            id: id,
            fields: Object.assign(Object.assign({}, otherFields), { name, source_id: name, _nodeType: nodeType.name }),
            _table: table,
        };
    }
}
exports.AirtableDataSource = AirtableDataSource;
//# sourceMappingURL=DataSource.js.map