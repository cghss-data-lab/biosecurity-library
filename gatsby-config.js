module.exports = {
  siteMetadata: {
    siteUrl: 'https://biosecuritycentral.org',
    title: 'Talus Analytics',
    cookieConsent: {
      cookieMessage:
        'The biosecurity library uses cookies to ensure you get the best experience possible.',
      buttonColor: 'rgb(15, 35, 75)',
      backgroundColor: '#edf2f2',
    },
  },
  plugins: [
    {
      // site will not build without a valid
      // airtable api key; delete this plugin
      // if airtable isn't going to be used.
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        concurrency: 5,
        tables: [
          {
            baseId: `app708Ctx0rz1c1n7`,
            tableName: `Lookup: Authoring orgs.`,
            tableView: `CMS view`,
          },
          {
            baseId: `app708Ctx0rz1c1n7`,
            tableName: `Lookup: Resource sets`,
            tableView: `CMS view`,
            tableLinks: [`Resources_in_set`],
          },
          {
            baseId: `app708Ctx0rz1c1n7`,
            tableName: `Glossary`,
            tableView: `CMS view`,
          },
          {
            baseId: `app708Ctx0rz1c1n7`,
            tableName: `Resource Library`,
            tableView: `CMS view`,
            tableLinks: [
              `Resource_sets`,
              `Auto_other_resources_cited`,
              `Authoring_organization`,
            ],
            mapping: {
              Thumbnail_INTERNAL: `fileNode`,
              Primary_file: `fileNode`,
              Other_language_files_INTERNAL: `fileNode`,
            },
          },
          {
            baseId: `appmL0p5H21CiY7tL`,
            tableName: `Landing Page`,
            tableView: `CMS`,
            mapping: { Image: `fileNode` },
          },
          {
            baseId: `appmL0p5H21CiY7tL`,
            tableName: `Footer`,
            tableView: `CMS`,
            mapping: { Image: `fileNode` },
          },
          {
            baseId: `appmL0p5H21CiY7tL`,
            tableName: `About Page`,
            tableView: `CMS`,
            mapping: { Image: `fileNode`, Download: `fileNode` },
          },
          {
            baseId: `appmL0p5H21CiY7tL`,
            tableName: `Explore Page`,
            tableView: `CMS`,
            mapping: { Image: `fileNode` },
          },
          {
            baseId: `appmL0p5H21CiY7tL`,
            tableName: `Icons`,
            tableView: `CMS`,
            mapping: { SVG: `fileNode` },
          },
          {
            baseId: `appmL0p5H21CiY7tL`,
            tableName: `Site metadata`,
            tableView: `CMS`,
            mapping: { Image: `fileNode` },
          },
        ],
      },
    },
    {
      // filling in the gtag here
      // will set up both the gatsby
      // google analytics plugin and
      // the cookieconsent opt-in system.
      resolve: `gatsby-plugin-gtag`,
      options: {
        trackingId: `G-NFPBK043KG`,
        anonymize: true,
        head: false,
      },
    },
    {
      resolve: `gatsby-plugin-plausible`,
      options: {
        domain: `biosecuritycentral.org`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    'talus-gatsby-transformer-svg',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-root-import',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-image',
    'gatsby-plugin-sass',
    'gatsby-plugin-mdx',
  ],
}
