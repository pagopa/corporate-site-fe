const _ = require("lodash")
const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const { paginate } = require("gatsby-awesome-pagination")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      allWpPage(filter: { template: { templateName: { eq: "Homepage" } } }) {
        edges {
          node {
            id
            slug
            locale {
              id
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    const homeTemplate = path.resolve(`./src/templates/homepage.js`)

    const homepages = result.data.allWpPage.edges

    _.each(homepages, ({ node: page }) => {
      createPage({
        // path: `/${page.slug}/`,
        path: `/${page.locale.id}/`,
        component: homeTemplate,
        context: {
          id: page.id,
          locale: page.locale.id,
        },
      })
    })
  })
}

// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage, deletePage } = actions
//   const { locale } = page.context
//   const { language, originalPath } = page.context.intl

//   deletePage(page)

//   const pathExceptions = ['/', '/dev-404-page/'];
//   const localeCheck = locale === language;
//   const pathCheck = pathExceptions.indexOf(originalPath) !== -1;

//   if (localeCheck || pathCheck) {
//     createPage({
//       ...page,
//       context: {
//         ...page.context,
//         locale: page.context.intl.language,
//       },
//     })
//   }
// }

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }
