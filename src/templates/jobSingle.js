import React from 'react'

import { graphql } from 'gatsby'
import parse from 'html-react-parser'

import { useWpOptionsPage } from '../hooks/useWpOptionsPage'

import Cta from '../components/Cta/Cta'

import Layout from '../partials/Layout'
import SeoHelmet from '../components/SeoHelmet'

const dateFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }

const JobIntro = ({ data, locale }) => {
  const { intro, openDate, closeDate, openPositions, hiredPositions, selectedPeople } = data
  const { eyelet, title, text } = intro

  const startDate = openDate ? new Date(openDate).toLocaleDateString(locale.id, dateFormatOptions) : null
  const endDate = closeDate ? new Date(closeDate).toLocaleDateString(locale.id, dateFormatOptions) : null

  const hasPositionsData = openPositions || hiredPositions ? true : false
  const hasSelectionData = selectedPeople ? true : false
  
  return (
    <header className="block --block-intro intro">
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
          <div className="col-12 d-flex flex-column align-items-center justify-content-center text-left">

            <div className="job__data">
              {startDate && <div>
                <p className="--label">DATA APERTURA</p>
                <p>{startDate}</p>
              </div>}
              {endDate && <div>
                <p className="--label">DATA CHIUSURA</p>
                <p>{endDate}</p>
              </div>}
            </div>

            {hasPositionsData && (
              <div className="job__data">
                {openPositions && <div>
                  <p className="--label">POSIZIONI RICERCATE</p>
                  <p>{openPositions}</p>
                </div>}
                {hiredPositions && <div>
                  <p className="--label">POSIZIONI ASSUNTE</p>
                  <p>{hiredPositions}</p>
                </div>}
              </div>
            )}

            {hasSelectionData && (
              <div className="job__data --auto-w">
                <div>
                  <p className="--label">PERSONE SELEZIONATE</p>
                  <p>{selectedPeople}</p>
                </div>
              </div>
            )}

          </div>
        </div>

        {text && (
          <div className="row job__intro">
            <div
              className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2"
            >
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

const JobPage = ({ location, data }) => {
  const { title, locale, jobPositionFields, featuredImage, seo } = data.wpJobPosition

  const { embedId, textBlocks, applicationLink } = jobPositionFields

  const { jobIframe } = useWpOptionsPage().various

  const hasTextBlocks = textBlocks ? true : false
  const hasEmbedForm = embedId ? true : false

  const iframeCode = hasEmbedForm
    ? `${jobIframe.replace('__JOBID__', embedId)}`
    : false

  const currentLocale = locale.id

  const pageProps = {
    title,
    featuredImage
  }

  return (
  
    <Layout locale={currentLocale} location={location}>

      <SeoHelmet yoast={seo} locale={currentLocale} data={pageProps} />

      <article className="job">
        <JobIntro data={jobPositionFields} locale={locale} />

        {hasTextBlocks && textBlocks.map((tb, key) => {
          const { title, description } = tb
          return (
            <section className="job__section" key={key}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                    <h4>{title}</h4>
                    <div className="wysiwyg">
                      {parse(description)}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )
        })}
        
        {applicationLink && (
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                <Cta url={applicationLink.url} label={applicationLink.title} blank={applicationLink.target} />
              </div>
            </div>
          </div>
        )}

        {hasEmbedForm && (
          <section className="job__form">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                  <div dangerouslySetInnerHTML={{ __html: iframeCode }}/>
                </div>
              </div>
            </div>
          </section>
        )}
      </article>
    </Layout>
  )
}
export default JobPage

export const jobQuery = graphql`
  query job($id: String!) {
    wpJobPosition(id: { eq: $id }) {
      id
      slug
      link
      title
      nodeType
      locale {
        id
      }

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
      
      jobPositionFields {
        isNew
        openDate
        closeDate
        openPositions
        hiredPositions
        selectedPeople
        
        embedId

        applicationLink {
          target
          title
          url
        }
        intro {
          eyelet
          text
          title
        }
        textBlocks {
          description
          title
        }
      }

    }
  }
`
