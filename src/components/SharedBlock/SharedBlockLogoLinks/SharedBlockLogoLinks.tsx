import type { ReactElement } from 'react';
import React from 'react';
import { Image } from '../../Image';

export const SharedBlockLogoLinks = ({
  title,
  logoLinks,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_LOGO_LINKS_Fragment): ReactElement => {
  return (
    <section
      className={`block --block-logo-links logo-links${!title ? ' pt-0' : ''}`}
    >
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            {title && <h4>{title}</h4>}

            {logoLinks?.length && (
              <div className="row">
                {logoLinks.map((logo, key) => {
                  const { attachment, link } = logo || {};

                  return (
                    <div
                      className={`col-12 col-sm-6${
                        logoLinks.length > 1
                          ? ' col-md-4 col-lg-3'
                          : ' col-lg-5'
                      }`}
                      key={key}
                    >
                      <div className="logo-link">
                        {link && (
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {attachment && (
                              <Image
                                data={attachment as Queries.STRAPI__MEDIA}
                              />
                            )}
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
