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
      Key_Topic_Area_s_: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___Key_Topic_Area_s_)
      }
      Authoring_Organization: allAirtable(
        filter: { table: { eq: "Resource Library" } }
      ) {
        distinct(field: data___Authoring_Organization)
      }
      User_Roll_Up: allAirtable(filter: { table: { eq: "Resource Library" } }) {
        distinct(field: data___User_Roll_Up)
      }
    }
  `)

  return filterOptions
}

export default useFilterOptions
