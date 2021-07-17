const _ = require('lodash')
const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve(`./src/templates/page.js`)

  const result = await graphql(`
    {
      homePages: allWpPage(
        filter: { template: { templateName: { eq: "Homepage" } } }
      ) {
        edges {
          node {
            id
            locale {
              id
            }
          }
        }
      }
      defaultPages: allWpPage(
        filter: { template: { templateName: { eq: "Default" } } }
      ) {
        edges {
          node {
            id
            slug
            uri
            locale {
              id
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Something went horrible wrong!`, result.errors)
    return
  }

  const homepageNodes = result.data.homePages.edges

  _.each(homepageNodes, ({ node: page }) => {
    createPage({
      path: `/${page.locale.id}/`,
      component: pageTemplate,
      context: {
        id: page.id,
        locale: page.locale.id,
      },
    })
  })

  const defaultNodes = result.data.defaultPages.edges

  _.each(defaultNodes, ({ node: page }) => {
    createPage({
      path: `/${page.locale.id}/${page.uri}`,
      component: pageTemplate,
      context: {
        id: page.id,
        locale: page.locale.id,
      },
    })
  })
}
