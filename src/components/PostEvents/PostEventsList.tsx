import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useLocalizedQuery } from '../../hooks';
import { PostEventsItem } from './PostEventsItem';

export const PostEventsList = () => {
  const eventQuery = useStaticQuery(graphql`
    fragment Post on STRAPI_POST {
      __typename
      id
      slug
      eyelet
      locale
      title
      updatedAt
      url_path
      body {
        data {
          body
        }
      }
      featuredImage {
        ...Image
      }
    }
    fragment Event on STRAPI_EVENT {
      __typename
      id
      slug
      eyelet
      locale
      title
      startDate
      startTime
      endTime
      url_path
      body {
        data {
          body
        }
      }
      featuredImage {
        ...Image
      }
    }
    query AllStrapiPostsEvents {
      allStrapiPost {
        nodes {
          ...Post
        }
      }
      allStrapiEvent {
        nodes {
          ...Event
        }
      }
    }
  `);

  const { localeNodes: events } = useLocalizedQuery<
    Queries.EventFragment | Queries.PostFragment,
    Queries.AllStrapiPostsEventsQuery
  >({
    type: 'allStrapiEvent',
    query: eventQuery,
  });

  const { localeNodes: posts } = useLocalizedQuery<
    Queries.EventFragment | Queries.PostFragment,
    Queries.AllStrapiPostsEventsQuery
  >({
    type: 'allStrapiPost',
    query: eventQuery,
  });

  const postEventsCollection = [...posts, ...events];

  return (
    <section className="press-release-list">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <div className="row">
              {postEventsCollection?.map(postEvent => (
                <div className="col-12 col-lg-6 d-flex" key={postEvent.id}>
                  <PostEventsItem post={postEvent} />
                </div>
              ))}
            </div>
            {/* <Pagination */}
            {/*   context={pageContext} */}
            {/*   baseUri={uri.replace(/\/$/, '')} */}
            {/* /> */}
          </div>
        </div>
      </div>
    </section>
  );
};
