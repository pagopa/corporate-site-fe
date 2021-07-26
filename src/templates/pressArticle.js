import React from 'react'

import { graphql } from 'gatsby'

import parse from 'html-react-parser'

import Layout from '../partials/Layout'
import Cta from '../components/Cta/Cta'

const Intro = ({ eyelet, title }) => {
  return (
    <header className="block --block-intro intro">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <div className="intro__heading">
              <h4>{eyelet}</h4>
              <h1>{title}</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const pressArticlePage = ({ data }) => {
  const { date, title, slug, locale, content, pressReleasesFields } =
    data.wpPressReleases

  const cta = pressReleasesFields.cta

  console.log(cta)

  const currentLocale = locale.id,
    currentSlug = slug

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' },
    theDate = new Date(date).toLocaleDateString(currentLocale, dateOptions)

  return (
    <Layout locale={currentLocale} slug={currentSlug}>
      <article className="press-release-article">
        <Intro eyelet={pressReleasesFields.eyelet} title={title} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <h4>{theDate}</h4>
              <div className="wysiwyg">{parse(content)}</div>
            </div>
          </div>
        </div>
      </article>
      <div className="press-release-bottom-cta">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              {cta && <Cta
                label={cta.title}
                blank={cta.target}
                url={cta.url}
              />}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default pressArticlePage

export const pressReleaseQuery = graphql`
  query pressRelease($id: String!) {
    wpPressReleases(id: { eq: $id }) {
      id
      date
      title
      slug
      content
      locale {
        id
      }
      nodeType
      pressReleasesFields {
        eyelet
        cta {
          target
          title
          url
        }
      }
    }
  }
`
