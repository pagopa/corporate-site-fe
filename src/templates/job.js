import React from 'react'

import { graphql } from 'gatsby'
import parse from 'html-react-parser'

import { useWpOptionsPage } from '../hooks/useWpOptionsPage'

import Layout from '../partials/Layout'

const JobIntro = ({ intro, openDate, closeDate, locale }) => {
  const { eyelet, title, text } = intro

  const startDate = new Date(openDate).toLocaleDateString(locale.id)
  const endDate = new Date(closeDate).toLocaleDateString(locale.id)
  
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
          <div className="col-12 d-flex justify-content-center text-left">
            <div className="job__dates">
              <div>
                <p className="--label">DATA APERTURA</p>
                <p>{startDate}</p>
              </div>
              <div>
                <p className="--label">DATA CHIUSURA</p>
                <p>{endDate}</p>
              </div>
            </div>
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

const JobPage = ({ data }) => {
  const { slug, locale, jobPositionFields } = data.wpJobPosition

  const { openDate, closeDate, embedId, intro, textBlocks } = jobPositionFields

  const { jobIframe } = useWpOptionsPage().various

  const hasTextBlocks = textBlocks ? true : false
  const hasEmbedForm = embedId ? true : false

  const iframeCode = hasEmbedForm
    ? `${jobIframe.replace('__JOBID__', embedId)}`
    : false

  const currentLocale = locale.id,
    currentSlug = slug

  return (
    <Layout locale={currentLocale} slug={currentSlug}>
      <article className="job">
        <JobIntro intro={intro} openDate={openDate} closeDate={closeDate} locale={locale} />

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
      title
      nodeType
      locale {
        id
      }
      jobPositionFields {
        openDate
        isNew
        embedId
        closeDate
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
