export interface AirtableMetaProps {
  // the API key
  apiKey: string
}

export const AIRTABLE_META_API_ROOT: string = 'https://api.airtable.com/v0/meta'

export interface HttpResponse<T> extends Response {
  parsedBody?: T
}

export interface AirtableMetaTables {
  tables: AirtableMetaTable[]
}
export interface AirtableMetaBases {
  bases: AirtableMetaBase[]
}

export interface AirtableMetaTable {
  id: string
  name: string
  primaryFieldId: string
  fields: AirtableMetaTableField[]
  views: AirtableMetaView[]
}

interface AirtableMetaView {
  id: string
  name: string
  type: AirtableMetaViewType
}
export interface AirtableMetaBase {
  id: string
  name: string
  permissionLevel: AirtableMetaBasePermissionLevel
}

interface AirtableMetaTableField {
  id: string
  name: string
  type: AirtableFieldType
  options?: {
    linkedTableId?: string
    isReversed?: boolean
    prefersSingleRecordLink?: boolean
    choices?: AirtableFieldOptionChoice[]
  }
}

type AirtableFieldType = 'singleLineText'
type AirtableFieldOptionChoice = {
  id: string
  name: string
  color: string
}
type AirtableMetaBasePermissionLevel = 'create' | 'read'
type AirtableMetaViewType = 'grid' | 'form' | 'calendar' | 'gallery' | 'kanban'
