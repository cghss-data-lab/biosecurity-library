import React from 'react'

import { useStaticQuery, graphql } from 'gatsby'

import Layout from '../components/Layout/Layout'

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query indexQuery {
      homePageText: allAirtable(filter: { table: { eq: "Landing Page" } }) {
        nodes {
          data {
            Name
            Text
            Attachments {
              url
            }
          }
        }
      }
      homePageResources: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        group(field: data___Key_Topic_Area_s_) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  console.log(data)

  // const airtableData = data.allAirtable.edges[0].node.data

  return (
    <Layout>
      <h1>Talus Analytics Gatsby Starter</h1>
      <p>
        {/* {airtableData.Notes.trim()}, from{' '}
        <a href={airtableData.url}>this table.</a> */}
      </p>
    </Layout>
  )
}

export default IndexPage
