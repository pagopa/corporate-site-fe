import classNames from 'classnames';
import React from 'react';
import { Cta } from '../../../partials/Cta';
import { Image } from '../../Image';
import { SharedBlockBody } from '../SharedBlockBody';

import './SharedBlockVisualText.sass';

type VisualSize = 'Small' | 'Half' | 'Big' | 'Full';

export const SharedBlockVisualText = ({
  eyelet,
  title,
  body,
  image,
  caption,
  visualWidth,
  reverseOrder,
  ctaLink,
  ctaText,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment) => {
  const visualSize = (visualWidth as VisualSize) || 'Half';

  const columns: Record<VisualSize, { visual: string; content: string }> = {
    Small: {
      visual: `col-md-${reverseOrder ? 5 : 4} offset-md-1`,
      content: `col-md-${reverseOrder ? 4 : 5} offset-md-1`,
    },
    Half: {
      visual: `col-md-5${reverseOrder ? '' : ' offset-md-1'}`,
      content: `col-md-5${reverseOrder ? ' offset-md-1' : ''}`,
    },
    Big: {
      visual: `col-md-6`,
      content: `col-md-6 col-lg-5`,
    },
    Full: {
      visual: `col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2`,
      content: `col-md-5 offset-md-5`,
    },
  };

  const fullWidthLayout = visualSize === 'Full';

  return (
    <section
      className={`block --block-visual-text`}
      style={{ backgroundColor: 'transparent' }}
    >
      {/* {backgroundGraphics && <BackgroundGraphics data={backgroundGraphics} />} */}
      <div className="container-fluid">
        <div
          className={classNames(
            `row align-items-center`,
            reverseOrder && 'flex-row-reverse justify-content-end'
          )}
        >
          {fullWidthLayout && (
            <div className={classNames('col-9', columns['Full'].visual)}>
              {eyelet && <h4>{eyelet}</h4>}
              {title && <h1>{title}</h1>}
            </div>
          )}
          <div className={`col-12 ${columns[visualSize]?.visual}`}>
            {image?.localFile?.childImageSharp?.gatsbyImageData && (
              <div className="block__visual">
                {image && (
                  <Image
                    data={image as Queries.STRAPI__MEDIA}
                    caption={caption}
                  />
                )}
              </div>
            )}
          </div>
          <div
            className={classNames(
              'col-12',
              fullWidthLayout
                ? columns[visualSize].visual
                : columns[visualSize].content
            )}
          >
            <div className={`block__${fullWidthLayout ? 'visual' : 'content'}`}>
              {!fullWidthLayout && eyelet && <h4>{eyelet}</h4>}
              {!fullWidthLayout && title && <h1>{title}</h1>}
              {body && (
                <SharedBlockBody
                  data={body as Queries.SharedBlockBodyFragment}
                />
              )}
              {ctaLink && ctaText && (
                <Cta
                  label={ctaText}
                  href={`${process.env.API_URL}/${ctaLink}`}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
