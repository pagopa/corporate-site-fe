import React from 'react'

import { graphql } from 'gatsby'

import parse from 'html-react-parser'

import { useMenu } from '../hooks/useMenu'

import SeoHelmet from '../components/SeoHelmet.js'
import Layout from '../partials/Layout'
import Cta from '../components/Cta/Cta'

const IntroMenu = ({ name, currentSlug }) => {
  const allMenus = useMenu()
  const introMenuItems = allMenus.filter(menu => menu.node.name === name)[0].node.menuItems

  return (
    <>
      <nav className="intro-menu">
        <ul>
          {introMenuItems.nodes.map((item, key) => {
            const itemSlug = (item.path.match(/[^/]+/g)).slice(-1)[0]
            return (
              <li key={key} className={itemSlug === currentSlug ? 'is-current' : ''}>
                <Cta label={item.label} url={item.url} variant="link-simple" />
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}

const Intro = ({ eyelet, title, location }) => {

  const introMenu = 'Innovation'

  const locationFragments = location.pathname.split('/').filter(el => el !== "")

  locationFragments.reverse()
  
  const currentSlug = locationFragments[1]

  console.log(currentSlug)

  return (
    <header className="block --block-intro intro">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <div className="intro__heading">
              <h4>{eyelet}</h4>
              {introMenu && <IntroMenu name={introMenu} currentSlug={currentSlug} />}
              <h1>{title}</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const announcementPage = ({ location, data }) => {
  const { date, title, locale, content, featuredImage, seo, announcementFields } =
    data.wpInnovationAnnouncement

  const cta = announcementFields?.cta

  const currentLocale = locale.id

  const pageProps = {
    title,
    featuredImage
  }

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' },
    theDate = new Date(date).toLocaleDateString(currentLocale, dateOptions)

  return (
    <Layout locale={currentLocale} location={location}>

      <SeoHelmet yoast={seo} locale={currentLocale} data={pageProps} />

      <article className="press-release-article">
        <Intro eyelet={announcementFields.eyelet} title={title} location={location} />
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
export default announcementPage

export const announcementQuery = graphql`
  query announcement($id: String!) {
    wpInnovationAnnouncement(id: { eq: $id }) {
      id
      date
      title
      slug
      link
      content
      locale {
        id
      }
      nodeType

      featuredImage {
        node {
          altText
          localFile {
            extension
            publicURL
            childImageSharp {
              fixed(fit: COVER, quality: 90, width: 1200, height: 627) {
                src
              }
              gatsbyImageData(
                width: 1280
              )
            }
          }
        }
      }

      seo {
        opengraphTitle
        opengraphSiteName
        opengraphDescription
        opengraphImage {
          localFile {
            publicURL
            childImageSharp {
              fixed(fit: COVER, quality: 90, width: 1200, height: 627) {
                src
              }
            }
          }
        }
        opengraphType
        title
      }

      announcementFields {
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
