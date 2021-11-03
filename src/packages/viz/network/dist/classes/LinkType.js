"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkType = void 0;
/**
 * Define a type of link in the map, e.g., that which represents a specific
 * unit of analysis like a resource, organization, etc.
 */
class LinkType {
    constructor(name, project, config, source, target) {
        this.name = name;
        this.config = config;
        this.project = project;
        this.source = source;
        this.target = target;
    }
    static getLinkTypeName(sourceName, targetName) {
        const namePrefix = `${sourceName} to ${targetName}`;
        const nameCount = LinkType.linkTypeNameTable[namePrefix] || 0;
        const name = nameCount > 0 ? `${namePrefix} (${nameCount + 1})` : namePrefix;
        LinkType.linkTypeNameTable[namePrefix] = nameCount + 1;
        return name;
    }
    /**
     * Return all graph links of this type.
     */
    getLinks() {
        throw new Error("Not implemented");
    }
}
exports.LinkType = LinkType;
LinkType.linkTypeNameTable = {};
//# sourceMappingURL=LinkType.js.map