import { useStaticQuery, graphql } from 'gatsby'

export interface Definition {
  data: {
    Name: string
    Column: string[]
    Definition: string
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
            Name
            Column
            Definition
          }
        }
      }
    }
  `)
  return definitions
}

export default useDefinitions
