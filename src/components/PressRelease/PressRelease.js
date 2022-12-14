import React, { useContext } from 'react'

import { LocaleContext } from 'contexts/LocaleContext.js'
import { usePressReleases } from 'hooks/usePressReleases.js'

import Cta from 'components/Cta/Cta'

import './PressRelease.sass'

const LatestPress = () => {
  const locale = useContext(LocaleContext)

  const pressReleases = usePressReleases()

  const currentLocalePress = pressReleases.filter(
    j => j.node.locale.id === locale
  )

  return (
    <>
      {currentLocalePress.map((pr, key) => {
        const { date, title, slug, content, locale, nodeType } = pr.node

        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' },
          theDate = new Date(date).toLocaleDateString(locale.id, dateOptions)

        const text = content.replace(/(<([^>]+)>)/gi, '')

        const abstract = text.split(' ').splice(0, 24).join(' ')

        return (
          <div className="col-12 col-lg-6 d-flex" key={key}>
            <article className="press-release">
              <div>
                <h4>{theDate}</h4>
                <h4 className="--primary --medium">{title}</h4>
                <div className="wysiwyg">
                  <p>{abstract}...</p>
                </div>
              </div>

              <Cta
                url={slug}
                label={locale.id === 'it' ? 'Leggi' : 'Read'}
                type={nodeType}
              />
            </article>
          </div>
        )
      })}
    </>
  )
}

const PressRelease = ({ data }) => {
  const { title, link } = data

  return (
    <section className="block --block-press-release press-releases">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1">
            <h1>{title}</h1>
            <div className="row pt-5">
              <LatestPress />
            </div>
            {link && <Cta label={link.title} url={link.url} variant="link" />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PressRelease
