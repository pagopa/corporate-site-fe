const fetch = require('node-fetch');

const STRAPI_NODE_TYPE = `StrapiNavigation`;

exports.sourceNodes = async (
  { actions: { createNode }, createNodeId, createContentDigest, reporter },
  { apiURL, token, navigation, type }
) => {
  const getUrl = id =>
    `${apiURL}/api/navigation/render/${id}${type ? `?type=${type}` : ''}`;

  const createNavigationNode = (item, locale, key) => {
    const node = {
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
    };

    createNode(node);
  };

  await Promise.all(
    Object.entries(navigation)?.map(async ([key, values]) => {
      Object.entries(values)?.map(async ([locale, idOrSlug]) => {
        try {
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          const url = getUrl(idOrSlug);
          const response = await fetch(url, { headers });
          const msg = `plugin-navigation_local: [${key}-${locale}] ${url} ${response.status} ${response.statusText}`;
          reporter[response.ok ? 'success' : 'warn'](msg);
          if (response.ok) {
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
