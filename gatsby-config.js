require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const languages = require("./src/data/languages")

module.exports = {
  siteMetadata: {
    title: `pagopa`,
    description: ``,
    author: ``,
    siteUrl: process.env.FRONTEND_BASE_URL,
    languages: languages.keys,
    defaultLanguage: languages.default,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-i18n`,
      options: {
        langKeyDefault: languages.default,
        useLangKeyLayout: false,
      },
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `${process.env.BACKEND_BASE_URL}/wp/graphql`,

        // schema: {
        //   perPage: 20, // currently set to 100
        //   requestConcurrency: 5, // currently set to 15
        //   previewRequestConcurrency: 2, // currently set to 5
        // }
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        additionalData: `@import "${__dirname}/src/sass/vars"`,
        sassOptions: {
          indentedSyntax: true,
          includePaths: ["node_modules/bootstrap/scss"],
        },
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: process.env.FRONTEND_BASE_URL,
        sitemap: `${process.env.FRONTEND_BASE_URL}/sitemap.xml`,
        policy: [{ userAgent: "*", disallow: "/" }],
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
          placeholder: `dominantColor`,
          quality: 90,
        },
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-inline-svg`,
    `gatsby-plugin-sitemap`,
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

    // temporary password
    {
      resolve: `@mkitio/gatsby-theme-password-protect`,
      options: {
        password: process.env.FRONTEND_PASSWORD,
      },
    },
  ],
}
