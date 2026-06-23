import classNames from 'classnames';
import React, { MutableRefObject } from 'react';
import { useLocation } from '@reach/router';

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
  const { pathname } = useLocation();
  const isProduction = process.env.NODE_ENV === 'production';
  const { html } = data?.childMarkdownRemark || { html: '' };

  if (!html) return null;

  const CDN_MEDIA_PATH = `${process.env.CDN_BASE_URL}/${process.env.CDN_MEDIA_DIR}/`;
  const CMS_MEDIA_PATH = `${process.env.STRAPI_API_URL}/${process.env.STRAPI_MEDIA_DIR}/`;

  let processedHtml = isProduction
    ? html.replace(/\/uploads\//g, CDN_MEDIA_PATH)
    : html.replace(/\/uploads\//g, CMS_MEDIA_PATH);

  // Upgrades headings for semantic correctness. Fondo Innovazione uses h2 for all top-level sections
  // (both h3 and h4 in CMS content become h2, as they are direct children of the page h1).
  // Check IBAN uses h3 (sub-sections under an existing h2 "Vantaggi"). All other pages default to h3.
  const isFondoInnovazione = pathname.includes('fondo-innovazione');

  const allH4Regex = /<h4\b[^>]*>([\s\S]*?)<\/h4>/gi;
  const h4Tag = isFondoInnovazione ? 'h2' : 'h3';
  processedHtml = processedHtml.replace(
    allH4Regex,
    `<${h4Tag} class="h4">$1</${h4Tag}>`
  );

  if (isFondoInnovazione) {
    const allH3Regex = /<h3\b[^>]*>([\s\S]*?)<\/h3>/gi;
    processedHtml = processedHtml.replace(allH3Regex, `<h2 class="h3">$1</h2>`);
  }

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
