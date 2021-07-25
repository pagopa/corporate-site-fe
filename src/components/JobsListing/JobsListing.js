import React, { useContext } from 'react'

import { useStaticQuery, graphql, Link } from 'gatsby'

import { LocaleContext } from '../../contexts/LocaleContext.js'
import { useWpOptionsPage } from '../../hooks/useWpOptionsPage'

import './JobsListing.sass'

const JobsList = () => {
  const { translations } = useWpOptionsPage()
  const locale = useContext(LocaleContext)

  const data = useStaticQuery(graphql`
    query jobs {
      allWpJobPosition(sort: {fields: jobPositionFields___openDate, order: DESC}) {
        edges {
          node {
            slug
            nodeType
            locale {
              id
            }
            jobPositionFields {
              openDate
              isNew
              closeDate
            }
            title
          }
        }
      }
    }
  `),
  { edges: jobs } = data.allWpJobPosition

  const jobTranslations = translations.find(t => t.stringKey === 'job_cpt_slug')
  const currentLocaleJobs = jobs.filter(j => j.node.locale.id === locale)
  
  // const today = Date.now()
  // const activeListing = jobs.filter(j => Date.parse(j.node.jobPositionFields.closeDate) >= today)
  // const pastListing = jobs.filter(j => Date.parse(j.node.jobPositionFields.closeDate) < today)

  return (
    <>
      <div className="jobs-listing__list">
        {currentLocaleJobs.map((job, key) => {
          const { slug, locale, jobPositionFields: { isNew, openDate, closeDate }, title} = job.node

          const startDate = new Date(openDate).toLocaleDateString(locale.id)
          const endDate = new Date(closeDate).toLocaleDateString(locale.id)


          const jobDir = locale.id === 'it' ? jobTranslations.itValue : jobTranslations.enValue

          const path = `/${locale.id}/${jobDir}/${slug}`

          return (
            <Link to={path} key={key}>
              <article className="job-entry">
                <h4 className="--primary job-entry__title">
                  {title}{isNew && <span>NEW</span>}
                </h4>
                <p className="job-entry__timeframe">Data di apertura: {startDate} - Data di chiusura: {endDate}</p>
              </article>
            </Link>
          )
        })}
      </div>
    </>
  )
}

const JobsListing = ({ data }) => {
  const { eyelet, title, text, commonFeatures } = data

  const hasCommonFeatures = commonFeatures.length

  return (
    <section className="block --block-jobs-listing jobs-listing">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            {eyelet && <h4>{eyelet}</h4>}
            {title ? <h1>{title}</h1> : false}
            {text && (
              <div
                className="wysiwyg"
                dangerouslySetInnerHTML={{ __html: text }}
              />
            )}
            {hasCommonFeatures && (
              <div className="jobs-listing__common">
                {commonFeatures.map((cf, key) => {
                  const { featureTitle, featureText } = cf
                  return (
                    <div
                      className="row align-items-center mb-4 mb-xl-3"
                      key={key}
                    >
                      <div className="col-12 col-xl-4">
                        <h4 className="mb-0">{featureTitle}</h4>
                      </div>
                      <div className="col-12 col-xl-8">
                        <p className="mb-0">{featureText}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            <JobsList />
          </div>
        </div>
      </div>
    </section>
  )
}

export default JobsListing
