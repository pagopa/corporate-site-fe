import React from 'react';
import { Cta } from '../../../partials/Cta';
import { Image } from '../../Image';
import { Body } from '../../Remark/Body';

import './ContentsList.sass';

export const ContentsList = ({
  contentsItems,
  template,
  title,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_CONTENTS_LIST_Fragment) => {
  const isSustainable = contentsItems.some(
    el => el.title === 'Innovazione sostenibile'
  );
  return (
    <section className="block --block-blocks-list blocks-list">
      <div className="container-fluid">
        <div className="row">
          <div className={`col-12 col-lg-10 offset-lg-1 col-xl-9 offset-xl-2`}>
            {title && <h2>{title}</h2>}
            {contentsItems?.length && (
              <div className="row">
                {contentsItems.map((block, key) => {
                  const { title, body, image, link, linkLabel } = block || {};

                  const isOdd = key % 2;
                  const hasOffset = template === 'Staggered' && isOdd;

                  return (
                    <div
                      className={`col-12 col-md-5${
                        isOdd ? ' offset-md-1' : ''
                      }${hasOffset ? ' offset' : ''}`}
                      key={key}
                    >
                      <div className={`blocks-list-entry`}>
                        {image && (
                          <Image data={image as Queries.STRAPI__MEDIA} />
                        )}
                        {title && isSustainable ? (
                          <h2 className="h4">{title}</h2>
                        ) : (
                          <h3 className="h4">{title}</h3>
                        )}
                        {body && <Body data={body} />}
                        {link && <Cta href={link} label={linkLabel} />}
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
