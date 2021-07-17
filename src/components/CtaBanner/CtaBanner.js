import React from 'react'

import Cta from '../Cta/Cta'
import './CtaBanner.sass'

const CtaBanner = ({ data, classes, locale }) => {
  const { title: ctaMessage, bannerCtaLink: link } = data
  const { title: linkLabel, url: linkUrl, target: linkTarget } = link

  return (
    <section className={`block --${classes} cta-banner`}>
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-md-5 offset-md-1 col-lg-7 offset-lg-1">
            {ctaMessage && (
              <h3 className="cta-banner__title mb-md-0">{ctaMessage}</h3>
            )}
          </div>
          <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-end align-items-start">
            <Cta
              label={linkLabel}
              url={linkUrl}
              blank={linkTarget}
              variant="white-hollow"
              locale={locale}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CtaBanner
