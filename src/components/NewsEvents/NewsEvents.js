import React, { useContext } from 'react'

import { LocaleContext } from '../../contexts/LocaleContext.js'
import { useNews } from '../../hooks/useNews.js'
import { useEvents } from '../../hooks/useEvents.js'

import BackgroundGraphics from '../BackgroundGraphics/BackgroundGraphics'
import Cta from '../../components/Cta/Cta'

import './NewsEvents.sass'

const LatestEntries = () => {
  const locale = useContext(LocaleContext)

  const news = useNews()
  const events = useEvents()

  const currentLocaleNews = news.filter(j => j.node.locale.id === locale)
  const currentLocaleEvents = events.filter(j => j.node.locale.id === locale)

  return (
    <>
      {currentLocaleNews.map((pr, key) => {
        const { date, title, slug, content, locale, nodeType } = pr.node


        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' },
              theDate = new Date(date).toLocaleDateString(locale.id, dateOptions)

        const text = content.replace(/(<([^>]+)>)/ig, '')

        const abstract = text.split(" ").splice(0,14).join(" ")
        
        return (
          <div className="col-12 col-lg-5 d-flex" key={key}>
            <article className="press-release">
              <div>
                <h4>{theDate}</h4>
                <h4 className="--primary --medium">{title}</h4>
                <div className="wysiwyg">
                  <p>{abstract}...</p>
                </div>
              </div>

              <Cta url={slug} label={locale.id === 'it' ? 'Scopri' : 'Discover'} type={nodeType}/>
            </article>
          </div>
        )
      })}

      {currentLocaleEvents.map((pr, key) => {
        const { date, title, slug, content, locale, nodeType } = pr.node


        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' },
              theDate = new Date(date).toLocaleDateString(locale.id, dateOptions)

        const text = content.replace(/(<([^>]+)>)/ig, '')

        const abstract = text.split(" ").splice(0,14).join(" ")
        
        return (
          <div className="col-12 col-lg-5 offset-lg-1 d-flex" key={key}>
            <article className="press-release">
              <div>
                <h4>{theDate}</h4>
                <h4 className="--primary --medium">{title}</h4>
                <div className="wysiwyg">
                  <p>{abstract}...</p>
                </div>
              </div>

              <Cta url={slug} label={locale.id === 'it' ? 'Scopri' : 'Discover'} type={nodeType}/>
            </article>
          </div>
        )
      })}

    </>
  )
}

const NewsEvents = ({ data }) => {

  const { title, link, blockOptions: { backgroundGraphics } } = data

  return (
    <section className="block --block-press-release press-releases">
      
      {backgroundGraphics && <BackgroundGraphics data={backgroundGraphics} />}

      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1">
            <h1>{title}</h1>
            <div className="row pt-5">
              <LatestEntries />
            </div>
            {link && <Cta label={link.title} url={link.url} variant="link" />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewsEvents
