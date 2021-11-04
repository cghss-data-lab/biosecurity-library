import { defaultSettings, initNode, LabelPosOptions } from "../internal";
export enum NodeShape {
  circle,
  square,
  triangle,
}
export enum NodeOrigin {
  record,
  field,
}

/**
 * Possible link direction(s)
 */
export enum LinkDirections {
  source,
  target,
  both,
  either,
}

export type NodeConfig = {
  // the name of the column in the data source from which nodes should
  // be generated
  idFieldName: string;

  // the field determining node label, if any
  labelByField?: string;

  // the field determining node color, if any
  colorByField?: string;

  // the field determining node color, if any
  sizeByField?: string;

  // the field determining node color, if any
  shapeByField?: string;

  // the field determining node icon image, if any
  iconByField?: string;

  // the shape of nodes of this type
  shape: NodeShape;

  // mapping from values to colors
  colorMap?: Record<string, string>;

  // mapping from values to images for icons
  iconMap?: Record<string, string>;

  hideUnlinked: boolean;
  hideUnselected: boolean;
  showLabels: boolean;
  labelPos: LabelPosOptions;
  fontSize: number;
  size: number;
};

export const defaultNodeDef: NodeConfig = {
  idFieldName: "id",
  labelByField: "label",
  colorByField: "color",
  iconByField: "icon",
  shape: NodeShape.circle,
  hideUnlinked: false,
  hideUnselected: true,
  showLabels: defaultSettings.nodes.showNodeLabels,
  labelPos: defaultSettings.nodes.labelPos,
  fontSize: defaultSettings.nodes.fontSize,
  size: 1,
};

export interface LinkConfig {
  // node unique ID column (should match what is defined in NodeConfig)
  idFieldName: string;
  sourceField: string;
  targetField: string;
  color?: string;
}

export type AppGraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

/**
 * Empty graph data structure.
 */
export const emptyGraphData: AppGraphData = {
  nodes: [],
  links: [],
};

/**
 * Simple set of nodes and links for demonstration purposes.
 */
export const demoGraphData: AppGraphData = {
  nodes: [
    initNode("Node 1", 1, "square"),
    initNode("Node 2", 2),
    initNode("Node 3", 3),
    initNode("Node 4", 4),
    initNode("Node 5", 5),
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
// export const demoGraphData: AppGraphData = {
//   nodes: [initNode("Citing document", 1), initNode("Cited document", 2)],
//   links: [{ source: 1, target: 2, value: 1 }],
// };

export type GraphNode = {
  _id: string | number;
  _label?: string;
  _labelColor?: string;
  _labelFont?: string;
  _labelFontWeight?: string;
  _labelYOffset?: number;
  _backgroundColor?: string;
  _backgroundSize?: number;
  _backgroundShape?: "circle" | "hexagon";
  _color?: string;
  _shape?: string;
  _nodeType?: string;
  _show?: boolean;
  _showLabel?: boolean;
  _labelPos?: LabelPosOptions;
  _fontSize?: number;
  _icon?: string;
  _size?: number;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
};

export type GraphLink = {
  source: GraphNode["_id"] | GraphNode;
  target: GraphNode["_id"] | GraphNode;
  value?: number;
  color?: string;
  _linkType?: string;
};
