exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  if (stage === 'build-javascript') {
    const config = getConfig()
    const miniCssExtractPlugin = config.plugins.find(
      plugin => plugin.constructor.name === 'MiniCssExtractPlugin'
    )
    if (miniCssExtractPlugin) {
      miniCssExtractPlugin.options.ignoreOrder = true
    }
    actions.replaceWebpackConfig(config)
  }
}


const _ = require('lodash')
const path = require('path')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const projectSingleTemplate = path.resolve(`./src/templates/projectSingle.js`)
  const jobSingleTemplate = path.resolve(`./src/templates/jobSingle.js`)
  const pressSingleTemplate = path.resolve(`./src/templates/pressSingle.js`)
  const pressListTemplate = path.resolve(`./src/templates/pressList.js`)

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

      homepages: allWpPage(
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

      pages: allWpPage(
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
            postConfig {
              doNotBuild
            }
          }
        }
      }
      
      pressLists: allWpPage(
        filter: { template: { templateName: { eq: "Press Release" } } }
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

      projectSingles: allWpProject {
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

      jobSingles: allWpJobPosition {
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

      pressSingles: allWpPressReleases {
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
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Something went horribly wrong!`, result.errors)
    return
  }

  // homepages

  const homepageNodes = result.data.homepages.edges

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

  const pageNodes = result.data.pages.edges

  _.each(pageNodes, ({ node: page }) => {
    if (!page.postConfig.doNotBuild) {
      createPage({
        path: `/${page.locale.id}/${page.uri}`,
        component: pageTemplate,
        context: {
          id: page.id,
          locale: page.locale.id,
        },
      })
    }
  })

  // press

  const pressListNodes = result.data.pressLists.edges

  _.each(pressListNodes, ({ node: page }) => {
    createPage({
      path: `/${page.locale.id}/${page.uri}`,
      component: pressListTemplate,
      context: {
        id: page.id,
        locale: page.locale.id,
      },
    })
  })


  // cpts generation with directory slug replace

  const { translations } = result.data.themeSettings.options.globalData

  // projects

  const projectSingleNodes = result.data.projectSingles.edges

  const projectTranslations = translations.find(
    t => t.stringKey === 'project_cpt_slug'
  )

  _.each(projectSingleNodes, ({ node: page }) => {
    const projectDir = page.locale.id === 'it'
        ? projectTranslations.itValue
        : projectTranslations.enValue

    createPage({
      path: `/${page.locale.id}/${projectDir}/${page.slug}`,
      component: projectSingleTemplate,
      context: {
        id: page.id,
        locale: page.locale.id,
      },
    })
  })

  // job positions

  const jobSingleNodes = result.data.jobSingles.edges

  const jobTranslations = translations.find(
    t => t.stringKey === 'job_cpt_slug'
  )

  _.each(jobSingleNodes, ({ node: page }) => {
    const jobDir = page.locale.id === 'it'
        ? jobTranslations.itValue
        : jobTranslations.enValue

    createPage({
      path: `/${page.locale.id}/${jobDir}/${page.slug}`,
      component: jobSingleTemplate,
      context: {
        id: page.id,
        locale: page.locale.id,
      },
    })
  })

  // press releases

  const pressSingleNodes = result.data.pressSingles.edges

  const pressReleasesTranslations = translations.find(
    t => t.stringKey === 'pressrelease_cpt_slug'
  )

  _.each(pressSingleNodes, ({ node: page }) => {
    const pressReleasesDir = page.locale.id === 'it'
        ? pressReleasesTranslations.itValue
        : pressReleasesTranslations.enValue

    createPage({
      path: `/${page.locale.id}/${pressReleasesDir}/${page.slug}`,
      component: pressSingleTemplate,
      context: {
        id: page.id,
        locale: page.locale.id,
      },
    })
  })

}


