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
  forwardRef?: MutableRefObject<any>;
}) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const { html } = data?.childMarkdownRemark;

  const CDN_MEDIA_PATH = `${process.env.CDN_BASE_URL}/${process.env.CDN_MEDIA_DIR}/`;
  const CMS_MEDIA_PATH = `${process.env.STRAPI_API_URL}/${process.env.STRAPI_MEDIA_DIR}/`;

  const innerHtml = isProduction
    ? html.replace(/\/uploads\//g, CDN_MEDIA_PATH)
    : html.replace(/\/uploads\//g, CMS_MEDIA_PATH);

  return (
    <div
      className={classNames('wysiwyg', className)}
      ref={forwardRef}
      dangerouslySetInnerHTML={{
        __html: innerHtml,
      }}
    />
  );
};
