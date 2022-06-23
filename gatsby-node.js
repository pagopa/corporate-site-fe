const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new FilterWarningsPlugin({
        exclude:
          /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
      }),
    ],
  })
}

const _ = require('lodash')
const path = require('path')
const { paginate } = require('gatsby-awesome-pagination')

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const projectSingleTemplate = path.resolve(`./src/templates/projectSingle.js`)
  const jobSingleTemplate = path.resolve(`./src/templates/jobSingle.js`)
  const pressSingleTemplate = path.resolve(`./src/templates/pressSingle.js`)
  const pressListTemplate = path.resolve(`./src/templates/pressList.js`)
  const newsEventsListTemplate = path.resolve(
    `./src/templates/newsEventsList.js`
  )
  const newsSingleTemplate = path.resolve(`./src/templates/newsSingle.js`)
  const initiativeSingleTemplate = path.resolve(
    `./src/templates/initiativeSingle.js`
  )
  const eventSingleTemplate = path.resolve(`./src/templates/eventSingle.js`)
  const announcementSingleTemplate = path.resolve(
    `./src/templates/announcementSingle.js`
  )
  const announcementListTemplate = path.resolve(
    `./src/templates/announcementList.js`
  )

  const newsletterListTemplate = path.resolve(
    `./src/templates/newsletterList.js`
  )
  const newsletterSingleTemplate = path.resolve(
    `./src/templates/newsletterSingle.js`
  )

  const baseData = `
    id
    slug
    uri
    locale {
      id
    }
  `

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
            ${baseData}
            postConfig {
              doNotBuild
            }
          }
        }
      }

      pages: allWpPage(
        filter: { template: { templateName: { eq: "Default" } } }
      ) {
        edges {
          node {
            ${baseData}
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
            ${baseData}
            postConfig {
              doNotBuild
            }
          }
        }
      }

      newsEventLists: allWpPage(
        filter: { template: { templateName: { eq: "News And Events" } } }
      ) {
        edges {
          node {
            ${baseData}
            postConfig {
              doNotBuild
            }
          }
        }
      }

      announcementsLists: allWpPage(
        filter: { template: { templateName: { eq: "Announcements" } } }
      ) {
        edges {
          node {
            ${baseData}
            postConfig {
              doNotBuild
            }
          }
        }
      }

      newslettersLists: allWpPage(
        filter: { template: { templateName: { eq: "Newsletters" } } }
      ) {
        edges {
          node {
            ${baseData}
            postConfig {
              doNotBuild
            }
          }
        }
      }

      projectSingles: allWpProject {
        edges {
          node {
            ${baseData}
          }
        }
      }

      jobSingles: allWpJobPosition {
        edges {
          node {
            ${baseData}
          }
        }
      }

      pressSingles: allWpPressReleases(sort: {fields: date, order: DESC}) {
        edges {
          node {
            ${baseData}
          }
        }
      }

      newsSingles: allWpPost(sort: {fields: date, order: DESC}) {
        edges {
          node {
            ${baseData}
          }
        }
      }

      initiativeSingles: allWpInitiative(sort: {fields: date, order: DESC}) {
        edges {
          node {
            ${baseData}
          }
        }
      }

      eventSingles: allWpEvent(sort: {fields: eventField___eventDate, order: DESC}) {
        edges {
          node {
            ${baseData}
          }
        }
      }

      announcementSingles: allWpInnovationAnnouncement(sort: {fields: date, order: DESC}) {
        edges {
          node {
            ${baseData}
          }
        }
      }

      newsletterSingles: allWpNewsletter(sort: {fields: date, order: DESC}) {
        edges {
          node {
            ${baseData}
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

  // press list

  const pressListNodes = result.data.pressLists.edges

  _.each(pressListNodes, ({ node: page }) => {
    const pressSingles = result.data.pressSingles.edges

    paginate({
      createPage,
      items: pressSingles,
      itemsPerPage: 12,
      pathPrefix: `/${page.locale.id}/${page.uri.replace(/\/$/, '')}`,
      component: pressListTemplate,
      context: {
        id: page.id,
        locale: page.locale.id,
      },
    })
  })

  // news / event list

  const newsEventListNodes = result.data.newsEventLists.edges

  _.each(newsEventListNodes, ({ node: page }) => {
    const news = result.data.newsSingles.edges,
      events = result.data.eventSingles.edges,
      posts = [...news, ...events]

    posts.sort((a, b) => {
      const aDate =
          a.node.nodeType === 'Event'
            ? a.node.eventField.eventDate
            : a.node.date,
        bDate =
          b.node.nodeType === 'Event'
            ? b.node.eventField.eventDate
            : b.node.date,
        aTime = new Date(aDate).getTime(),
        bTime = new Date(bDate).getTime()

      return bTime - aTime
    })

    paginate({
      createPage,
      items: posts,
      itemsPerPage: 12,
      pathPrefix: `/${page.locale.id}/${page.uri.replace(/\/$/, '')}`,
      component: newsEventsListTemplate,
      context: {
        id: page.id,
        locale: page.locale.id,
      },
    })
  })

  // innovation announcements list

  const announcementsListsNodes = result.data.announcementsLists.edges

  _.each(announcementsListsNodes, ({ node: page }) => {
    const announcementSingles = result.data.announcementSingles.edges

    paginate({
      createPage,
      items: announcementSingles,
      itemsPerPage: 12,
      pathPrefix: `/${page.locale.id}/${page.uri.replace(/\/$/, '')}`,
      component: announcementListTemplate,
      context: {
        id: page.id,
        locale: page.locale.id,
      },
    })
  })

  // newsletter list

  const newslettersListsNodes = result.data.newslettersLists.edges

  _.each(newslettersListsNodes, ({ node: page }) => {
    const newsletterSingles = result.data.newsletterSingles.edges

    paginate({
      createPage,
      items: newsletterSingles,
      itemsPerPage: 2,
      pathPrefix: `/${page.locale.id}/${page.uri.replace(/\/$/, '')}`,
      component: newsletterListTemplate,
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
    const projectDir =
      page.locale.id === 'it'
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

  const jobTranslations = translations.find(t => t.stringKey === 'job_cpt_slug')

  _.each(jobSingleNodes, ({ node: page }) => {
    const jobDir =
      page.locale.id === 'it'
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
    const pressReleasesDir =
      page.locale.id === 'it'
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

  // news

  const newsSingleNodes = result.data.newsSingles.edges

  const newsTranslations = translations.find(
    t => t.stringKey === 'newsevents_cpt_slug'
  )

  _.each(newsSingleNodes, ({ node: page }) => {
    const newsDir =
      page.locale.id === 'it'
        ? newsTranslations.itValue
        : newsTranslations.enValue

    createPage({
      path: `/${page.locale.id}/${newsDir}/${page.slug}`,
      component: newsSingleTemplate,
      context: {
        id: page.id,
        locale: page.locale.id,
      },
    })
  })

  // initiatives

  const initiativeSingleNodes = result.data.initiativeSingles.edges

  const initiativeTranslations = translations.find(
    t => t.stringKey === 'newsevents_cpt_slug'
  )

  _.each(initiativeSingleNodes, ({ node: page }) => {
    const initiativeDir =
      page.locale.id === 'it'
        ? initiativeTranslations.itValue
        : initiativeTranslations.enValue

    createPage({
      path: `/${page.locale.id}/${initiativeDir}/${page.slug}`,
      component: initiativeSingleTemplate,
      context: {
        id: page.id,
        locale: page.locale.id,
      },
    })
  })

  // events

  const eventSingleNodes = result.data.eventSingles.edges

  const eventsTranslations = translations.find(
    t => t.stringKey === 'newsevents_cpt_slug'
  )

  _.each(eventSingleNodes, ({ node: page }) => {
    const eventDir =
      page.locale.id === 'it'
        ? eventsTranslations.itValue
        : eventsTranslations.enValue

    createPage({
      path: `/${page.locale.id}/${eventDir}/${page.slug}`,
      component: eventSingleTemplate,
      context: {
        id: page.id,
        locale: page.locale.id,
      },
    })
  })

  // innovation announcements

  const announcementSingleNodes = result.data.announcementSingles.edges

  const announcementTranslations = translations.find(
    t => t.stringKey === 'announcement_cpt_slug'
  )

  _.each(announcementSingleNodes, ({ node: page }) => {
    const announcementDir =
      page.locale.id === 'it'
        ? announcementTranslations.itValue
        : announcementTranslations.enValue

    createPage({
      path: `/${page.locale.id}/${announcementDir}/${page.slug}`,
      component: announcementSingleTemplate,
      context: {
        id: page.id,
        locale: page.locale.id,
      },
    })
  })

  // newsletter

  const newsletterSingleNodes = result.data.newsletterSingles.edges

  const newsletterTranslations = translations.find(
    t => t.stringKey === 'newsletter_cpt_slug'
  )

  _.each(newsletterSingleNodes, ({ node: page }) => {
    const newsletterDir =
      page.locale.id === 'it'
        ? newsletterTranslations.itValue
        : newsletterTranslations.enValue

    createPage({
      path: `/${page.locale.id}/${newsletterDir}/${page.slug}`,
      component: newsletterSingleTemplate,
      context: {
        id: page.id,
        locale: page.locale.id,
      },
    })
  })
}
