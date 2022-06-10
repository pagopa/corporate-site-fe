import React, { useContext } from 'react'

import { graphql } from 'gatsby'

import { LocaleContext } from '../contexts/LocaleContext.js'

import SeoHelmet from '../components/SeoHelmet.js'
import Layout from '../partials/Layout'
import Block from '../components/Block/Block'
import NewsletterBanner from '../components/NewsletterBanner/NewsletterBanner'
import Pagination from '../components/Pagination/Pagination'
import Cta from '../components/Cta/Cta'

const PressReleases = ({ data }) => {
  const locale = useContext(LocaleContext)

  const { edges: allPressReleases } = data

  const currentLocalePress = allPressReleases.filter(
    j => j.node.locale.id === locale
  )

  return (
    <>
      {currentLocalePress.map((pr, key) => {
        const { date, title, slug, content, locale, nodeType } = pr.node

        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' },
          theDate = new Date(date).toLocaleDateString(locale.id, dateOptions)

        const text = content.replace(/(<([^>]+)>)/gi, '')
        const abstract = text.split(' ').splice(0, 36).join(' ')

        return (
          <article className="press-release" key={key}>
            <div>
              <h4>{theDate}</h4>
              <h3 className="--light">{title}</h3>
              <div className="wysiwyg">
                <p>{abstract}...</p>
              </div>
            </div>

            <Cta url={slug} label="Leggi" type={nodeType} />
          </article>
        )
      })}
    </>
  )
}

const PressPage = ({ location, data, pageContext }) => {
  const {
      title,
      slug,
      locale,
      featuredImage,
      seo,
      flexibleContent,
      nodeType,
      uri,
      postConfig: { bannerNewsletter }
    } = data.page,
    blocks = flexibleContent.body.blocks

  const pressReleasesCollection = data.allPressReleases

  const currentLocale = locale.id,
    currentSlug = slug

  const pageProps = {
    title,
    featuredImage,
    currentSlug,
  }

  return (
    <Layout locale={currentLocale} location={location}>
      <SeoHelmet yoast={seo} locale={currentLocale} data={pageProps} />

      {blocks &&
        blocks.map((block, key) => {
          return (
            <Block data={block} key={key} type={nodeType} {...pageProps} />
          )
        })}

      <section className="press-release-list">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <PressReleases data={pressReleasesCollection} />
              <Pagination
                context={pageContext}
                baseUri={uri.replace(/\/$/, '')}
              />
            </div>
          </div>
        </div>
      </section>

      {bannerNewsletter && <NewsletterBanner />}
    </Layout>
  )
}
export default PressPage

export const pressQuery = graphql`
  query press($id: String!, $skip: Int!, $limit: Int!) {
    page: wpPage(id: { eq: $id }) {
      ...PageBaseData

      ...PageFeaturedImage

      ...PageSeo

      ...PageFlexibleContent

    }
    allPressReleases: allWpPressReleases(
      sort: { fields: date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      edges {
        node {
          date
          title
          slug
          content
          locale {
            id
          }
          nodeType
        }
      }
    }
  }
`
