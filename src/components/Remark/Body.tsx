import classNames from 'classnames';
import React, { MutableRefObject } from 'react';

import './Body.sass';

export const Body = ({
  data: { data },
  className,
  forwardRef,
}: {
  data: {
    readonly data: {
      readonly id: string;
      readonly childMarkdownRemark: { readonly html: string | null } | null;
    } | null;
  };
  className?: string;
  forwardRef?: MutableRefObject<null>;
}) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const { html } = data?.childMarkdownRemark || { html: '' };

  if (!html) return null;

  const CDN_MEDIA_PATH = `${process.env.CDN_BASE_URL}/${process.env.CDN_MEDIA_DIR}/`;
  const CMS_MEDIA_PATH = `${process.env.STRAPI_API_URL}/${process.env.STRAPI_MEDIA_DIR}/`;

  let processedHtml = isProduction
    ? html.replace(/\/uploads\//g, CDN_MEDIA_PATH)
    : html.replace(/\/uploads\//g, CMS_MEDIA_PATH);

  // This regex modifies the heading "COME ADERIRE" of the page "Check IBAN" and the headings of the page "Fondo Innovazione" in order to render a tag <h3> instead of <h4> and better align with the headings structure of the page.
  const allH4Regex = /<h4\b[^>]*>([\s\S]*?)<\/h4>/gi;

  processedHtml = processedHtml.replace(allH4Regex, '<h3 class="h4">$1</h3>');

  return (
    <div
      className={classNames('wysiwyg', className)}
      ref={forwardRef}
      dangerouslySetInnerHTML={{
        __html: processedHtml,
      }}
    />
  );
};
