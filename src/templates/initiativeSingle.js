import React from 'react'

import { graphql } from 'gatsby'

import parse from 'html-react-parser'

import SeoHelmet from '../components/SeoHelmet.js'
import Image from '../components/Image/Image'
import Layout from '../partials/Layout'
import Cta from '../components/Cta/Cta'
import NewsletterBanner from '../components/NewsletterBanner/NewsletterBanner'

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

const initiativeSingle = ({ location, data }) => {
  const {
    date,
    title,
    locale,
    content,
    initiativeCommonFields,
    featuredImage,
    seo,
    postConfig: { bannerNewsletter },
  } = data.wpInitiative

  const cta = initiativeCommonFields.cta

  const currentLocale = locale.id

  const pageProps = {
    title,
    featuredImage,
  }

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' },
    theDate = new Date(date).toLocaleDateString(currentLocale, dateOptions)

  return (
    <Layout locale={currentLocale} location={location}>
      <SeoHelmet yoast={seo} locale={currentLocale} data={pageProps} />

      <article className="post-article">
        <Intro eyelet={initiativeCommonFields.eyelet} title={title} />

        <div className="post-article__body">
          <div className="container-fluid">
            {featuredImage && (
              <figure className="post-article__visual">
                <div className="row">
                  <div className="col-12 col-lg-10 offset-lg-1">
                    <Image
                      image={featuredImage.node.localFile}
                      title={featuredImage.node.altText}
                    />
                  </div>
                </div>
              </figure>
            )}

            <div className="row">
              <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                <h4>{theDate}</h4>
                <div className="wysiwyg">{parse(content)}</div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className="post-bottom-cta">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              {cta && (
                <Cta label={cta.title} blank={cta.target} url={cta.url} />
              )}
            </div>
          </div>
        </div>
      </div>

      {bannerNewsletter && <NewsletterBanner />}
    </Layout>
  )
}
export default initiativeSingle

export const initiativeQuery = graphql`
  query initiativeSingle($id: String!) {
    wpInitiative(id: { eq: $id }) {
      id
      nodeType
      slug
      date
      title
      content
      initiativeCommonFields {
        eyelet
        cta {
          target
          title
          url
        }
      }
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                layout: FULL_WIDTH
                aspectRatio: 1.9
                width: 1280
                height: 680
                transformOptions: { cropFocus: ATTENTION }
              )
            }
          }
        }
      }
      locale {
        id
      }

      postConfig {
        bannerNewsletter
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
    }
  }
`
