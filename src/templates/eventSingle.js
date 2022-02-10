import React from 'react'

import { graphql } from 'gatsby'

import parse from 'html-react-parser'

import SeoHelmet from '../components/SeoHelmet.js'
import Image from '../components/Image/Image'
import Layout from '../partials/Layout'
import Cta from '../components/Cta/Cta'
import NewsletterBanner from '../components/NewsletterBanner/NewsletterBanner'

const Intro = ({ eyelet, title, data, locale }) => {
  return (
    <header className="block --block-intro intro --event">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <div className="intro__heading">
              {eyelet && <h4>{eyelet}</h4>}
              {title && <h1>{title}</h1>}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-inline-flex justify-content-center text-left">
            <div className="intro__data flex-wrap flex-md-nowrap">
              {data.eventDate && (
                <div>
                  <p className="--label">DATA</p>
                  <p>{new Date(data.eventDate).toLocaleDateString(locale, { year: 'numeric', month: '2-digit', day: '2-digit' })}</p>
                </div>
              )}
              {data.eventTimeStart && (
                <div>
                  <p className="--label">ORA</p>
                  <p>
                    dalle {data.eventTimeStart}
                    {`${data.eventTimeEnd ? ` alle ${data.eventTimeEnd}` : ''}`}
                  </p>
                </div>
              )}
              {data.eventVenue && (
                <div>
                  <p className="--label">LUOGO</p>
                  <p>{data.eventVenue}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

const eventSingle = ({ location, data }) => {
  const {
    date,
    title,
    locale,
    content,
    eventField,
    eventCommonFields,
    featuredImage,
    seo,
    postConfig: { bannerNewsletter },
  } = data.wpEvent

  const cta = eventCommonFields.cta

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
        <Intro
          eyelet={eventCommonFields.eyelet}
          title={title}
          data={eventField}
          locale={locale.id}
        />

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
                {content && <div className="wysiwyg">{parse(content)}</div>}
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
export default eventSingle

export const newsQuery = graphql`
  query eventSingle($id: String!) {
    wpEvent(id: { eq: $id }) {
      id
      nodeType
      slug
      date
      title
      content
      eventField {
        eventDate
        eventTimeStart
        eventTimeEnd
        eventVenue
      }
      eventCommonFields {
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
