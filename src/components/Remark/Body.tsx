import classNames from 'classnames';
import React, { MutableRefObject } from 'react';

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

  // if production replace strapi assets dir name with aws dir name
  const innerHtml = isProduction
    ? html.replace(/\/uploads\//g, '/media/')
    : html;

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
