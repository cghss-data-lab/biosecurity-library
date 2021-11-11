import { Dispatch, SetStateAction } from "react";
import { LinkType } from "./classes/LinkType";
import { NodeType } from "./classes/NodeType";

/**
 * React useState hook setter
 */
export type SetState<T> = Dispatch<SetStateAction<T>>;
export interface TableConfig {
  nodeTypes: NodeType[];
  linkTypes: LinkType[];
}

export const labelPosOptionNames = ["center", "bottom"] as const;

export type LabelPosOptions = typeof labelPosOptionNames[number];

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

export type AppGraphData = {
  nodes: GraphNode[];
  links: GraphLink[];
};

export interface LinkConfig {
  // node unique ID column (should match what is defined in NodeConfig)
  idFieldName: string;
  sourceField: string;
  targetField: string;
  color?: string;
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
 * Types for DataSource class
 */
import React from "react";

/**
 * Whether the data source is a node list, edge list, or a table of data.
 */
export type DataSourceType = "nodes" | "edges" | "table";

export interface TableMeta {
  id: string;
  name: string;
  fields: TableFieldsMeta[];
}

export interface TableFieldsMeta {
  id: string;
  name: string;
  type: string;
  options?: TableFieldOptionsMeta;
}

interface TableFieldOptionsMeta {
  linkedTableId?: string;
  choices?: TableFieldOptionChoiceMeta[];
}

interface TableFieldOptionChoiceMeta {
  id: string;
  name: string;
  color: string;
}

/**
 * Valid keys for config fields
 */
export type ConfigFieldKey = "apiKey" | "baseId" | "table" | "view";

/**
 * Possible data types for columns, chiefly from Airtable or similar.
 */
export type FieldDataType =
  | "button"
  | "integer"
  | "decimal"
  | "select"
  | "multiselect"
  | "select_record"
  | "multiselect_record"
  | "object"
  | "text"
  | "secure"
  | "boolean"
  | "uuid";

export type Option = {
  label: string;
  value: any;
};

/**
 * Types of columns
 */
export type Field = {
  /**
   * The name of the column or field, e.g., "Resource name"
   */
  name: string;

  /**
   * True if the field is required, false otherwise. Default assumption: false
   */
  required?: boolean;

  /**
   * True if the field is disabled, false otherwise. Default assumption: false
   */
  disabled?: boolean;

  /**
   * The data type of the column
   */
  dataType: FieldDataType;

  /**
   * The current value of the field
   */
  value: any;

  /**
   * If applicable: the possible values.
   */
  possibleValues?: Option[];

  /**
   * Callback for onChange events when field edited
   */
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;

  /**
   * Callback for onClick events when field clicked
   */
  onClick?: (e: any) => void;
};

/**
 * Lookup table of field types
 */
export type FieldTypesLookup = Record<string, FieldDataType>;

/**
 * Group of fields
 */
export type FieldGroup = {
  /**
   * Name of group to show in configuration windows.
   */
  group: string;

  /**
   * Fields to include in group
   */
  fields: Field[];
};
