import classNames from 'classnames';
import React, { useRef } from 'react';
import { useRevealTextAnimation } from '../../../hooks';
import { Cta } from '../../../partials/Cta';
import { BackgroundGraphics } from '../../BackgroundGraphics';
import { Image } from '../../Image';
import { Body } from '../../Remark/Body';
import { Video } from '../../Video';
import { useLocation } from '@reach/router';

import './VisualText.sass';

type VisualSize = 'Small' | 'Half' | 'Big' | 'Full';

type VisualBodyProps = {
  body: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['body'];
  reveal: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['reveal'];
  elementRef: React.MutableRefObject<null>;
};

const VisualBody = ({ body, reveal, elementRef }: VisualBodyProps) =>
  reveal ? (
    <div className="col-12 col-md-10 offset-md-1">
      <Body
        forwardRef={elementRef}
        className={classNames(reveal && 'reveal-mode')}
        data={body}
      />
    </div>
  ) : (
    <Body forwardRef={elementRef} data={body} />
  );

type VisualCtasProps = {
  ctaText: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['ctaText'];
  link: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['link'];
  title?: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['title'];
};

const VisualCtas = ({ ctaText, link, title }: VisualCtasProps) => (
  <Cta label={ctaText} href={link} title={title} />
);

type VisualTitleProps = {
  title: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['title'];
  visualSize: VisualSize;
};

const VisualTitle = ({ title, visualSize }: VisualTitleProps) => {
  const { pathname } = useLocation();

  const isHomepage =
    pathname === '/' || pathname === '/it/' || pathname === '/en/homepage/';

  const renderHeading = isHomepage ? (
    <h3 className="h1 primary">{title}</h3>
  ) : (
    <h2 className="h1">{title}</h2>
  );

  return visualSize === 'Small' ? <h4>{title}</h4> : renderHeading;
};

type VisualMediaProps = {
  eyelet: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['eyelet'];
  title: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['title'];
  body: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['body'];
  image: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['image'];
  caption: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['caption'];
  youtubeVideo: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['youtubeVideo'];
  link: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['link'];
  ctaText: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['ctaText'];
  visualSize: VisualSize;
  columns: Record<
    VisualSize,
    { visual: string; content: string; textOnly: string }
  >;
  fullWidthLayout: boolean;
  elementRef: React.MutableRefObject<null>;
  reveal: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['reveal'];
};

const VisualMedia = ({
  eyelet,
  title,
  body,
  image,
  caption,
  youtubeVideo,
  link,
  ctaText,
  visualSize,
  columns,
  fullWidthLayout,
  elementRef,
  reveal,
}: VisualMediaProps) => {
  return (
    <>
      {fullWidthLayout && (
        <div className="col-12 col-md-10 offset-md-1">
          {eyelet && <h4>{eyelet}</h4>}
          {title && <VisualTitle title={title} visualSize={visualSize} />}
        </div>
      )}
      <div className={`col-12 ${columns[visualSize]?.visual}`}>
        <div className="block__visual">
          {youtubeVideo ? (
            <Video
              video={youtubeVideo}
              image={(image as Queries.STRAPI__MEDIA) || null}
            />
          ) : (
            image && (
              <Image data={image as Queries.STRAPI__MEDIA} caption={caption} />
            )
          )}
        </div>
      </div>
      <div className={`col-12 ${columns[visualSize].content}`}>
        <div className="block__content">
          {!fullWidthLayout && eyelet && <h4>{eyelet}</h4>}
          {!fullWidthLayout && title && (
            <VisualTitle title={title} visualSize={visualSize} />
          )}
          {body && (
            <VisualBody body={body} reveal={reveal} elementRef={elementRef} />
          )}
          {link && ctaText && (
            <VisualCtas ctaText={ctaText} link={link} title={title} />
          )}
        </div>
      </div>
    </>
  );
};

type TextOnlyProps = {
  eyelet: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['eyelet'];
  title: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['title'];
  body: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['body'];
  link: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['link'];
  ctaText: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['ctaText'];
  visualSize: VisualSize;
  columns: Record<
    VisualSize,
    { visual: string; content: string; textOnly: string }
  >;
  elementRef: React.MutableRefObject<null>;
  reveal: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment['reveal'];
};

const TextOnly = ({
  eyelet,
  title,
  body,
  link,
  ctaText,
  visualSize,
  columns,
  elementRef,
  reveal,
}: TextOnlyProps) => {
  return (
    <>
      <div className={`col-12 ${columns[visualSize].textOnly}`}>
        {eyelet && <h2 className="h4">{eyelet}</h2>}
        {title && <h2 className="h1">{title}</h2>}
        {body && (
          <VisualBody body={body} reveal={reveal} elementRef={elementRef} />
        )}
        {link && ctaText && (
          <VisualCtas ctaText={ctaText} link={link} title={title} />
        )}
      </div>
    </>
  );
};

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
  backgroundColor,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT_Fragment) => {
  const visualSize = (visualWidth as VisualSize) || 'Half';

  const elementRef = useRef(null);

  useRevealTextAnimation({ elementRef });

  const columns: Record<
    VisualSize,
    { visual: string; content: string; textOnly: string }
  > = {
    Small: {
      visual: `col-md-${reverseOrder ? 5 : 4} offset-md-1`,
      content: `col-md-${reverseOrder ? 4 : 5} offset-md-1`,
      textOnly: `col-md-3 offset-md-1`,
    },
    Half: {
      visual: `col-md-5${reverseOrder ? '' : ' offset-md-1'}`,
      content: `col-md-5${reverseOrder ? ' offset-md-1' : ''}`,
      textOnly: `col-md-5${reverseOrder ? ' offset-md-1' : ''}`,
    },
    Big: {
      visual: `col-md-6`,
      content: `col-md-6 col-lg-5`,
      textOnly: `col-md-10 offset-md-1 col-lg-8 offset-lg-2`,
    },
    Full: {
      visual: `col-md-9 offset-md-1`,
      content: `col-md-5 offset-md-5`,
      textOnly: `col-lg-10 offset-lg-1`,
    },
  };

  const fullWidthLayout = visualSize === 'Full';

  const sectionId = title?.replaceAll(' ', '-').toLocaleLowerCase();

  const { left, top, size } = backgroundAnimation || {};

  return (
    <section
      className={classNames(
        'block ',
        image ? 'block-visual-text' : 'block-text',
        backgroundColor && 'has-bg-color',
        !(body || title || eyelet) && youtubeVideo && 'only-video'
      )}
      style={{ backgroundColor: backgroundColor || 'transparent' }}
      id={sectionId}
    >
      {!(title || eyelet) && (image || youtubeVideo) && (
        <>{image && <div className="sr-only">Immagine</div>}</>
      )}
      <BackgroundGraphics {...{ left, top, size }} />
      <div className="container-fluid">
        <div
          className={classNames(
            `row align-items-center`,
            reverseOrder && 'flex-row-reverse justify-content-end'
          )}
        >
          {image || youtubeVideo ? (
            <VisualMedia
              eyelet={eyelet}
              title={title}
              body={body}
              image={image}
              caption={caption}
              youtubeVideo={youtubeVideo}
              link={link}
              ctaText={ctaText}
              visualSize={visualSize}
              columns={columns}
              fullWidthLayout={fullWidthLayout}
              elementRef={elementRef}
              reveal={reveal}
            />
          ) : (
            <TextOnly
              eyelet={eyelet}
              title={title}
              body={body}
              link={link}
              ctaText={ctaText}
              visualSize={visualSize}
              columns={columns}
              elementRef={elementRef}
              reveal={reveal}
            />
          )}
        </div>
      </div>
    </section>
  );
};
