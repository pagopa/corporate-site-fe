import { useStaticQuery, graphql } from 'gatsby'

export const useUniversityCollaborations = () => {
  const { allWpUniversityCollaboration } = useStaticQuery(graphql`
    query collaborations {
      allWpUniversityCollaboration(sort: {fields: modified, order: DESC}) {
        edges {
          node {
            title
            content
            collaborationFields {
              collaborationType
              isActive
            }
          }
        }
      }
    }
  `)
  
  return allWpUniversityCollaboration.edges
}
