import { useStaticQuery, graphql } from 'gatsby'
import { FilterFields } from '../components/explorepage/exploreReducer'

type FilterOptions = {
  [key in FilterFields]: {
    distinct: string[]
  }
}

const useFilterOptions = () => {
  const filterOptions: FilterOptions = useStaticQuery(graphql`
    query filterOptionsQuery {
      Target_user_role: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___Target_user_role)
      }
      User_roll_up: allAirtable(filter: { table: { eq: "Resource Library" } }) {
        distinct(field: data___User_roll_up)
      }
      Key_topic_area: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___Key_topic_area)
      }
      Authoring_organization: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___Authoring_organization___data___Name)
      }
    }
  `)

  return filterOptions
}

export default useFilterOptions
