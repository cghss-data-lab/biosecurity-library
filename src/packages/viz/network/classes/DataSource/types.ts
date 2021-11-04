/**
 * Types for DataSource class
 */
import { LinkType } from "../LinkType";
import { NodeType } from "../NodeType";
import { DataSource } from "./DataSource";

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

export interface TableConfig {
  nodeTypes: NodeType[];
  linkTypes: LinkType[];
}
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
