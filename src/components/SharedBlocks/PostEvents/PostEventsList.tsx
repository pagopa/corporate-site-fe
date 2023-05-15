import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { useLocalizedQuery } from '../../../hooks';
import { Article } from '../../Article';
import { Pagination } from '../../Pagination';

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
      publishedAt
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
      publishedAt
      startDate
      startTime
      endTime
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
      allStrapiPost(sort: { publishedAt: DESC }) {
        nodes {
          ...Post
        }
      }
      allStrapiEvent(sort: { publishedAt: DESC }) {
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
  const postEventsCollectionSorted = postEventsCollection.sort((a, b) =>
    a.publishedAt > b.publishedAt ? -1 : a.publishedAt < b.publishedAt ? 1 : 0
  );

  return (
    <section className="press-release-list">
      <div className="container-fluid">
        <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 row">
          <Pagination
            data={postEventsCollectionSorted}
            itemsPerPage={12}
            keyExtractor={item => item.id}
            renderItem={item => (
              <div className="col-12 col-lg-6 d-flex row">
                <Article article={item} />
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
};
