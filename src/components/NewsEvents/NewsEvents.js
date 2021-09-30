import React, { useContext } from 'react'

import { LocaleContext } from '../../contexts/LocaleContext.js'
import { useEvents } from '../../hooks/useEvents.js'
import { useNews } from '../../hooks/useNews.js'

import BackgroundGraphics from '../BackgroundGraphics/BackgroundGraphics'
import Post from '../../components/Post/Post'
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

        return (
          <div className="col-12 col-lg-5 d-flex" key={key}>
            <Post data={pr.node} />
          </div>
        )
      })}

      {currentLocaleEvents.map((pr, key) => {
        return (
          <div className={`col-12 col-lg-5${currentLocaleNews.length ? ' offset-lg-1' : ''} d-flex`} key={key}>
            <Post data={pr.node} />
          </div>
        )
      })}
    </>
  )
}

const NewsEvents = ({ data }) => {
  const {
    title,
    link,
    blockOptions: { backgroundGraphics },
  } = data

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
