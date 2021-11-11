/**
 * Generic network data source containing nodes and/or links.
 */

import Airtable, { FieldSet, Record as AirtableRecord } from "airtable";
import { AirtableBase } from "airtable/lib/airtable_base";
import { Records } from "airtable/lib/records";
import csv from "csvtojson";
import AirtableMeta from "../../custom_modules/airtable-meta";

import {
  AirtableMetaBase,
  AirtableMetaTable,
} from "../../custom_modules/airtable-meta/types";
import { Project, Settings } from "../../internal/internal";
import {
  getNeighborhood,
  LinkType,
  NodeType,
  AppGraphData,
  GraphLink,
  GraphNode,
  NodeOrigin,
  NodeShape,
  TableConfig,
  TableMeta,
} from "../../helpers";

interface DataSourceProps {
  // name of data source, e.g., "Nodes.csv"
  name: string;

  // the projects associated with the data source
  projects: Project[];
}
export class DataSource {
  name: string;
  projects: Project[];
  nodes: GraphNode[];
  links: GraphLink[];
  graphConfig: TableConfig;
  records: Record<string, any>[];
  tableMeta: TableMeta[];

  constructor({ name, projects }: DataSourceProps) {
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

  hasNodeTypeOfName(name: string): boolean {
    return this.graphConfig.nodeTypes.map((nt) => nt.name).includes(name);
  }

  /**
   * Removes nodes and related links for the defined node type name from the
   * network map and the data system.
   * @param {string} name Name of node type
   */
  removeNodeTypeOfName(name: string): void {
    if (!this.hasNodeTypeOfName(name))
      throw new Error("No node type of name " + name);
    this.graphConfig.nodeTypes = this.graphConfig.nodeTypes.filter(
      (nt) => nt.name !== name
    );
    this.nodes = this.nodes.filter((n) => n._nodeType !== name);
    const linkTypesToDelete: string[] = this.graphConfig.linkTypes
      .filter((lt) => lt.source.name === name || lt.target.name === name)
      .map((lt) => lt.name);
    this.graphConfig.linkTypes = this.graphConfig.linkTypes.filter(
      (lt) => lt.source.name !== name && lt.target.name !== name
    );
    this.links = this.links.filter(
      (l) =>
        l._linkType === undefined || !linkTypesToDelete.includes(l._linkType)
    );
    this.projects.forEach((p) => p.updateDataFromSource(this));
  }

  /**
   * Removes links of the specified link type.
   * @param {LinkType} lt The link type to remove
   */
  removeLinkType(lt: LinkType): void {
    this.graphConfig.linkTypes = this.graphConfig.linkTypes.filter(
      (otherLt) => otherLt.name !== lt.name
    );
    this.links = this.links.filter((l) => l._linkType !== lt.name);
    this.projects.forEach((p) => p.updateDataFromSource(this));
  }

  /**
   * Interface method: return node list.
   */
  getNodes(): Promise<GraphNode[]> {
    throw new Error("Not implemented");
  }

  /**
   * Interface method: return link list.
   */
  getLinks(): Promise<GraphLink[]> {
    throw new Error("Not implemented");
  }

  /**
   * Abstract method: Is data ready to be ingested by network map?
   * @returns {boolean} True if data source is ready to be ingested,
   * false otherwise.
   */
  isReady(): boolean {
    return true;
  }

  /**
   * Function called when the link field is updated.
   */
  async onLinkConfigUpdate(): Promise<void> {
    throw new Error("Subclasses must implement");
  }

  /**
   * Function called when a node field is updated.
   */
  async onNodeConfigUpdate(): Promise<void> {
    throw new Error("Subclasses must implement");
  }

  /**
   * Dispatches event that tells app the data source config params changed
   */
  protected signalConfigChange() {
    if (typeof window !== "undefined") {
      const sourceEvent: CustomEvent = new CustomEvent(
        "dataSourceConfigChange",
        {
          detail: {
            dataSource: this,
          },
        }
      );
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
  async getFieldValues(
    baseId: string,
    table: string,
    field: string
  ): Promise<string[]> {
    throw new Error("Not implemented");
  }

  /**
   * Get records from the data source, i.e., rows.
   */
  async getRecords(...args: any[]): Promise<any> {
    throw new Error("Not implemented");
  }

  getInferredPossibleValuesFromField(fieldKey: string): string[] {
    return [
      ...new Set<string>(
        this.nodes.map((n: any) => {
          return n[fieldKey];
        })
        // .flat()
      ),
    ];
  }

  /**
   * Called when source added to project.
   */
  onAdd(): void {}

  /**
   * Called when source data are converted into nodes and links
   */
  async load(): Promise<void> {}

  dataIsNodes(): boolean {
    return this.records.length > 0 && this.records[0].id !== undefined;
  }
  dataIsLinks(): boolean {
    return (
      this.records.length > 0 &&
      this.records[0].source !== undefined &&
      this.records[0].target !== undefined
    );
  }
  dataIsTable(): boolean {
    return !this.dataIsLinks() && !this.dataIsNodes();
  }

  /**
   * Sets the fields on the node data object according to the current node
   * settings so that labels, colors, shapes, etc. appear as desired.
   * @param r The node data
   * @param nt The definitions (i.e., settings) for node fields
   */
  loadNodeFromRawRecord(r: Record<string, any>, nt: NodeType): GraphNode {
    const colorByField: string = nt.config.colorByField || "color";
    const colorByValue: string = r[colorByField];
    const nodeColor: string =
      nt.config.colorMap !== undefined &&
      nt.config.colorMap[colorByValue] !== undefined
        ? nt.config.colorMap[colorByValue]
        : colorByValue;
    const iconByField: string = nt.config.iconByField || "icon";
    const iconByValue: string = r[iconByField];
    const nodeIcon: string =
      nt.config.iconMap !== undefined &&
      nt.config.iconMap[iconByValue] !== undefined
        ? nt.config.iconMap[iconByValue]
        : iconByValue;

    return {
      ...r,

      // unique node id
      _id: r[nt.config.idFieldName],

      // assume color hex is defined in color field
      _color: nodeColor,

      _shape: NodeShape[nt.config.shape],

      // label
      _label: r[nt.config.labelByField || "label"],

      _nodeType: nt.name,
      _show: true,
      _showLabel: nt.config.showLabels,
      _labelPos: nt.config.labelPos,
      _fontSize: nt.config.fontSize,
      _icon: nodeIcon,
      _size: r[nt.config.sizeByField || "size"] || nt.config.size,
    };
  }

  /**
   * Returns links between the defined record and other records.
   * @param r The record
   * @param otherRs The other records, potentially linked to this one
   * @param lt The edge configuration
   * @returns {GraphLink[]} Links between `r` and `otherRs`
   */
  loadLinkFromRawRecord(
    r: Record<string, any>,
    otherRs: Record<string, any>[],
    lt: LinkType
  ): GraphLink[] {
    // get relationship field
    const uniqueIdField: string = lt.config.idFieldName;
    const relField: string = lt.config.targetField;
    const links: GraphLink[] = [];
    const relLinks: (string | number)[] | string = r[relField];
    otherRs
      .filter((otherR) => {
        if (relLinks === undefined) return false;
        else {
          const linkValueMatches: boolean =
            relLinks.includes(otherR[uniqueIdField]) ||
            relLinks === otherR[uniqueIdField];
          const linkDirectionMatches: boolean =
            r._nodeType === lt.source.name &&
            otherR._nodeType === lt.target.name;
          return linkDirectionMatches && linkValueMatches;
        }
      })
      .forEach((otherR) => {
        links.push({
          source: r[uniqueIdField],
          target: otherR[uniqueIdField],
          value: 1, // TODO dynamically
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
  createValueNodeRecord(
    name: string,
    id: string | number,
    table: TableMeta,
    nodeType: NodeType,
    otherFields: Record<string, any> = {}
  ): Record<string, any> {
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
  async initNewNodeType(
    nodeType: NodeType,
    newRecords: any[],
    nodeTypeTableMeta?: TableMeta
  ) {
    throw new Error("Not implemented, subclasses must implement");
  }
}

interface FileDataSourceProps extends DataSourceProps {
  filename: string;
  file: File;
}

export class FileDataSource extends DataSource {
  private filename: string;
  protected file: File;
  constructor({ name, filename, file, projects }: FileDataSourceProps) {
    super({ name, projects });
    this.filename = filename;
    this.file = file;
  }
}

abstract class Nodeable {
  nodeList: object[];
  nodeListCreated: boolean;
  constructor(nodeList: object[]) {
    this.nodeList = nodeList;
    this.nodeListCreated = false;
  }

  abstract getNodes(): Promise<GraphNode[]>;
}

abstract class Linkable {
  linkList: object[];
  linkListCreated: boolean;
  constructor(nodeList: object[]) {
    this.linkList = nodeList;
    this.linkListCreated = false;
  }

  abstract getLinks(): Promise<GraphLink[]>;
}

export class CsvDataSource
  extends FileDataSource
  implements Nodeable, Linkable
{
  nodeList: GraphNode[];
  nodeListCreated: boolean;
  linkList: object[];
  linkListCreated: boolean;

  constructor({ name, filename, file, projects }: FileDataSourceProps) {
    super({ name, filename, file, projects });
    this.nodeList = [];
    this.nodeListCreated = false;
    this.linkList = [];
    this.linkListCreated = false;
    this.records = [];
  }

  async load() {
    return this.readCsvAsJson();
  }

  private readCsvAsJson() {
    return new Promise<any>((resolve) => {
      const fr: FileReader = new FileReader();
      fr.onload = () => {
        if (fr.result !== null) {
          // convert to JSON
          csv()
            .fromString(fr.result as string)
            .then((out) => {
              this.records = out;
              resolve(this.records);
            });
        } else resolve([]);
      };
      fr.readAsText(this.file);
    });
  }

  async getNodes(): Promise<GraphNode[]> {
    return new Promise<any>((resolve) => {
      const fr: FileReader = new FileReader();

      fr.onload = (event: any) => {
        if (fr.result !== null) {
          // convert to JSON
          csv()
            .fromString(fr.result as string)
            .then((out: any) => {
              resolve(out);
            });
        } else resolve([]);
      };
      fr.readAsText(this.file);
    });
  }
}

interface DataSourceConfigProps {
  /**
   * The data fields that should be configurable for the data source if it is
   * selected in a configuration window.
   */
  fields: any[];
}
export class DataSourceConfig {
  fields: any;
  constructor({ fields }: DataSourceConfigProps) {
    this.fields = fields;
  }
}

/**
 * Use an Airtable base as a data source for nodes and edges.
 */
export class AirtableDataSource extends DataSource {
  apiKey: string;
  baseId: string;
  table: string;
  view: string;
  graphConfig: TableConfig;
  tableMeta: AirtableMetaTable[];
  baseMeta: AirtableMetaBase[];
  nodes: GraphNode[];
  links: GraphLink[];

  records: any[];

  /**
   * Creates new Airtable data source connection.
   * @param apiKey Airtable user's API key
   * @param name Name of data source
   * @param baseId Base ID in Airtable
   * @param table Table name in base
   * @param view View name in table
   */
  constructor(
    name: string,
    projects: Project[],
    apiKey: string | undefined = "",
    baseId: string = "",
    table: string = "",
    view: string = ""
  ) {
    super({
      name,
      projects,
    });

    // require API key in constructor argument or env var
    const initApiKey: string | undefined =
      process.env.REACT_APP_AIRTABLE_API_KEY !== undefined
        ? process.env.REACT_APP_AIRTABLE_API_KEY
        : apiKey;
    if (initApiKey === undefined)
      throw new Error("Please provide an Airtable API key.");

    this.apiKey = initApiKey || "";

    // get and use default base ID from env var if present
    const initBaseId: string | undefined =
      process.env.REACT_APP_DEFAULT_BASE_ID;
    if (baseId === "" && initBaseId !== undefined) this.baseId = initBaseId;
    else this.baseId = baseId;

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
  async getFieldValues(
    baseId: string,
    table: string,
    field: string
  ): Promise<string[]> {
    const at: Airtable = new Airtable({ apiKey: this.apiKey });
    const base: AirtableBase = at.base(baseId);
    // this.records = this.records.filter((r) => r._table.name !== this.table);
    const newRecords = await base(table)
      .select({ fields: [field] })
      // .select({ view: this.view, maxRecords: 500 })
      .all();
    return [
      ...new Set(newRecords.map((r) => r.get(field) as string).flat()),
    ].filter((v) => v !== undefined);
  }
  async getRecords(
    baseId: string,
    table: string,
    field?: string,
    recordIds: string[] = []
  ): Promise<Records<FieldSet>> {
    const at: Airtable = new Airtable({ apiKey: this.apiKey });
    const base: AirtableBase = at.base(baseId);
    const params =
      field !== undefined ? { fields: [field], filterByFormula: "" } : {};
    if (recordIds.length > 0) {
      params.filterByFormula = `OR(${recordIds
        .map((id) => `RECORD_ID()="${id}"`)
        .join(", ")})`;
    }
    // this.records = this.records.filter((r) => r._table.name !== this.table);
    const newRecords = await base(table).select(params).all();
    return newRecords;
  }

  /**
   * Loads all Airtable records from the view defined in instance variables.
   * @returns {Record[]} The records
   */
  async load(): Promise<void> {
    // remove node type if it already exists
    if (this.hasNodeTypeOfName(this.table))
      this.removeNodeTypeOfName(this.table);

    // connect to airtable and fetch data
    const at: Airtable = new Airtable({ apiKey: this.apiKey });
    const base: AirtableBase = at.base(this.baseId);
    this.records = this.records.filter((r) => r._table.name !== this.table);
    const newRecords = await base(this.table)
      .select({ view: this.view })
      // .select({ view: this.view, maxRecords: 500 })
      .all();

    const globalSettings: Settings = this.projects[0].globalSettings;
    const nodeType: NodeType = new NodeType(
      this.table,
      this,
      {
        idFieldName: "source_id",
        shape: NodeShape.circle,
        hideUnlinked: false,
        hideUnselected: true,
        showLabels: false,
        labelPos: globalSettings.nodes.labelPos,
        size: 1,
        fontSize: globalSettings.nodes.fontSize,
      },
      NodeOrigin.record
    );
    // add node type for the table
    await this.initNewNodeType(nodeType, newRecords);
    nodeType.tableMeta =
      this.tableMeta.find((tm) => tm.name === nodeType.name) ||
      nodeType.tableMeta;
    await this.loadNodes();
    await this.loadLinks();
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
  async initNewNodeType(
    nodeType: NodeType,
    newRecords: Records<FieldSet>,
    nodeTypeTableMeta?: TableMeta
  ) {
    this.graphConfig.nodeTypes.push(nodeType);
    nodeType.fieldTypes = {};
    const addNewRecord: Function = (r: AirtableRecord<any>): void => {
      nodeType.inferFieldTypesFromRecord(r);
      this.records.push({
        ...r,
        fields: { ...r.fields, source_id: r.id, _nodeType: nodeType.name },
      });
    };
    newRecords.forEach(addNewRecord.bind(this));

    // get all table metadata
    // TODO don't do this on each load
    const meta: AirtableMeta = new AirtableMeta({ apiKey: this.apiKey });
    this.tableMeta = await meta.getTablesOfBase(this.baseId);
    if (nodeTypeTableMeta !== undefined) nodeType.tableMeta = nodeTypeTableMeta;
    this.initIdAndLabelFields();
  }

  /**
   * Updates the select options for "TABLE" if API key and base ID are both
   * populated and one was changed.
   */
  async refetchTableMeta(): Promise<void> {
    this.tableMeta = await new AirtableMeta({
      apiKey: this.apiKey,
    }).getTablesOfBase(this.baseId);

    if (this.tableMeta !== undefined) this.signalConfigChange();
    else {
      const e: Error = new Error(
        `Could not access base with ID = ${this.baseId} and name "${
          this.baseMeta.find((bm) => bm.id === this.baseId)?.name
        }". If this base is not on a Pro plan, then it cannot be accessed` +
          ` in the Talus Network Suite.`
      );
      alert(e.message);
      throw e;
    }
  }
  async refetchBaseMeta(): Promise<void> {
    this.baseMeta = await new AirtableMeta({
      apiKey: this.apiKey,
    }).getBases();

    if (this.baseMeta !== undefined) this.signalConfigChange();
  }

  /**
   * Load nodes from data source's raw data, either for the first time or
   * because it needs to be refreshed.
   */
  private async loadNodes(): Promise<void> {
    this.nodes = [];
    this.graphConfig.nodeTypes.forEach((nt) => {
      this.records
        .filter((r) => r._table.name === nt.name)
        .forEach((r) => {
          const node: GraphNode = this.loadNodeFromRawRecord(r.fields, nt);
          this.nodes.push(node);
        });
    });
  }

  /**
   * Load links from data source's raw data, either for the first time or
   * because it needs to be refreshed.
   */
  private async loadLinks(): Promise<void> {
    this.links = [];
    this.graphConfig.linkTypes.forEach((lt) => {
      this.links = this.links.concat(
        this.records
          .map((r) =>
            this.loadLinkFromRawRecord(
              r.fields,
              this.records.map((r) => r.fields),
              lt
            )
          )
          .flat()
      );
    });
    this.hideLinks();
  }

  /**
   * Hide links that should be hidden, if any
   * @returns
   */
  private hideLinks(): void {
    this.nodes.forEach((n) => (n._show = true));
    // hide unselected nodes if that setting is enabled

    // hide unlinked nodes if that setting is enabled
    this.hideUnlinkedNodes();
    this.hideUnselected(
      this.projects[0].globalSettings.nodes.allowedNeighborDepth
    );
  }

  /**
   * Hide unlinked nodes, if needed
   */
  private hideUnlinkedNodes(): void {
    // TODO refactor method
    if (!this.graphConfig.nodeTypes.some((nt) => nt.config.hideUnlinked))
      return;
    if (this.links === undefined || this.links.length === 0) {
      this.nodes.forEach((n) => (n._show = false));
      return;
    }
    const isStruct: boolean =
      (this.links[0].source as GraphNode)._id !== undefined;
    const linkedNodeIds: (string | number)[] = isStruct
      ? [
          ...new Set(
            this.links
              .map((n) => [
                (n.source as GraphNode)._id,
                (n.target as GraphNode)._id,
              ])
              .flat()
          ),
        ]
      : [
          ...new Set(
            this.links
              .map((n) => [n.source as string, n.target as string])
              .flat()
          ),
        ];

    this.graphConfig.nodeTypes.forEach((nt) => {
      if (!nt.config.hideUnlinked) return;
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
  private hideUnselected(allowedNeighborDepth: number = 1): void {
    // TODO refactor method
    const noSelectedNodes: boolean = this.projects[0].selectedNode === null;
    const alwaysShowUnselected: boolean = !this.graphConfig.nodeTypes.some(
      (nt) => nt.config.hideUnselected
    );
    const showEverything: boolean = alwaysShowUnselected || noSelectedNodes;
    if (showEverything) {
      this.links.forEach((l) => (l.color = "lightgray"));
      return;
    }
    this.links.forEach((l) => (l.color = "transparent"));

    // cannot find selected node?
    const selectedNode = this.nodes.find(
      (n) => n._id === this.projects[0].selectedNode
    );
    if (selectedNode === undefined) return;
    // if (
    //   allowedNeighborDepth === 0 ||
    //   this.links === undefined ||
    //   this.links.length === 0
    // ) {
    //   this.nodes.forEach((n) => (n._show = false));
    //   selectedNode._show = true;
    //   return;
    // }
    const visibleGraphData: AppGraphData = getNeighborhood(
      selectedNode,
      { nodes: this.nodes, links: this.links },
      allowedNeighborDepth
    );
    this.nodes = visibleGraphData.nodes;
    this.links = visibleGraphData.links;
    this.links.forEach((l) => (l.color = "lightgray"));
  }

  async onLinkConfigUpdate(): Promise<void> {
    await this.loadLinks();
    this.signalConfigChange();
  }

  async onNodeConfigUpdate(): Promise<void> {
    await this.loadNodes();
    await this.loadLinks();
    this.signalConfigChange();
  }

  /**
   * Get the node list
   * @returns {GraphNode[]} Node list
   */
  async getNodes(): Promise<GraphNode[]> {
    return this.nodes;
  }

  /**
   * Get the link list
   * @returns {GraphNode[]} link list
   */
  async getLinks(): Promise<GraphLink[]> {
    return this.links;
  }

  /**
   * Called when source added to projects
   */
  onAdd(): void {
    this.signalConfigChange();
  }

  /**
   * @returns {boolean} True if enough config info has been set to connect to
   * Airtable, false otherwise.
   */
  isReady(): boolean {
    return this.view !== "";
  }

  /**
   * Infer the values of the ID and label fields, which may be overridden.
   */
  private initIdAndLabelFields(): void {
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
  createValueNodeRecord(
    name: string,
    id: string | number,
    table: TableMeta,
    nodeType: NodeType,
    otherFields: Record<string, any> = {}
  ): Record<string, any> {
    return {
      id: id,
      fields: {
        ...otherFields,
        name,
        source_id: name,
        _nodeType: nodeType.name,
      },
      _table: table,
    };
  }
}
