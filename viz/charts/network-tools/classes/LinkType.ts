import { GraphLink, LinkConfig, NodeType } from '..'

/**
 * Define a type of link in the map, e.g., that which represents a specific
 * unit of analysis like a resource, organization, etc.
 */
export class LinkType {
  name: string
  config: LinkConfig
  // project: Project;
  source: NodeType
  target: NodeType
  static linkTypeNameTable: Record<string, number> = {}

  constructor(
    name: string,
    // project: Project,
    config: LinkConfig,
    source: NodeType,
    target: NodeType
  ) {
    this.name = name
    this.config = config
    // this.project = project;
    this.source = source
    this.target = target
  }

  static getLinkTypeName(sourceName: string, targetName: string): string {
    const namePrefix: string = `${sourceName} to ${targetName}`
    const nameCount: number = LinkType.linkTypeNameTable[namePrefix] || 0
    const name = nameCount > 0 ? `${namePrefix} (${nameCount + 1})` : namePrefix
    LinkType.linkTypeNameTable[namePrefix] = nameCount + 1
    return name
  }

  /**
   * Return all graph links of this type.
   */
  getLinks(): GraphLink[] {
    throw new Error('Not implemented')
  }
}
