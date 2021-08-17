import React from 'react'

import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout/Layout'

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query indexQuery {
      allAirtable {
        edges {
          node {
            data {
              Name
              Notes
              Status
              url
            }
          }
        }
      }
    }
  `)

  const airtableData = data.allAirtable.edges[0].node.data

  return (
    <Layout>
      <h1>Talus Analytics Gatsby Starter</h1>
      <p>
        {airtableData.Notes.trim()}, from{' '}
        <a href={airtableData.url}>this table.</a>
      </p>
    </Layout>
  )
}

export default IndexPage
