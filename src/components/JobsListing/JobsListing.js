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

import Cta from '../Cta/Cta.js'

import './JobsListing.sass'


const dateFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }

const JobsList = () => {
  const { translations } = useWpOptionsPage()
  const locale = useContext(LocaleContext)

  const jobs = useJobPositions()

  const jobTranslations = translations.find(t => t.stringKey === 'job_cpt_slug')
  const currentLocaleJobs = jobs.filter(j => j.node.locale.id === locale)

  const today = Date.now() - 60 * 60 * 24 * 1000 // removed 24 hours to include entire closing day validity of post
  const activeListing = currentLocaleJobs.filter(j => !j.node.jobPositionFields.closeDate || Date.parse(j.node.jobPositionFields.closeDate) >= today)
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

          const startDate = openDate ? new Date(openDate).toLocaleDateString(locale.id, dateFormatOptions) : null
          const endDate = closeDate ? new Date(closeDate).toLocaleDateString(locale.id, dateFormatOptions) : null

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
                  {startDate && `Data di apertura: ${startDate}`}
                  {endDate && ` - Data di chiusura: ${endDate}`}
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

                  const startDate = new Date(openDate).toLocaleDateString(locale.id, dateFormatOptions)
                  const endDate = new Date(closeDate).toLocaleDateString(locale.id, dateFormatOptions)

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

const LinksAttachments = ({ data }) => {

  const { title, links } = data

  return (
    <div className="jobs-listing__links-attachment">
      {title && <h4>{title}</h4>}
      <ul>
        {links && links.map(({ usefulLink, usefulAttachment }, key) => {
          const linkObj = {
            title: usefulLink ? usefulLink.title : usefulAttachment ? usefulAttachment.title : false,
            url: usefulLink ? usefulLink.url : usefulAttachment ? usefulAttachment.localFile.publicURL : false,
            blank: usefulLink ? usefulLink.target : usefulAttachment ? true : false
          }

          return (
            <li key={key}>
              {linkObj.url && <Cta
                label={linkObj.title}
                url={linkObj.url}
                blank={linkObj.blank}
                variant="link"
              />}
            </li>
          )
        })}
      </ul>
    </div>
  )

}

const JobsListing = ({ data }) => {
  const { eyelet, title, text, commonFeatures, privacyDisclaimer, linkAttachments } = data

  const { jobsTitle, jobsLinks } = linkAttachments

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
            
            {jobsLinks && <LinksAttachments data={{
              title: jobsTitle,
              links: jobsLinks
            }} />}
            
            <JobsList />
          </div>
        </div>
      </div>
    </section>
  )
}

export default JobsListing
