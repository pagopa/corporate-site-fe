require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const languages = require('./src/data/languages')

module.exports = {
  siteMetadata: {
    title: `PagoPA`,
    description: `PagoPA S.p.A. è una società pubblica ad alto livello specialistico, che ha la mission di diffondere i servizi pubblici digitali attraverso lo sviluppo di progetti innovativi e la gestione di infrastrutture tecnologiche strategiche per accompagnare la modernizzazione della Pubblica Amministrazione e del Paese.`,
    author: ``,
    siteUrl: process.env.FRONTEND_BASE_URL,
    cmsUrl: process.env.BACKEND_BASE_URL,
    languages: languages.keys,
    defaultLanguage: languages.default,
  },
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `${process.env.BACKEND_BASE_URL}/wp/index.php?graphql`,
        schema: {
          perPage: 20, // default 100
          requestConcurrency: 2, // default 15
          previewRequestConcurrency: 2, // default 5
        }
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        additionalData: `@import "${__dirname}/src/sass/vars"`,
        sassOptions: {
          indentedSyntax: true,
          includePaths: ['node_modules/bootstrap/scss'],
        },
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: process.env.FRONTEND_BASE_URL,
        sitemap: `${process.env.FRONTEND_BASE_URL}/sitemap/sitemap-index.xml`,
        policy: [
          { userAgent: '*', disallow: '/' },
          { userAgent: 'SemrushBot-SA', allow: '/' }
        ],
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: process.env.FRONTEND_BASE_URL,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ['G-XNW0W43V93'],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 60 * 60 * 24 * 28 * 6,
        },
        pluginConfig: {
          head: false,
          respectDNT: true,
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          placeholder: `blurred`,
          quality: 90,
          tracedSVGOptions: {
            color: '#ebfdff',
          },
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-inline-svg`,
    {
      resolve: `gatsby-plugin-sitemap`
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `pagopa`,
        short_name: `pagopa`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#00a1b0`,
        display: `minimal-ui`,
        icon: `${__dirname}/src/images/favicon.svg`,
      },
    },

  ],
}
