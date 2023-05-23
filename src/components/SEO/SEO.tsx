import { useI18next } from 'gatsby-plugin-react-i18next';
import React from 'react';

import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../../hooks';

export type SEOProps = {
  meta?: null | {
    readonly metaTitle: string | null;
    readonly metaDescription: string | null;
    readonly metaImage: {
      readonly localFile: { readonly publicURL: string | null } | null;
    } | null;
    readonly metaSocial: ReadonlyArray<{
      readonly description: string | null;
      readonly title: string | null;
      readonly socialNetwork: string | null;
    } | null> | null;
  };
  title?: string;
  featuredImage?: Queries.ImageFragment;
};

export const SEO = ({ meta, title, featuredImage }: SEOProps) => {
  const { language } = useI18next();
  const { siteMetadata } = useSiteMetadata() || {};

  const seoImageFromCMS = meta?.metaImage
    ? `${meta?.metaImage?.localFile?.publicURL}`
    : `${featuredImage?.url}`;

  const seo = {
    title:
      meta?.metaTitle ||
      `${title ? title + ' - ' : ''}${siteMetadata?.metaTitle}` ||
      siteMetadata?.title ||
      '',
    description: meta?.metaDescription || siteMetadata?.metaDescription || '',
    metaSocial: !!meta?.metaSocial?.length
      ? meta.metaSocial
      : siteMetadata?.metaSocial || [],
    metaImage:
      seoImageFromCMS != 'undefined'
        ? seoImageFromCMS
        : 'https://www.pagopa.it/imagedefault.jpg',
  };

  return (
    <>
      <Helmet
        htmlAttributes={{
          lang: language,
        }}
        title={seo.title}
        meta={[
          {
            name: `title`,
            content: seo.title,
          },
          {
            name: `description`,
            content: seo.description,
          },
          {
            name: `image`,
            content: seo.metaImage,
          },
          {
            property: `og:title`,
            content: seo.title,
          },
          {
            property: `og:description`,
            content: seo.description,
          },
          {
            property: `og:image`,
            content: `${seo.metaImage}`,
          },
          {
            property: `og:type`,
            content: `website`,
          },
          ...seo?.metaSocial
            ?.map(social => [
              {
                name: `${social.socialNetwork}:card`,
                content: `summary`,
              },
              {
                name: `${social.socialNetwork}:title`,
                content: social?.title || '',
              },
              {
                name: `${social.socialNetwork}:description`,
                content: social?.description || '',
              },
            ])
            .flat(),
        ]}
      />

      <Helmet>
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Organization",
            "url": "https://www.pagopa.it/it/",
            "logo": "https://www.pagopa.it/pagopa.svg"
          }`}
        </script>

        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "Organization",
            "additionalType": "Technology Company",
            "name": "PagoPA S.p.A.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Via Sardegna 38",
              "addressLocality": "Roma",
              "addressRegion": "RM",
              "postalCode": "00187",
              "addressCountry": "IT"
            },
            "department": [
              {
                "@type": "Organization",
                "name": "Sede Legale",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Piazza Colonna 370",
                  "addressLocality": "Roma",
                  "addressRegion": "RM",
                  "postalCode": "00187",
                  "addressCountry": "IT"
                }
              }, {
                "@type": "Organization",
                "name": "Sede Operativa",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Via Sardegna 38",
                  "addressLocality": "Roma",
                  "addressRegion": "RM",
                  "postalCode": "00187",
                  "addressCountry": "IT"
                }
              }
            ],
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 41.9095736,
              "longitude": 12.4914426
            },
            "url": "https://www.pagopa.it/it/"
          }`}
        </script>
      </Helmet>
      <Helmet>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Helmet>
    </>
  );
};
