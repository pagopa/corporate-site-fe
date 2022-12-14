import React from 'react'

import classNames from 'classnames'
import parse from 'html-react-parser'

import BackgroundGraphics from 'components/BackgroundGraphics/BackgroundGraphics'
import Video from 'components/Video/Video'
import RevealText from 'components/Text/RevealText'
import Cta from 'components/Cta/Cta'

import './Text.sass'

const Text = ({ data }) => {
  const { blockOptions, iscentered, revealMode, content } = data
  const { backgroundGraphics, blockPosition, blockWidth } = blockOptions
  const { eyelet, title, text, link, video, additionalCta } = content

  const hasVideo = video?.link ? true : false

  const columns = {}

  if (blockPosition === 'center') {
    columns.standard = `col-lg-10 offset-lg-1${
      !hasVideo ? ` col-xl-8 offset-xl-2` : ''
    }`
    columns.wide = `col-lg-10 offset-lg-1`
  }
  if (blockPosition === 'left') {
    columns.standard = `col-lg-10 offset-lg-1${
      !hasVideo ? ` col-xl-8 offset-xl-1` : ''
    }`
    columns.wide = `col-lg-10 offset-lg-1`
  }
  if (blockPosition === 'right') {
    columns.standard = `col-lg-10 offset-lg-1${
      !hasVideo ? ` col-xl-8 offset-xl-1` : ''
    }`
    columns.wide = `col-lg-10 offset-lg-3`
  }

  return (
    <section
      className={classNames([
        'block --block-text text',
        {
          '--centered': iscentered,
          '--reveal-mode': revealMode,
          '--has-video': hasVideo,
          '--only-video': !(eyelet || title || text),
        },
      ])}
    >
      {backgroundGraphics && <BackgroundGraphics data={backgroundGraphics} />}

      <div className="container-fluid">
        <div className="row">
          <div className={classNames([`col-12 ${columns[blockWidth]}`])}>
            <div className="row justify-content-between align-items-center">
              {hasVideo && (
                <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 pt-5 pt-lg-0">
                  <Video video={video.link} image={video.image} />
                </div>
              )}

              <div
                className={classNames([
                  'col-12',
                  {
                    'pb-5 pb-lg-0 mb-5 mb-lg-0': hasVideo,
                  },
                ])}
              >
                {eyelet && <h4>{eyelet}</h4>}
                {title ? (
                  iscentered ? (
                    <h2>{parse(title)}</h2>
                  ) : (
                    <h1>{parse(title)}</h1>
                  )
                ) : (
                  false
                )}

                {text && revealMode && (
                  <div className="row">
                    <div className="col-12 col-md-10 offset-md-1">
                      <RevealText text={parse(text)} />
                    </div>
                  </div>
                )}

                {text && !revealMode && (
                  <div className="wysiwyg">{parse(text)}</div>
                )}

                {link && (
                  <Cta
                    label={link.title}
                    url={link.url}
                    blank={link.target}
                    className={additionalCta ? 'me-5' : ''}
                  />
                )}

                {additionalCta && additionalCta.link && (
                  <div className="py-4 d-inline-block">
                    <span className="me-4">{additionalCta.text}</span>
                    {additionalCta.link && (
                      <Cta
                        label={additionalCta.link.title}
                        url={additionalCta.link.url}
                        blank="__blank"
                        variant="link"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Text
