import React, { useContext } from 'react'

import { Link } from 'gatsby'

import { LocaleContext } from '../../contexts/LocaleContext.js'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'
import { useWpOptionsPage } from '../../hooks/useWpOptionsPage'
import { convertCPTDir } from '../../helpers/convertCPTDir'


import './Cta.sass'

const urlParser = data => {
  const { url, locale, type, translations, siteUrl, cmsUrl } = data

  const absUrlCheck = new RegExp('^(?:[a-z]+:)?//', 'i'),
    isAbsolute = absUrlCheck.test(url)
  
    // CPTs slug translations

  const projectTranslations = translations.find(t => t.stringKey === 'project_cpt_slug'),
        pressReleaseTranslations = translations.find(t => t.stringKey === 'pressrelease_cpt_slug'),
        projectDir = projectTranslations[`${locale}Value`],
        pressReleaseDir = pressReleaseTranslations[`${locale}Value`]


  const urlObject = isAbsolute ? new URL(url) : false

  if (urlObject) {
    // complete url
    if (urlObject.origin === siteUrl.replace(/\/$/, "") || urlObject.origin === cmsUrl.replace(/\/$/, "")) {
      // url inside domain: get path
      
      const cptParsedUrl = convertCPTDir(urlObject.pathname.match(/[^/]+/g), translations, locale)

      return cptParsedUrl

    } else {
      // url outside domain: get url
      return url
    }
  } else {
    if (type === 'Project') {
      return `/${locale}/${projectDir}/${url}/`
    }
    if (type === 'PressReleases') {
      return `/${locale}/${pressReleaseDir}/${url}/`
    }
  }


  return url
}


const Cta = ({ label, url, blank = false, variant = false, type }) => {


  const locale = useContext(LocaleContext)
  
  const { siteUrl, cmsUrl } = useSiteMetadata()
  const { translations } = useWpOptionsPage()

  const params = { url, locale, type, translations, siteUrl, cmsUrl }

  const theHref = urlParser(params),
        isBlank = blank

  return (
    <>
      {isBlank && theHref ? (
        <a
          href={theHref}
          target="_blank"
          className={`cta${variant ? ` --${variant}` : ''}`}
          rel="noopene noreferrer"
        >
          <span>{label}</span>
        </a>
      ) : (
        <Link to={theHref} className={`cta${variant ? ` --${variant}` : ''}`}>
          <span>{label}</span>
        </Link>
      )}
    </>
  )
}

export default Cta
