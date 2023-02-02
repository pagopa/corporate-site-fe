import type { GatsbyConfig } from 'gatsby';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + `/.env.${process.env.NODE_ENV}` });

const config: GatsbyConfig = {
  siteMetadata: {
    metaTitle: `PagoPA`,
    metaDescription: `PagoPA S.p.A. è una società pubblica ad alto livello specialistico, che ha la mission di diffondere i servizi pubblici digitali attraverso lo sviluppo di progetti innovativi e la gestione di infrastrutture tecnologiche strategiche per accompagnare la modernizzazione della Pubblica Amministrazione e del Paese.`,
    metaSocial: {
      socialNetwork: `twitter`,
      title: `https://www.twitterdomain.tld`,
      description: `author`,
      image: `/site-icon.png`,
    },
    keywords: `random-stuff`,
    metaRobots: `stuff`,
    metaViewport: `width=device-width, initial-scale=1, shrink-to-fit=no`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
        ignore: [`**/\.*`], // ignore dotfiles
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `svg`,
        path: `${__dirname}/src/images`,
        ignore: [`**/\.*`], // ignore dotfiles
      },
    },
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: process.env.STRAPI_API_URL || 'http://localhost:1337',
        accessToken: process.env.STRAPI_TOKEN,
        queryLimit: 1000,
        singleTypes: [
          {
            singularName: 'jobposition',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-strapi-plugin-navigation_local',
      options: {
        apiURL: process.env.STRAPI_API_URL || 'http://localhost:1337',
        navigation: [
          { key: 'MainMenu', id: 6, locale: 'en' },
          { key: 'MainMenu', id: 7, locale: 'it' },
          { key: 'ReservedMenu', id: 8, locale: 'it' },
          { key: 'ReservedMenu', id: 9, locale: 'en' },
        ],
        type: 'TREE', // optional
        token: process.env.STRAPI_TOKEN, // optional
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        additionalData: `@import "${__dirname}/src/sass/vars"`,
        sassOptions: {
          precision: 6,
          indentedSyntax: true,
          includePaths: ['node_modules/bootstrap/scss'],
        },
      },
    },
    {
      resolve: `gatsby-plugin-schema-snapshot`,
      options: {
        path: `snapshot.gql`,
        update: process.env.GATSBY_UPDATE_SCHEMA_SNAPSHOT,
      },
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        languages: ['it', 'en'],
        fallbackLanguage: 'en',
        generateDefaultLanguagePage: true,
        i18nextOptions: {
          debug: true,
        },
      },
    },
  ],
};

export default config;