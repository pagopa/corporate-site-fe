import { useTranslation } from 'gatsby-plugin-react-i18next';
import React from 'react';
import placeholder from '../../images/placeholder.png';
import { Image } from '../Image';

import { Cta } from '../../partials/Cta';
import './Article.sass';
import { previewText } from '../../utils/previewText';

type Article =
  | Queries.PostFragment
  | Queries.EventFragment
  | Queries.NewsletterFragment;

function isEvent(article: Article): article is Queries.EventFragment {
  return article.__typename === 'STRAPI_EVENT';
}

export const Article = ({
  article,
  isPreview = false,
}: {
  article: Article;
  isPreview: boolean;
}) => {
  const {
    i18n: { language },
  } = useTranslation();

  const { title, slug, body, featuredImage } = article || {};

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const baseDate = isEvent(article) ? article?.startDate : article?.publishedAt;
  const theDate = baseDate
    ? new Date(baseDate).toLocaleDateString(language, dateOptions)
    : '';

  const labelMap = {
    STRAPI_POST: 'News',
    STRAPI_EVENT: 'Eventi',
    STRAPI_NEWSLETTER: 'Newsletter',
  };

  return (
    <article className={`article${isEvent(article) ? ' --event' : ''}`}>
      <div className="mb-4">
        <div className="article__image">
          {featuredImage ? (
            <Image data={featuredImage as Queries.STRAPI__MEDIA} />
          ) : (
            <img src={placeholder} alt="" />
          )}
          <p className="label">{labelMap[article.__typename]}</p>
        </div>
        <div className="article__date">
          <h4>{theDate}</h4>
          {'timeStart' in article && 'timeEnd' in article && (
            <h4>
              {`ore: ${article.timeStart}${
                article.timeEnd ? ' - ' + article.timeEnd : ''
              }`}
            </h4>
          )}
        </div>
        <h4 className="--primary --medium">{title}</h4>
        {previewText(14, body?.data?.body)}
      </div>

      <Cta
        href={isPreview ? `./news-ed-eventi/${slug}` : slug}
        label={language === 'it' ? 'Scopri' : 'Discover'}
      />
    </article>
  );
};
