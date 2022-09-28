import React from 'react'

import parse from 'html-react-parser'

import BackgroundGraphics from '../BackgroundGraphics/BackgroundGraphics'
import Video from '../Video/Video'
import Cta from '../Cta/Cta'

import './Text.sass'

const Text = ({ data }) => {
  const { blockOptions, iscentered, content } = data

  const { backgroundGraphics, blockPosition, blockWidth } = blockOptions
  
  const { eyelet, title, text, link, video } = content

  const hasVideo = video?.link ? true : false

  const columns = {}

  if (blockPosition === 'center') {
    columns.standard = `col-lg-10 offset-lg-1${!hasVideo ? ' col-xl-8 offset-xl-2' : ''}`
    columns.wide = `col-lg-10 offset-lg-1`
  }
  if (blockPosition === 'left') {
    columns.standard = `col-lg-10 offset-lg-1${!hasVideo ? ' col-xl-8 offset-xl-1' : ''}`
    columns.wide = `col-lg-10 offset-lg-1`
  }
  if (blockPosition === 'right') {
    columns.standard = `col-lg-10 offset-lg-1${!hasVideo ? ' col-xl-8 offset-xl-1' : ''}`
    columns.wide = `col-lg-10 offset-lg-3`
  }


  return (
    <section className={`block --block-text text${hasVideo ? ' --has-video' : ''}${iscentered ? ' --centered' : ''}`}>
      
      {backgroundGraphics && <BackgroundGraphics data={backgroundGraphics} />}

      <div className="container-fluid">
        <div className="row">
          <div className={`col-12 ${columns[blockWidth]}`}>
            <div className="row flex-row-reverse justify-content-between align-items-center">
              <div className={`col-12${hasVideo ? ' col-lg-5 pb-5 pb-lg-0 mb-5 mb-lg-0' : ''}`}>
                
                {eyelet && <h4>{eyelet}</h4>}
                {title ? iscentered ? <h2>{parse(title)}</h2> : <h1>{parse(title)}</h1> : false}
                {text && (
                  <div className="wysiwyg">
                    {parse(text)}
                  </div>
                )}
                {link && (
                  <Cta
                    label={link.title}
                    url={link.url}
                    blank={link.target}
                  />
                )}
              </div>
              
              {hasVideo && (
                <div className="col-12 col-lg-6 pt-5 pt-lg-0">
                  <Video video={video.link} image={video.image} />
                  {/* {link && hasVideo && (
                    <Cta
                      label={link.title}
                      url={link.url}
                      blank={link.target}
                    />
                  )} */}
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Text
