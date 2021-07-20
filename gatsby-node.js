const _ = require('lodash')
const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const projectTemplate = path.resolve(`./src/templates/project.js`)

  const result = await graphql(`
    {
      themeSettings: wp(locales: { eq: "it" }) {
        options {
          globalData {
            translations {
              stringKey
              itValue
              enValue
            }
          }
        }
      }

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
      projectPages: allWpProject {
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
    reporter.panicOnBuild(`Something went horribly wrong!`, result.errors)
    return
  }

  // homepages

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

  // pages

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

  // projects

  const projectNodes = result.data.projectPages.edges
  const { translations } = result.data.themeSettings.options.globalData

  const projectTranslations = translations.find(
    t => t.stringKey === 'project_cpt_slug'
  )

  _.each(projectNodes, ({ node: page }) => {
    const projectDir = page.locale.id === 'it'
        ? projectTranslations.itValue
        : projectTranslations.enValue

    createPage({
      path: `/${page.locale.id}/${projectDir}/${page.slug}`,
      component: projectTemplate,
      context: {
        id: page.id,
        locale: page.locale.id,
      },
    })
  })
}
