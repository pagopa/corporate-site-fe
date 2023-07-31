import type { ReactElement } from 'react';
import React from 'react';
import { Cta } from '../../../partials/Cta';

import './CtaBanner.sass';

export const CtaBanner = ({
  link,
  linkLabel,
  title,
  theme = 'dark',
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_CTA_BANNER_Fragment): ReactElement => {
  const lightTheme = theme === 'light';
  return (
    <section
      className={`block --block-cta-banner ${
        lightTheme ? 'cta-banner--light' : 'cta-banner'
      }`}
    >
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-12 col-md-5 offset-md-1 col-lg-7 offset-lg-1">
            {title && (
              <h3
                className={`${
                  lightTheme ? 'cta-banner__title--light' : 'cta-banner__title'
                } mb-md-0`}
              >
                {title}
              </h3>
            )}
          </div>
          {link && (linkLabel || title) && (
            <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-md-end align-items-start">
              <Cta
                label={(linkLabel || title) as string}
                href={`${link}`}
                variant={lightTheme ? 'black' : 'white-hollow'}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
