import React, { useContext } from 'react'

import { LocaleContext } from '../../contexts/LocaleContext.js'

import { useInitiatives } from '../../hooks/useInitiatives.js'
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
  const initiatives = useInitiatives()

  const currentLocaleNews = news.filter(j => j.node.locale.id === locale)
  const currentLocaleEvents = events.filter(j => j.node.locale.id === locale)
  const currentLocaleInitiatives = initiatives.filter(
    j => j.node.locale.id === locale
  )

  const collection = [
    ...currentLocaleNews,
    ...currentLocaleEvents,
    ...currentLocaleInitiatives,
  ]

  const sortComparing = (a, b) => {
    const aDate = new Date(a.node.date).getTime()
    const bDate = new Date(b.node.date).getTime()
    return bDate - aDate
  }
  
  collection.sort(sortComparing)


  return (
    <>
      {collection.slice(0,2).map((post, key) => {
        return (
          <div className={`col-12 col-lg-5 d-flex${key ? ' offset-lg-1' : ''}`} key={key}>
            <Post data={post.node} />
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
