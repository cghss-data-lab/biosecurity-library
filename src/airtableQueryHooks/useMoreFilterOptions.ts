import { useStaticQuery, graphql } from 'gatsby'
import { FilterFields } from 'components/explorepage/exploreReducer'

type FilterOptions = {
  [key in FilterFields]: {
    distinct: string[]
  }
}

const useMoreFilterOptions = () => {
  const filterOptions: FilterOptions = useStaticQuery(graphql`
    query moreFilterOptionsQuery {
      Resource_language: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___Resource_language)
      }
      Access_limitations: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___Access_limitations)
      }
      Authoring_organization_type: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___Authoring_organization___data___Type)
      }
      Resource_format: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___Resource_format)
      }
    }
  `)

  return filterOptions
}

export default useMoreFilterOptions
