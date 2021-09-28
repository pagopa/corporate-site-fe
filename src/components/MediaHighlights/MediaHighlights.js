import React, { useContext } from 'react'
import { LocaleContext } from '../../contexts/LocaleContext.js'

import Cta from '../../components/Cta/Cta.js'

import './MediaHighlights.sass'

import iconNews from '../../images/icon-news.svg'
import iconEvents from '../../images/icon-events.svg'
import iconPressReleases from '../../images/icon-pressreleases.svg'

const MediaHighlights = ({ data }) => {

  const locale = useContext(LocaleContext)
  
  const { title, posts, blockOptions } = data

  const { backgroundGraphics, blockPosition, blockWidth } = blockOptions

  const columns = {}

  if (blockPosition === 'center') {
    columns.standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-2`
    columns.wide = `col-md-10 offset-md-1`
  }
  if (blockPosition === 'left') {
    columns.standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-1`
    columns.wide = `col-md-10 offset-md-1`
  }
  if (blockPosition === 'right') {
    columns.standard = `col-md-10 offset-md-1 col-lg-8 offset-lg-1`
    columns.wide = `col-md-10 offset-md-3`
  }

  return (
    <section className="block --block-media-highlights">
      <div className="container-fluid">
        <div className="row">
          <div className={`col-12 ${columns[blockWidth]}`}>
            {title && <h1>{title}</h1>}
            <div className="row">
              {posts.map(
                ({ nodeType, date, title, content, slug, eventField }, key) => {
                  const dateOptions = {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    },

                    theDate = new Date(eventField ? eventField.eventDate : date)
                      .toLocaleDateString(locale, dateOptions)
                      .replaceAll('/', '.'),

                    typeProps = {
                      Post: {
                        label: 'News',
                        icon: iconNews
                      },
                      Event: {
                        label: locale === 'it' ? 'Eventi' : 'Events',
                        icon: iconEvents
                      },
                      PressReleases: {
                        label: locale === 'it' ? 'Comunicati Stampa' : 'Press Releases',
                        icon: iconPressReleases
                      }
                    },

                    titleArray = title.split(" "),
                    truncatedTitle = titleArray.length > 7 ? `${titleArray.splice(0, 7).join(" ")}...` : titleArray.join(" "),
                    
                    noHtmlContent = content?.replace(/(<([^>]+)>)/ig, ''),
                    truncatedContent = noHtmlContent?.split(" ").splice(0, 12).join(" ")

                  return (
                    <div className="col-12 col-md-6 col-lg-4 d-flex" key={key}>
                      <article className="media-highlight icon-box">
                        <div>
                          <div className="icon-box__icon">
                            <img src={typeProps[nodeType].icon} title="icon" />
                          </div>

                          <div className="media-highlight__labels">
                            <div className="row justify-content-between">
                              <div className="col-auto">
                                {typeProps[nodeType].label}
                              </div>
                              <div className="col-auto">
                                {theDate}
                              </div>
                            </div>
                          </div>

                          <h4 className="--primary --medium">{truncatedTitle}</h4>

                          <p>{truncatedContent}...</p>
                        </div>

                        <Cta url={slug} label={locale === 'it' ? 'Leggi' : 'Read'} type={nodeType} />

                      </article>
                    </div>
                  )
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MediaHighlights

// ... on WpPage_Flexiblecontent_Body_Blocks_BlockMediaHighlights {
//   fieldGroupName
//   title
//   posts {
//     ... on WpPost {
//       date
//       title
//       content
//       slug
//       nodeType
//     }
//     ... on WpEvent {
//       title
//       content
//       slug
//       nodeType
//       eventField {
//         eventDate
//       }
//     }
//     ... on WpPressReleases {
//       date
//       title
//       content
//       slug
//       nodeType
//     }
//   }
//   blockOptions {
//     blockPosition
//     blockWidth
//     backgroundGraphics {
//       fieldGroupName
//       size
//       xposition
//       yposition
//     }
//   }
// }
