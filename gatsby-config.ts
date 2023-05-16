import type { GatsbyConfig } from 'gatsby';
import * as dotenv from 'dotenv';

dotenv.config({
  path: __dirname + `/.conf/navigation.${process.env.NODE_ENV}`,
});
dotenv.config({
  path: __dirname + `/.env.${process.env.NODE_ENV}`,
  override: true,
});

const config: GatsbyConfig = {
  siteMetadata: {
    metaTitle: `PagoPA S.p.A.`,
    metaDescription: `PagoPA S.p.A. è una società pubblica ad alto livello specialistico, che ha la mission di diffondere i servizi pubblici digitali attraverso lo sviluppo di progetti innovativi e la gestione di infrastrutture tecnologiche strategiche per accompagnare la modernizzazione della Pubblica Amministrazione e del Paese.`,
    metaSocial: [
      {
        description: `author`,
        image: `/site-icon.png`,
        socialNetwork: `twitter`,
        title: `https://twitter.com/PagoPA`,
      },
    ],
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
    `gatsby-transformer-json`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-plugin-remark_local`],
      },
    },
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
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/locales`,
        name: `locale`,
      },
    },
    {
      resolve: 'gatsby-source-strapi',
      options: {
        apiURL: process.env.STRAPI_API_URL,
        accessToken: process.env.STRAPI_TOKEN,
        queryLimit: 1000,
        collectionTypes: [
          {
            singularName: 'jobposition',
            queryParams: {
              populate: 'deep',
            },
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
          },
          {
            singularName: 'press-release',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
          },
          {
            singularName: 'event',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
          },
          {
            singularName: 'post',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
          },
          {
            singularName: 'newsletter',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
          },
          {
            singularName: 'project',
            queryParams: {
              populate: 'deep',
            },
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
          },
          {
            singularName: 'page',
            queryParams: {
              populate: 'deep',
            },
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
          },
          {
            singularName: 'university-collaboration',
            pluginOptions: {
              i18n: {
                locale: 'all',
              },
            },
          },
          {
            singularName: 'ct-alias',
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
        apiURL: process.env.STRAPI_API_URL,
        navigation: {
          MainMenu: {
            it: process.env.MAIN_MENU_IT,
            en: process.env.MAIN_MENU_EN,
          },
          ReservedMenu: {
            it: process.env.RESERVED_MENU_IT,
            en: process.env.RESERVED_MENU_EN,
          },
          FooterTop: {
            it: process.env.FOOTER_TOP_IT,
            en: process.env.FOOTER_TOP_EN,
          },
          FooterBottom: {
            it: process.env.FOOTER_BOTTOM_IT,
            en: process.env.FOOTER_BOTTOM_EN,
          },
        },
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
        withFieldTypes: true,
        update:
          process.env.GATSBY_UPDATE_SCHEMA_SNAPSHOT == 'false' ? false : true,
      },
    },
    {
      resolve: 'gatsby-plugin-react-i18next',
      options: {
        localeJsonNodeName: `allLocale`,
        localeJsonSourceName: `locale`,
        languages: ['it', 'en'],
        fallbackLanguage: 'it',
        generateDefaultLanguagePage: true,
      },
    },
  ],
};

export default config;
