declare namespace SemanticStylesModuleScssNamespace {
  export interface ISemanticStylesModuleScss {
    semanticStyles: string
  }
}

declare const SemanticStylesModuleScssModule: SemanticStylesModuleScssNamespace.ISemanticStylesModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SemanticStylesModuleScssNamespace.ISemanticStylesModuleScss
}

export = SemanticStylesModuleScssModule
