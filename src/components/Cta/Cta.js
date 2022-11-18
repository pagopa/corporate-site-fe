import React, { useContext } from 'react'

import { Link } from 'gatsby'

import classNames from 'classnames'

import { LocaleContext } from 'contexts/LocaleContext.js'
import { useSiteMetadata } from 'hooks/useSiteMetadata'
import { useWpOptionsPage } from 'hooks/useWpOptionsPage'
import { convertCPTDir } from 'helpers/convertCPTDir'

import './Cta.sass'

const urlParser = data => {
  const { url, locale, type, translations, siteUrl, cmsUrl } = data

  const absUrlCheck = new RegExp('^(?:[a-z]+:)?//', 'i'),
    isAbsolute = absUrlCheck.test(url)

  // CPTs slug translations

  const projectTranslations = translations.find(
      t => t.stringKey === 'project_cpt_slug'
    ),
    projectDir = projectTranslations[`${locale}Value`],
    pressReleaseTranslations = translations.find(
      t => t.stringKey === 'pressrelease_cpt_slug'
    ),
    pressReleaseDir = pressReleaseTranslations[`${locale}Value`],
    announcementTranslations = translations.find(
      t => t.stringKey === 'announcement_cpt_slug'
    ),
    announcementDir = announcementTranslations[`${locale}Value`],
    newsTranslations = translations.find(t => t.stringKey === 'news_cpt_slug'),
    newsDir = newsTranslations[`${locale}Value`],
    eventTranslations = translations.find(
      t => t.stringKey === 'event_cpt_slug'
    ),
    eventDir = eventTranslations[`${locale}Value`],
    newsletterTranslations = translations.find(
      t => t.stringKey === 'newsletter_cpt_slug'
    ),
    newsletterDir = newsletterTranslations[`${locale}Value`]

  const urlObject = isAbsolute ? new URL(url) : false

  if (urlObject) {
    // complete url
    if (
      urlObject.origin === siteUrl.replace(/\/$/, '') ||
      urlObject.origin === cmsUrl.replace(/\/$/, '')
    ) {
      // url inside domain: get path
      const cptParsedUrl = convertCPTDir(
        urlObject.pathname.match(/[^/]+/g),
        translations,
        locale
      )
      return cptParsedUrl
    } else {
      // url outside domain: get url
      return url
    }
  } else {
    if (type === 'Project') {
      return `/${locale}/${projectDir}/${url}/`
    }
    if (type === 'Post') {
      return `/${locale}/${newsDir}/${url}/`
    }
    if (type === 'Event') {
      return `/${locale}/${eventDir}/${url}/`
    }
    if (type === 'PressReleases') {
      return `/${locale}/${pressReleaseDir}/${url}/`
    }
    if (type === 'InnovationAnnouncement') {
      return `/${locale}/${announcementDir}/${url}/`
    }
    if (type === 'Newsletter') {
      return `/${locale}/${newsletterDir}/${url}/`
    }
  }

  return url
}

const Cta = ({
  label,
  url,
  blank = false,
  variant = false,
  type,
  className,
}) => {
  const locale = useContext(LocaleContext)

  const { siteUrl, cmsUrl } = useSiteMetadata()
  const { translations } = useWpOptionsPage()

  const params = { url, locale, type, translations, siteUrl, cmsUrl }

  const theHref = urlParser(params),
    isBlank = blank

  if (!url) {
    return (
      <>
        <span
          className={classNames(
            'cta',
            variant ? ` --${variant}` : '',
            className
          )}
        >
          <span>{label}</span>
        </span>
      </>
    )
  }

  return (
    <>
      {isBlank && theHref ? (
        <a
          href={theHref}
          target="_blank"
          className={classNames(
            'cta',
            variant ? ` --${variant}` : '',
            className
          )}
          rel="noopene noreferrer"
        >
          <span>{label}</span>
        </a>
      ) : (
        <Link
          to={theHref}
          className={classNames(
            'cta',
            variant ? ` --${variant}` : '',
            className
          )}
        >
          <span>{label}</span>
        </Link>
      )}
    </>
  )
}

export default Cta
