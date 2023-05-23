# gatsby-source-strapi-plugin-navigation

Gatsby source plugin for pulling navigation/menu into Gatsby as graphQL nodes from a [strapi](https://github.com/strapi/strapi) instace that uses the [strapi-plugin-navigation](https://www.npmjs.com/package/strapi-plugin-navigation).

## How to use

To use this plugin, you need to add it to your gatsby-config.js file.

```javascript
{
  resolve: `gatsby-source-strapi-plugin-navigation_local`,
  options: {
    apiURL: 'http://localhost:1337',
    navigation: {
      {
        main: {
          en: 'main-en',
          fr: 'main-fr',
        },
        footer: {
          en: 'footer-en',
          fr: 'footer-fr',
        },
      }
    },
    type: 'TREE', // optional
    token: 'MY_TOKEN', // optional
  },
}
```

The plugin takes the following options:

- apiURL: the url of the Strapi API
- token: the JWT token to authenticate with the Strapi API
- navigation: an object containing the navigation items to source
- type: the type of navigation to source

The navigation object should be structured as follows:

```javascript
{
  [key]: {
    [locale]: [idOrSlug],
  },
}
```

The key is the key we want to use to identify this item.
The locale is the locale of the strapi navigation item.
The idOrSlug is the id or slug of the strapi navigation item.

For example:

```javascript
{
  main: {
    en: 'main-en',
    fr: 'main-fr',
  },
  footer: {
    en: 4,
    fr: 5,
  },
}
```

The plugin will create a node for each navigation item.

The node will have the following fields:

- id: the id of the navigation item
- key: the key of the navigation item
- locale: the locale of the navigation item
- title: the title of the navigation item
- items: the items of the navigation item

The items field will have the following fields:

- id: the id of the navigation item
- title: the title of the navigation item
- url: the url of the navigation item
- target: the target of the navigation item
- items: the items of the navigation item

The items field will be an array of items.

For example:

```javascript
{
  id: 'main-en',
  key: 'main',
  locale: 'en',
  title: 'Main',
  items: [
    {
      id: 'home',
      title: 'Home',
      url: '/',
      target: '_self',
      items: [],
    },
    {
      id: 'about',
      title: 'About',
      url: '/about',
      target: '_self',
      items: [],
    },
  ],
}
```

