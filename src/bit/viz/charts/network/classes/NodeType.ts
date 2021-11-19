import {
  FieldDataType,
  FieldTypesLookup,
  TableMeta,
  DataSource,
  GraphNode,
  NodeConfig,
  NodeOrigin,
  NodeShape,
} from '../helpers'

/**
 * Define a type of node in the map, e.g., that which represents a specific
 * unit of analysis like a resource, organization, etc.
 */
export class NodeType {
  name: string
  config: NodeConfig
  source: DataSource
  fieldTypes: FieldTypesLookup
  tableMeta: TableMeta
  origin: NodeOrigin

  constructor(
    name: string,
    source: DataSource,
    config: NodeConfig,
    origin: NodeOrigin,
    tableMeta: TableMeta = { id: name, name, fields: [] }
  ) {
    this.name = name
    this.config = config
    this.fieldTypes = {}
    this.source = source
    this.origin = origin
    this.tableMeta = tableMeta
  }

  /**
   * Return all graph nodes of this type.
   */
  getNodes(): GraphNode[] {
    return this.source.nodes.filter(n => n._nodeType === this.name)
  }

  /**
   * Return shape nodes of this type should be rendered as.
   */
  getShape(): NodeShape {
    throw new Error('Not implemented')
  }

  /**
   * Set shape nodes of this type should be rendered as.
   */
  setShape(_shape: NodeShape): void {
    throw new Error('Not implemented')
  }

  getFieldsOfType(
    dataType: FieldDataType,
    linkedNodeType?: NodeType
  ): string[] {
    if (
      linkedNodeType !== undefined &&
      (dataType === 'select_record' || dataType === 'multiselect_record')
    ) {
      // const linkName: string = linkedNodeType.name;
      const mainTable: TableMeta = this.tableMeta
      const linkTable: TableMeta = linkedNodeType.tableMeta
      // const mainTable: TableMeta | undefined = this.source.tableMeta.find(
      //   (tm) => tm.name === this.name
      // );
      // const linkTable: TableMeta | undefined = this.source.tableMeta.find(
      //   (tm) => tm.name === linkedNodeType.name
      // );
      if (mainTable === undefined || linkTable === undefined)
        throw new Error('Table metadata missing')

      const mainFields: any[] = mainTable.fields.filter(f => {
        const linkedRecordMatch: boolean =
          f.options?.linkedTableId === linkTable.id
        const implicitMatch: boolean = f.id === linkTable.id
        return linkedRecordMatch || implicitMatch
      })
      const linkFields: any[] = linkTable.fields.filter(f => {
        const linkedRecordMatch: boolean =
          f.options?.linkedTableId === mainTable.id
        const implicitMatch: boolean = f.id === mainTable.id
        return linkedRecordMatch || implicitMatch
      })
      return [...new Set(mainFields.concat(linkFields).map(f => f.name))].sort()
    } else
      return Object.entries(this.fieldTypes)
        .filter(v => v[1] === dataType)
        .map(v => v[0])
  }

  /**
   * Infers and sets field types from a record (imperfectly).
   * @param {Record<string, any>} r The record
   */
  inferFieldTypesFromRecord(r: { fields: Record<string, any> }): void {
    for (const [field, value] of Object.entries(r.fields)) {
      const valType: string = typeof value
      if (valType === 'boolean') this.fieldTypes[field] = 'boolean'
      else if (valType === 'object') {
        if (value.length !== undefined) {
          if (
            value.length > 0 &&
            typeof value[0] === 'string' &&
            value[0].startsWith('rec')
          )
            this.fieldTypes[field] = 'multiselect_record'
          else this.fieldTypes[field] = 'select'
        } else this.fieldTypes[field] = 'object'
      } else if (valType === 'string') this.fieldTypes[field] = 'text'
      else if (valType === 'number') this.fieldTypes[field] = 'decimal'
      else throw new Error('No field type inferrable: ' + field)
    }
  }

  /**
   * Infers (imperfectly) the label field from the field types.
   * @param r The record
   */
  getInferredLabelFieldFromFieldTypes(): string {
    const textFieldNames: string[] = this.getFieldsOfType('text')
    const labelField = textFieldNames.find(n => {
      const nLower: string = n.toLowerCase()
      return nLower.includes('name') || nLower.includes('title')
    })
    if (labelField !== undefined) return labelField
    // use first text field if none other found
    else if (textFieldNames.length > 0) return textFieldNames[0]
    // use first field if none other found
    else if (this.tableMeta.fields.length > 0)
      return this.tableMeta.fields[0].name
    else throw new Error('Could not find a label field.')
  }
}