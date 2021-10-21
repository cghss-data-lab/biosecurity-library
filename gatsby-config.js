module.exports = {
  siteMetadata: {
    siteUrl: 'https://biosecurity-library.talusanalytics.com/',
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
            tableName: `Resource Library`,
            tableView: `CMS view`,
            tableLinks: [
              `Auto_other_resources_cited`,
              `Authoring_organization`,
            ],
            mapping: {
              Thumbnail_INTERNAL: `fileNode`,
              Files_INTERNAL: `fileNode`,
            },
          },
          {
            baseId: `appmL0p5H21CiY7tL`,
            tableName: `Glossary`,
            tableView: `CMS`,
          },
          {
            baseId: `appmL0p5H21CiY7tL`,
            tableName: `Landing Page`,
            tableView: `CMS`,
            mapping: { Image: `fileNode` },
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
        trackingId: `G-XXXXXXXXXX`,
        anonymize: true,
        head: false,
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
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-image',
    'gatsby-plugin-sass',
    'gatsby-plugin-mdx',
  ],
}
