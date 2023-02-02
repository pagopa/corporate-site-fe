const fetch = require('node-fetch');

function buildUrls(navigation, apiURL, type) {
  const getUrl = id =>
    `${apiURL}/api/navigation/render/${id}${type ? `?type=${type}` : ''}`;

  return navigation.map(navigationObj => getUrl(navigationObj.id));
}

const fetchNavigationItems = async (urls, headers) => {
  return await Promise.all(
    urls.map(async u => {
      const response = await fetch(u, {
        headers: headers,
      });
      return await response.json();
    })
  );
};

const STRAPI_NODE_TYPE = `StrapiNavigation`;

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId, createContentDigest, reporter },
  { apiURL, token, navigation, type, languages }
) => {
  const urls = buildUrls(navigation, apiURL, type, languages);

  const headers = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const navigationItemsArr = await fetchNavigationItems(urls, headers);

  navigationItemsArr.map((navigationItems, index) =>
    navigationItems.map(item => {

      const keys = { ...navigation[index] };

      const node = {
        ...keys,
        ...item,
        id: createNodeId(`${STRAPI_NODE_TYPE}-${item.id.toString()}`),
        parent: null,
        children: [],
        internal: {
          type: STRAPI_NODE_TYPE,
          content: JSON.stringify(item),
          contentDigest: createContentDigest(item),
        },
      };

      createNode(node);
    })
  );

  reporter.success('Successfully sourced all navigation items.');
};
