import React, { useContext } from 'react'

import { graphql } from 'gatsby'

import { LocaleContext } from '../contexts/LocaleContext.js'

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

const AllPressReleases = ({ data }) => {
  const locale = useContext(LocaleContext)

  const { edges: allPressReleases } = data

  const currentLocalePress = allPressReleases.filter(j => j.node.locale.id === locale)

  return (
    <>
      {currentLocalePress.map((pr, key) => {
        const { date, title, slug, content, locale, nodeType } = pr.node

        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' },
              theDate = new Date(date).toLocaleDateString(locale.id, dateOptions)

        const text = content.replace(/(<([^>]+)>)/ig, '')
        const abstract = text.split(" ").splice(0,36).join(" ")
        
        return (
          <article className="press-release" key={key}>
            <div>
              <h4>{theDate}</h4>
              <h3 className="--light">{title}</h3>
              <div className="wysiwyg">
                <p>{abstract}...</p>
              </div>
            </div>

            <Cta url={slug} label="Leggi" type={nodeType}/>
          </article>
        )
      })}
    </>
  )
  
}

const PressPage = ({ data }) => {
  const { title, slug, locale  } = data.page

  const pressReleasesCollection = data.allPressReleases


  const currentLocale = locale.id,
    currentSlug = slug

  return (
    <Layout locale={currentLocale} slug={currentSlug}>
      <section className="press-release-list">
        
        <Intro eyelet="Media" title={title} />

        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <AllPressReleases data={pressReleasesCollection} />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
export default PressPage

export const pressQuery = graphql`
  query press($id: String!) {
    page: wpPage(id: { eq: $id }) {
      id
      date
      title
      slug
      featuredImage {
        node {
          altText
          localFile {
            extension
            publicURL
            childImageSharp {
              gatsbyImageData(
                width: 1280
              )
            }
          }
        }
      }
      locale {
        id
      }
      nodeType

      seo {
        opengraphTitle
        opengraphSiteName
        opengraphDescription
        opengraphImage {
          localFile {
            publicURL
          }
        }
        opengraphType
        title
        twitterDescription
        twitterTitle
      }
    }
    allPressReleases: allWpPressReleases(sort: {fields: date, order: DESC}) {
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
