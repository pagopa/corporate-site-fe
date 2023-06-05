import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { useLocalizedQuery } from '../../../hooks';
import { Article } from '../../Article';
import { Pagination } from '../../Pagination';
import { useLocation } from '@reach/router';

export const NewsletterList = () => {
  const query = useStaticQuery(graphql`
    fragment Newsletter on STRAPI_NEWSLETTER {
      __typename
      id
      slug
      bannerNewsletter
      eyelet
      title
      locale
      updatedAt
      publishedAt
      featuredImage {
        localFile {
          childImageSharp {
            gatsbyImageData(
              width: 460
              height: 346
              transformOptions: { cropFocus: ATTENTION }
            )
          }
        }
      }
      body {
        data {
          body
        }
      }
    }
    query AllNewsletter {
      allStrapiNewsletter {
        nodes {
          ...Newsletter
        }
      }
    }
  `);

  const { localeNodes: newsletter } = useLocalizedQuery<
    Queries.NewsletterFragment,
    Queries.AllNewsletterQuery
  >({
    query,
    type: 'allStrapiNewsletter',
  });

  const { origin } = useLocation();
  return (
    <section className={`d-flex row justify-content-center`}>
      <div className={'col-10'}>
        <Pagination
          className={`row col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2`}
          data={newsletter}
          itemsPerPage={2}
          keyExtractor={item => item.id}
          renderItem={item => (
            <div className="col-lg-6 d-flex my-1">
              <Article
                isPreview={false}
                article={{
                  ...item,
                  slug: `${origin}/media/newsletter-outer-space/${item.slug}`,
                }}
              />
            </div>
          )}
        />
      </div>
    </section>
  );
};
