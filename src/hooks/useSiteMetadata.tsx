import { graphql, useStaticQuery } from 'gatsby';

export const useSiteMetadata = (): Queries.MetadataQuery['site'] => {
  const { site: { siteMetadata } } = useStaticQuery(graphql`
    query Metadata {
      site {
        siteMetadata {
          description
          metaDescription
          metaTitle
          title
          metaSocial {
            description
            image
            socialNetwork
            title
          }
        }
      }
    }
  `);

  return { siteMetadata }
};
