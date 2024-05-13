exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `

    union SHARED_BLOCKS_UNION =
      STRAPI__COMPONENT_SHARED_BLOCK_ACCORDION |
      STRAPI__COMPONENT_SHARED_BLOCK_ATTACHMENTS_GRID |
      STRAPI__COMPONENT_SHARED_BLOCK_CONTACTS_LIST |
      STRAPI__COMPONENT_SHARED_BLOCK_CONTENTS_LIST |
      STRAPI__COMPONENT_SHARED_BLOCK_CTA_BANNER |
      STRAPI__COMPONENT_SHARED_BLOCK_CTA_GRID |
      STRAPI__COMPONENT_SHARED_BLOCK_HERO_SLIDER |
      STRAPI__COMPONENT_SHARED_BLOCK_INTRO |
      STRAPI__COMPONENT_SHARED_BLOCK_JOBS_LISTING |
      STRAPI__COMPONENT_SHARED_BLOCK_LIST_ATTACHMENTS |
      STRAPI__COMPONENT_SHARED_BLOCK_LOGO_LINKS |
      STRAPI__COMPONENT_SHARED_BLOCK_MAP_BOX |
      STRAPI__COMPONENT_SHARED_BLOCK_NEWS_AND_EVENTS |
      STRAPI__COMPONENT_SHARED_BLOCK_NEWSLETTER |
      STRAPI__COMPONENT_SHARED_BLOCK_PRESS_RELEASE |
      STRAPI__COMPONENT_SHARED_BLOCK_PROJECTS_CAROUSEL |
      STRAPI__COMPONENT_SHARED_BLOCK_UNIVERSITY_ACCORDION |
      STRAPI__COMPONENT_SHARED_BLOCK_VISUAL |
      STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT |
      STRAPI__COMPONENT_SHARED_BLOCK_INNOVATION_ANNOUNCEMENTS

  `;
  createTypes(typeDefs);
};

const collectionsDateOverride = [
  'STRAPI_EVENT',
  'STRAPI_INITIATIVE',
  'STRAPI_NEWSLETTER',
  'STRAPI_POST',
  'STRAPI_PRESS_RELEASE',
];

const collectionsPathsOverride = ['SitePage'];

const publishOverride = collectionsDateOverride.reduce(
  (acc, collection) => ({
    ...acc,
    [collection]: {
      publishedAt: {
        type: 'Date',
        resolve: async ({ publishedAt, publishOverride }) => {
          return publishOverride ?? publishedAt;
        },
      },
    },
  }),
  {}
);

const pathOverride = {
  SitePage: {
    path: {
      type: 'String',
      resolve: async ({ path }) => {
        const removeUrlPath = path.replace('/it/prodotti-e-servizi/', '');
        return removeUrlPath;
      },
    },
  },
};

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    STRAPI_PAGE: {
      permalink: {
        type: 'String',
        resolve: async ({ slug, url_path, locale }) => {
          const base_path = locale === 'en' ? '/en' : '';
          const permalink = url_path
            ? `${base_path}/${url_path}/${slug}`
            : `${base_path}/${slug}`;
          return permalink;
        },
      },
    },
    ...publishOverride,
    ...pathOverride,
    STRAPI_PROJECT: {
      slug: {
        type: 'String',
        resolve: async ({ slug, url_path, locale }) => {
          const base_path = locale === 'en' ? '/en' : '/it';
          const permalink = `${base_path}${url_path}${slug}`;
          return permalink;
        },
      },
    },
  });
};
