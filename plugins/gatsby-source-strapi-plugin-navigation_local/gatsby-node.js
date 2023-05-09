const fetch = require('node-fetch');

const STRAPI_NODE_TYPE = `StrapiNavigation`;

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId, createContentDigest, reporter },
  { apiURL, token, navigation, type }
) => {
  // This function returns the url to fetch the navigation from
  const getUrl = id => {
    const url = `${apiURL}/api/navigation/render/${id}`;
    return type ? `${url}?type=${type}` : url;
  };

  // This function creates a node for the navigation
  const createNavigationNode = (item, locale, key) => {
    createNode({
      ...item,
      key,
      locale,
      id: createNodeId(`${STRAPI_NODE_TYPE}-${item.id}`),
      parent: null,
      children: [],
      internal: {
        type: STRAPI_NODE_TYPE,
        content: JSON.stringify(item),
        contentDigest: createContentDigest(item),
      },
    });
  };

  await Promise.all(
    // loop over the navigation object
    Object.entries(navigation).map(async ([key, values]) => {
      // loop over the locales
      Object.entries(values).map(async ([locale, idOrSlug]) => {
        try {
          const headers = token ? { Authorization: `Bearer ${token}` } : {}; // create the headers for the fetch request
          const url = getUrl(idOrSlug); // get the url to fetch the navigation from
          const response = await fetch(url, { headers });
          // log the response
          const msg = `plugin-navigation_local: [${key}-${locale}] ${url} ${response.status} ${response.statusText}`;
          reporter[response.ok ? 'success' : 'warn'](msg);
          if (response.ok) {
            // create the node for the navigation
            const [node] = await response.json();
            createNavigationNode(node, locale, key);
          }
        } catch (e) {
          reporter.error(e);
        }
      });
    })
  );

  reporter.success('Successfully sourced navigation items.');
};

