import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { useLocalizedQuery } from '../../../hooks';
import { Layout } from '../../../partials/Layout';
import { Article } from '../../Article';
import { Pagination } from '../../Pagination';

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

  return (
    <Layout>
      <section className="press-release-list">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <div className="row">
                <Pagination
                  data={newsletter}
                  keyExtractor={item => item.id}
                  renderItem={item => (
                    <div className="col-12 col-lg-6 d-flex">
                      <Article
                        article={{
                          ...item,
                          slug: `${process.env.API_URL}/media/newsletter-outer-space/${item.slug}`,
                        }}
                      />
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* {bannerNewsletter && <NewsletterBanner />} */}
    </Layout>
  );
};
