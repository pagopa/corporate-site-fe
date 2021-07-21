export const convertCPTDir = (fragments, translations, locale) => {
  
  let newPath

  if (fragments.find(f => f === 'project')) {
    const projectTranslations = translations.find(
        t => t.stringKey === 'project_cpt_slug'
      ),
      projectDir =
        locale === 'it' ? projectTranslations.itValue : projectTranslations.enValue

    newPath = `/${locale}/${projectDir}/${fragments.slice(-1)[0]}`
  } else {
    newPath = `/${fragments.join('/')}`
  }
  return newPath
}