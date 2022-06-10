import { graphql } from 'gatsby'

export const ProjectBaseData = graphql`  
  fragment ProjectBaseData on WpProject {
    nodeType
    id
    date
    title
    slug
    uri
    link
    locale {
      id
    }

    postConfig {
      bannerNewsletter
    }
  }
`