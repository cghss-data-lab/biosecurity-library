import { useStaticQuery, graphql } from 'gatsby'

export interface Definition {
  data: {
    Column: string[]
    Definition: string
    Glossary_Name: string
  }
}

const useDefinitions = () => {
  const {
    definitions: { nodes: definitions },
  }: { definitions: { nodes: Definition[] } } = useStaticQuery(graphql`
    query definitionsQuery {
      definitions: allAirtable(filter: { table: { eq: "Glossary" } }) {
        nodes {
          data {
            Glossary_Name
            Definition
            Column
          }
        }
      }
    }
  `)
  return definitions
}

export default useDefinitions
