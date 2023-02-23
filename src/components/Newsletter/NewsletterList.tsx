import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import { useLocalizedQuery } from '../../hooks';
import { Layout } from '../../partials/Layout';
import {PostEventsItem} from '../PostEvents';

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
        ...Image
      }
      url_path
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
                {newsletter?.map((news, key) => {
                  return (
                    <div className="col-12 col-lg-6 d-flex" key={key}>
                      <PostEventsItem post={news} />
                    </div>
                  );
                })}
              </div>
              {/* <Pagination */}
              {/*   context={pageContext} */}
              {/*   baseUri={uri.replace(/\/$/, '')} */}
              {/* /> */}
            </div>
          </div>
        </div>
      </section>

      {/* {bannerNewsletter && <NewsletterBanner />} */}
    </Layout>
  );
};
