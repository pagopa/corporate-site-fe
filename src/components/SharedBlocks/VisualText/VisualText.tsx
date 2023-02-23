import classNames from 'classnames';
import React, { useRef } from 'react';
import { useRevealTextAnimation } from '../../../hooks';
import { Cta } from '../../../partials/Cta';
import { BackgroundGraphics } from '../../BackgroundGraphics';
import { Image } from '../../Image';
import { Body } from '../../Remark/Body';
import { Video } from '../../Video';

import './VisualText.sass';

type VisualSize = 'Small' | 'Half' | 'Big' | 'Full';

export const VisualText = ({
  eyelet,
  title,
  body,
  image,
  caption,
  visualWidth,
  reverseOrder,
  link,
  ctaText,
  reveal,
  backgroundAnimation,
  youtubeVideo,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment) => {
  const visualSize = (visualWidth as VisualSize) || 'Half';

  const elementRef = useRef(null);

  useRevealTextAnimation({ elementRef });

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

  const { left, top, size } = backgroundAnimation || {};

  return (
    <section
      className={classNames(
        'block --block-visual-text',
        youtubeVideo && '--has-video',
        youtubeVideo && !(body || title || eyelet) && '--only-video'
      )}
      style={{ backgroundColor: 'transparent' }}
    >
      <BackgroundGraphics {...{ left, top, size }} />
      <div className="container-fluid">
        {youtubeVideo && (
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 pt-5 pt-lg-0">
            <Video
              video={youtubeVideo}
              image={(image as Queries.STRAPI__MEDIA) || null}
            />
          </div>
        )}
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
          {!youtubeVideo &&
            image?.localFile?.childImageSharp?.gatsbyImageData && (
              <div className={`col-12 ${columns[visualSize]?.visual}`}>
                <div className="block__visual">
                  <Image
                    data={image as Queries.STRAPI__MEDIA}
                    caption={caption}
                  />
                </div>
              </div>
            )}
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
                <Body
                  forwardRef={elementRef}
                  className={classNames(reveal && '--reveal-mode')}
                  data={body}
                />
              )}
              {link && ctaText && (
                <Cta label={ctaText} href={`${process.env.API_URL}/${link}`} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
