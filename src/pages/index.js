import { useEffect } from 'react'

import { navigate } from 'gatsby'

const getRedirectLanguage = () => {
  if (typeof navigator === `undefined`) {
    return 'en'
  }

  const lang = navigator && navigator.language && navigator.language.split('-')[0]
  
  if (!lang) return 'en'

  switch (lang) {
    case 'it':
      return 'it'
    default:
      return 'en'
  }
}

const IndexPage = () => {
  useEffect(() => {
    const urlLang = getRedirectLanguage()
    navigate(`/${urlLang}/`, {
      replace: true
    })
  }, [])
  return null
}

export default IndexPage