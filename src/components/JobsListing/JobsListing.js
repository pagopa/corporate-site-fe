import React, { useContext } from 'react'

import parse from 'html-react-parser'

import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'

import { Link } from 'gatsby'

import { LocaleContext } from '../../contexts/LocaleContext.js'
import { useWpOptionsPage } from '../../hooks/useWpOptionsPage'
import { useJobPositions } from '../../hooks/useJobPositions.js'

import './JobsListing.sass'

const JobsList = () => {
  const { translations } = useWpOptionsPage()
  const locale = useContext(LocaleContext)

  const jobs = useJobPositions()

  const jobTranslations = translations.find(t => t.stringKey === 'job_cpt_slug')
  const currentLocaleJobs = jobs.filter(j => j.node.locale.id === locale)

  const today = Date.now()
  const activeListing = currentLocaleJobs.filter(j => Date.parse(j.node.jobPositionFields.closeDate) >= today)
  const pastListing = currentLocaleJobs.filter(j => Date.parse(j.node.jobPositionFields.closeDate) < today)

  return (
    <>
      <div className="jobs-listing__list">
        {activeListing.map((job, key) => {
          const {
            slug,
            locale,
            jobPositionFields: { isNew, openDate, closeDate },
            title,
          } = job.node

          const startDate = new Date(openDate).toLocaleDateString(locale.id)
          const endDate = new Date(closeDate).toLocaleDateString(locale.id)

          const jobDir =
            locale.id === 'it'
              ? jobTranslations.itValue
              : jobTranslations.enValue

          const path = `/${locale.id}/${jobDir}/${slug}`

          return (
            <Link to={path} key={key}>
              <article className="job-entry">
                <h4 className="--primary job-entry__title">
                  {title}
                  {isNew && <span>NEW</span>}
                </h4>
                <p className="job-entry__timeframe">
                  Data di apertura: {startDate} - Data di chiusura: {endDate}
                </p>
              </article>
            </Link>
          )
        })}
      </div>

      <div className="jobs-listing__past">
        <Accordion allowZeroExpanded>
          <AccordionItem className="accordion-entry">
            <AccordionItemHeading className="accordion-entry__header">
              <AccordionItemButton className="accordion-entry__button">
                <h3 className="mb-0">Posizioni chiuse</h3>
              </AccordionItemButton>
            </AccordionItemHeading>

            <AccordionItemPanel className="accordion-entry__content">
              <div>
                {pastListing.map((job, key) => {
                  const {
                    slug,
                    locale,
                    jobPositionFields: { openDate, closeDate },
                    title,
                  } = job.node

                  const startDate = new Date(openDate).toLocaleDateString(locale.id)
                  const endDate = new Date(closeDate).toLocaleDateString(locale.id)

                  const jobDir =
                    locale.id === 'it'
                      ? jobTranslations.itValue
                      : jobTranslations.enValue

                  const path = `/${locale.id}/${jobDir}/${slug}`

                  return (
                    <Link to={path} key={key}>
                      <article className="job-entry">
                        <h4 className="--primary job-entry__title">
                          {title}
                        </h4>
                        <p className="job-entry__timeframe">
                          Data di apertura: {startDate} - Data di chiusura: {endDate}
                        </p>
                      </article>
                    </Link>
                  )
                })}
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  )
}

const JobsListing = ({ data }) => {
  const { eyelet, title, text, commonFeatures, privacyDisclaimer } = data

  const hasCommonFeatures = commonFeatures.length

  return (
    <section className="block --block-jobs-listing jobs-listing">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            {eyelet && <h4>{eyelet}</h4>}
            {title ? <h1>{title}</h1> : false}
            {text && <div className="wysiwyg">{parse(text)}</div>}
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

            {privacyDisclaimer && (
              <div className="jobs-listing__disclaimer">
                <p>{parse(privacyDisclaimer)}</p>
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
