import {
  AirtableMetaBase,
  AirtableMetaBases,
  AirtableMetaProps,
  AirtableMetaTable,
  AirtableMetaTables,
  AIRTABLE_META_API_ROOT,
  HttpResponse,
} from './types'
import { get } from './utils'

export class AirtableMeta {
  private apiKey: string

  /**
   * Create new AirtableMeta connection with the defined API key.
   * @param props AirtableMeta properties in AirtableMetaProps
   */
  constructor(props: AirtableMetaProps) {
    this.apiKey = props.apiKey
  }

  async getBases(): Promise<AirtableMetaBase[]> {
    return this.getRawBaseList()
  }

  async getTablesOfBase(baseId: string): Promise<AirtableMetaTable[]> {
    return this.getRawTableList(baseId)
  }

  private async getRawBaseList(): Promise<AirtableMetaBase[]> {
    const url: string = this.getBasesUrl()
    const res: HttpResponse<AirtableMetaBases> = await this.get<
      AirtableMetaBases
    >(url)
    if (res.parsedBody === undefined) throw new Error('Request failed')
    else {
      return res.parsedBody.bases
    }
  }

  private async getRawTableList(baseId: string): Promise<AirtableMetaTable[]> {
    const url: string = this.getTablesUrl(baseId)
    const res: HttpResponse<AirtableMetaTables> = await this.get<
      AirtableMetaTables
    >(url)
    if (res.parsedBody === undefined) throw new Error('Request failed')
    else {
      return res.parsedBody.tables
    }
  }

  private getBasesUrl(): string {
    return AIRTABLE_META_API_ROOT + `/bases`
  }
  private getTablesUrl(baseId: string): string {
    return AIRTABLE_META_API_ROOT + `/bases/${baseId}/tables`
  }

  private get<T>(url: string, headers?: any): Promise<HttpResponse<T>> {
    if (this.apiKey === undefined) throw new Error('API key required')
    return get<T>(url, {
      ...headers,
      Authorization: `Bearer ${this.apiKey}`,
    })
  }
}

export default AirtableMeta
