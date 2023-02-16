import React from 'react';
import { Cta } from '../../../partials/Cta';

import './SharedBlockCtaGrid.sass';

export const SharedBlockCtaGrid = ({
  ctaGridItems,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_CTA_GRID_Fragment) => {
  return ctaGridItems ? (
    <section className="block --block-cta-grid cta-grid">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <div className="row">
              {ctaGridItems.map((item, key) => {
                const { title, body, link, linkLabel } = item || {};
                if (title && body && link) {
                  return (
                    <div className="col-12 col-md-6 col-lg-4 d-flex" key={key}>
                      <div className="cta-grid__entry">
                        <div>
                          <h4 className="cta-grid__title --primary">{title}</h4>
                          <p className="cta-grid__text">{body.data?.body}</p>
                        </div>
                        <div>
                          <Cta label={linkLabel || title} href={link} variant="link" />
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <></>
  );
};
