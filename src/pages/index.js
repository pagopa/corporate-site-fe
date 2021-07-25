import { useEffect } from 'react'

import { navigate } from 'gatsby'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

const getRedirectLanguage = (defaultLanguage, languages) => {
  let targetLanguage = defaultLanguage

  if (typeof navigator === `undefined`) return targetLanguage

  const userLanguage =
    navigator && navigator.language && navigator.language.split('-')[0]

  if (!userLanguage) return targetLanguage

  languages.forEach(language => {
    if (language === userLanguage) targetLanguage = language
  })

  return targetLanguage
}

const IndexPage = () => {
  const { defaultLanguage, languages } = useSiteMetadata()
  useEffect(() => {
    const urlLanguage = getRedirectLanguage(defaultLanguage, languages)
    navigate(`/${urlLanguage}/`, {
      replace: true,
    })
  }, [defaultLanguage, languages])
  return null
}

export default IndexPage
