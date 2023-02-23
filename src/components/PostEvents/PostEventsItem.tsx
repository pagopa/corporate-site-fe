import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import { Image } from '../Image';
import placeholder from '../../images/placeholder.png';

import './PostEventsItem.sass';
import { Cta } from '../../partials/Cta';

type PostEvent =
  | Queries.PostFragment
  | Queries.EventFragment
  | Queries.NewsletterFragment;

function isEvent(post: PostEvent): post is Queries.EventFragment {
  return post.__typename === 'STRAPI_EVENT';
}

export const PostEventsItem = ({ post }: { post: PostEvent }) => {
  const {
    i18n: { language },
  } = useTranslation();

  const { title, slug, body, featuredImage } = post || {};

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const baseDate = isEvent(post) ? post?.startDate : post?.updatedAt;
  const theDate = baseDate
    ? new Date(baseDate).toLocaleDateString(language, dateOptions)
    : '';

  const text = body?.data?.body?.replace(/(<([^>]+)>)/gi, '');
  const abstract = text?.split(' ').splice(0, 14).join(' ');

  const labelMap = {
    STRAPI_POST: 'Post',
    STRAPI_EVENT: 'Eventi',
    STRAPI_NEWSLETTER: 'Newsletter',
  };

  return (
    <article className={`post${isEvent(post) ? ' --event' : ''}`}>
      <div>
        <div className="post__image" data-label={labelMap[post.__typename]}>
          {featuredImage && (
            <Image data={featuredImage as Queries.STRAPI__MEDIA} />
          )}
          {!featuredImage && <img src={placeholder} alt="" />}
        </div>
        <div className="post__date">
          <h4>{theDate}</h4>
          {'timeStart' in post && 'timeEnd' in post && (
            <h4>
              {`ore: ${post.timeStart}${post.timeEnd ? ' - post.timeEnd' : ''}`}
            </h4>
          )}
        </div>
        <h4 className="--primary --medium">{title}</h4>
        {abstract && abstract}
      </div>

      <Cta
        href={slug || '#'}
        label={language === 'it' ? 'Scopri' : 'Discover'}
      />
    </article>
  );
};
