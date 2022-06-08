import { graphql } from 'gatsby'

export const PageBaseData = graphql`  
  fragment PageBaseData on WpPage {
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