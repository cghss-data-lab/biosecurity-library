import { Settings, defaultNodeDef, NetworkData } from '../internal/internal'
import {
  AppGraphData,
  GraphLink,
  GraphNode,
  NodeConfig,
  CsvDataSource,
  DataSource,
} from '../helpers'

type UpdateFunction = (a: AppGraphData, b?: { reheat?: boolean }) => void

export class Project {
  name: string
  dataSources: DataSource[]
  graphData: AppGraphData
  onGraphDataChange: UpdateFunction
  nodeIdMap: Record<string, string>
  internalIdCounter: number
  networkGraphData: NetworkData
  globalSettings: Settings
  selectedNode: string | null

  constructor(
    onGraphDataChange: UpdateFunction,
    name: string = 'New project',
    settings: Settings
  ) {
    this.name = name
    this.dataSources = []
    this.graphData = { nodes: [], links: [] }
    this.onGraphDataChange = onGraphDataChange
    this.nodeIdMap = {}
    this.internalIdCounter = 0
    this.networkGraphData = new NetworkData()
    this.globalSettings = settings
    this.selectedNode = null

    // subscribe to data source config change events
    const listener: EventListener = async (eTmp: Event) => {
      const e: CustomEvent = eTmp as CustomEvent
      if (e.detail !== undefined) {
        const ds: DataSource = e.detail.dataSource
        if (this.dataSources.includes(ds)) {
          await this.updateDataFromSource(ds)
          console.debug('Updated because data source updated: ' + ds)
        }
      }
    }
    if (typeof window !== 'undefined')
      window.addEventListener('dataSourceConfigChange', listener.bind(this))
  }

  /**
   * Add the provided data source to the project.
   * @param {DataSource} s The source
   */
  addSource(s: DataSource): void {
    if (!this.dataSources.map(ds => ds.name).some(name => name === s.name)) {
      this.dataSources.push(s)
      s.onAdd()
      this.update()
    } else
      throw new Error(
        'All project data sources must have unique names but this was' +
          ' reused: ' +
          s.name
      )
  }

  protected update(options?: { reheat: boolean }) {
    this.onGraphDataChange(this.networkGraphData.getDataForMap(), options)
  }

  /**
   * Update nodes and links from the defined data source and trigger the
   * project's update function (i.e., to update the network map).
   * @param {DataSource} ds The source
   */
  async updateDataFromSource(ds: DataSource): Promise<void> {
    await this.networkGraphData.updateDataFromSource(ds)
    this.update({ reheat: true })
  }

  private parseMultiLinks(rawLinks: any): any[] {
    return rawLinks.links !== undefined ? rawLinks.links : rawLinks // TODO fix
  }

  private addLinksFromJson(json: any, doUpdate: boolean = true): number {
    const newLinks: any[] = json.edges !== undefined ? json.edges : json
    const finalNewLinks: any[] = this.parseMultiLinks(newLinks)
    this.graphData = {
      nodes: this.graphData.nodes,
      links: [...this.graphData.links, ...finalNewLinks],
    }
    if (doUpdate) this.update()
    return finalNewLinks.length
  }

  private addNodesFromJson(newNodes: any[], doUpdate: boolean = true): number {
    const existingAndUpdatedNodes: any[] = this.graphData.nodes.map(
      (n: any) => {
        const match: any = newNodes.find(nn => nn.id === n.id)
        if (match) return { ...match, x: n.x, y: n.y, fx: n.x, fy: n.y }
        else return n
      }
    )
    // TODO efficiently ensure duplicate IDs cannot happen
    const trulyNewNodes: any[] = newNodes.filter(
      (nn: any) =>
        !existingAndUpdatedNodes.map((n: any) => n.id).includes(nn.id)
    )

    const updatedNodes = [...existingAndUpdatedNodes, ...trulyNewNodes]
    this.graphData = {
      nodes: updatedNodes,
      // nodes: [...this.graphData.nodes, ...newNodes],
      links: this.graphData.links.map((l: any) => {
        const newSource: any = updatedNodes.find(n => n.id === l.source.id)
        const newTarget: any = updatedNodes.find(n => n.id === l.target.id)
        return {
          ...l,
          source: newSource !== undefined ? newSource : l.source,
          target: newTarget !== undefined ? newTarget : l.target,
        }
      }),
    }
    if (doUpdate) this.update()
    return newNodes.length
  }

  graphDataIsEmpty(): boolean {
    return (
      this.graphData.nodes.length === 0 && this.graphData.links.length === 0
    )
  }

  async addFileData(fs: File[]): Promise<void> {
    const addedSources: DataSource[] = await this.createSourcesFromFiles(fs)
    this.addSourceData(addedSources)
  }

  async updateNodesFor(source: DataSource) {
    if (!this.dataSources.includes(source))
      throw new Error(
        `Project ${this.name} doesn't include data source ${source.name}`
      )
    const ns: GraphNode[] = await source.getNodes()
    // this.removeSourceData([source], ["nodes"]);
    this.addNodesFromJson(ns, true)
  }

  async updateEdgesFor(source: DataSource) {
    if (!this.dataSources.includes(source))
      throw new Error(
        `Project ${this.name} doesn't include data source ${source.name}`
      )
    // this.removeSourceData([source], ["links"]);
    const links: GraphLink[] = await source.getLinks()
    this.addLinksFromJson(links, true)
  }

  async updateSourceData(sources: DataSource[]): Promise<void> {
    await this.addSourceData(sources)
  }

  async addSourceData(sources: DataSource[]): Promise<void> {
    for (const s of sources) {
      await s.load()
      await this.updateDataFromSource(s)
    }
  }

  private async createSourcesFromFiles(fs: File[]): Promise<DataSource[]> {
    let numProcessed: number = 0
    const newSources: DataSource[] = []
    for (const f of fs) {
      if (f.name.endsWith('.csv')) {
        const newSource: DataSource = await this.addCsvDataSourceFromFile(f)
        newSources.push(newSource)
        numProcessed = numProcessed + 1
      } else {
        throw new Error('Only CSV files supported at this time.')
      }
    }
    return newSources
  }

  async addCsvDataSourceFromFile(f: File): Promise<CsvDataSource> {
    const newDataSource = new CsvDataSource({
      name: f.name,
      filename: f.name,
      file: f,
      projects: [this],
    })
    await newDataSource.load()
    this.dataSources.push(newDataSource)
    return newDataSource
  }
}
