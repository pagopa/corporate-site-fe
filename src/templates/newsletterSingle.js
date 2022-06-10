import React from 'react'

import { graphql } from 'gatsby'

import parse from 'html-react-parser'

import SeoHelmet from '../components/SeoHelmet.js'
import Image from '../components/Image/Image'
import Layout from '../partials/Layout'
import Cta from '../components/Cta/Cta'
import NewsletterBanner from '../components/NewsletterBanner/NewsletterBanner'
import { Helmet } from 'react-helmet'

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

const newsletterSingle = ({ location, data }) => {
  const {
    date,
    title,
    locale,
    content,
    newsletterCommonFields,
    featuredImage,
    seo,
    postConfig: { bannerNewsletter },
  } = data.wpNewsletter

  const cta = newsletterCommonFields.cta

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

      <Helmet>
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            "headline": "${title?.replace(/(<([^>]+)>)/gi, '')}",
            "image": "${featuredImage?.node.localFile.childImageSharp.fixed.src}",
            "datePublished": "${date}",
            "dateModified": "${date}",
            "publisher": {
              "@type": "Organization",
              "name": "PagoPA S.p.A.",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.pagopa.it/pagopa.svg"
              }
            }
          }`}
        </script>
      </Helmet>

      <article className="post-article">
        <Intro eyelet={newsletterCommonFields.eyelet} title={title} />

        <div className="post-article__body">
          <div className="container-fluid">
            {featuredImage && (
              <figure className="post-article__visual">
                <div className="row">
                  <div className="col-12 col-lg-10 offset-lg-1 d-flex align-items-center justify-content-center">
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
export default newsletterSingle

export const newsQuery = graphql`
  query newsletterSingle($id: String!) {
    wpNewsletter(id: { eq: $id }) {
      id
      nodeType
      slug
      date
      title
      content
      newsletterCommonFields {
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
              fixed {
                src
              }
              gatsbyImageData(
                layout: CONSTRAINED
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
