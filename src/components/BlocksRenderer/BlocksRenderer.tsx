import { graphql } from 'gatsby';
import * as React from 'react';
import { SharedBlockAttachmentGrid } from '../SharedBlock/SharedBlockAttachmentGrid';
import { SharedBlockAttachmentList } from '../SharedBlock/SharedBlockAttachmentList';
import { SharedBlockContentsList } from '../SharedBlock/SharedBlockContentsList/SharedBlockContentsList';
import { SharedBlockCtaBanner } from '../SharedBlock/SharedBlockCtaBanner/SharedBlockCtaBanner';
import { SharedBlockCtaGrid } from '../SharedBlock/SharedBlockCtaGrid';
import { SharedBlockHeroSlider } from '../SharedBlock/SharedBlockHeroSlider';
import { SharedBlockIntro } from '../SharedBlock/SharedBlockIntro/SharedBlockIntro';
import { SharedBlockLogoLinks } from '../SharedBlock/SharedBlockLogoLinks';
import { SharedBlockProjectsCarousel } from '../SharedBlock/SharedBlockProjectsCarousel';
import { SharedBlockVisual } from '../SharedBlock/SharedBlockVisual';
import { SharedBlockVisualText } from '../SharedBlock/SharedBlockVisualText';

// This object is used to map Strapi component names to React components
const componentsMap: {
  [key: string]: (props: any) => JSX.Element;
} = {
  STRAPI__COMPONENT_SHARED_BLOCK_ATTACHMENTS_GRID: SharedBlockAttachmentGrid,
  STRAPI__COMPONENT_SHARED_BLOCK_CONTENTS_LIST: SharedBlockContentsList,
  STRAPI__COMPONENT_SHARED_BLOCK_CTA_BANNER: SharedBlockCtaBanner,
  STRAPI__COMPONENT_SHARED_BLOCK_CTA_GRID: SharedBlockCtaGrid,
  STRAPI__COMPONENT_SHARED_BLOCK_INTRO: SharedBlockIntro,
  STRAPI__COMPONENT_SHARED_BLOCK_LIST_ATTACHMENTS: SharedBlockAttachmentList,
  STRAPI__COMPONENT_SHARED_BLOCK_VISUAL: SharedBlockVisual,
  STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT: SharedBlockVisualText,
  STRAPI__COMPONENT_SHARED_BLOCK_PROJECTS_CAROUSEL: SharedBlockProjectsCarousel,
  STRAPI__COMPONENT_SHARED_BLOCK_LOGO_LINKS: SharedBlockLogoLinks,
  STRAPI__COMPONENT_SHARED_BLOCK_HERO_SLIDER: SharedBlockHeroSlider,
};

const Block = ({ block }: { block: Queries.BlocksFragment }) => {
  const Component = componentsMap[block.__typename];
  return !!Component ? <Component {...block} /> : null;
};

// This function renders a list of blocks
export const BlocksRenderer = ({
  blocks,
}: {
  blocks: ReadonlyArray<Queries.BlocksFragment>;
}) => (
  <>
    {blocks.map((block, index) => (
      <Block key={index} block={block} />
    ))}
  </>
);

export const query = graphql`
  fragment BackgroundAnimation on STRAPI__COMPONENT_BLOCK_CONTEXT_BACKGROUND_ANIMATION {
    top
    left
    size
  }
  fragment Image on STRAPI__MEDIA {
    url
    alternativeText
    localFile {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
  }
  fragment Blocks on SHARED_BLOCKS_UNION {
    __typename
    ... on STRAPI__COMPONENT_SHARED_BLOCK_INTRO {
      title
      eyelet
      body {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      introMenu {
        link
        linkLabel
        title
      }
      image {
        ...Image
      }
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_LIST_ATTACHMENTS {
      title
      id
      linksAttachments {
        id
        link
        attachment {
          url
        }
      }
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_VISUAL {
      template
      backgroundAnimation {
        ...BackgroundAnimation
      }
      image {
        ...Image
      }
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT {
      title
      caption
      visualWidth
      eyelet
      reverseOrder
      ctaLink
      ctaText
      reveal
      backgroundAnimation {
        ...BackgroundAnimation
      }
      body {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      image {
        ...Image
      }
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_CONTENTS_LIST {
      title
      template
      contentsItems {
        title
        body {
          data {
            childMarkdownRemark {
              html
            }
          }
        }
        image {
          ...Image
        }
      }
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_ATTACHMENTS_GRID {
      id
      title
      attachmentsGridItems {
        buttonLabel
        attachment {
          url
        }
      }
      blockConf {
        BlockWidth
        BlockPosition
      }
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_CTA_GRID {
      id
      ctaGridItems {
        body {
          data {
            body
          }
        }
        title
        link
        linkLabel
      }
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_CTA_BANNER {
      id
      title
      link
      linkLabel
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_PROJECTS_CAROUSEL {
      id
      title
      projects {
        carouselTitle
        url_path
        carouselImage {
          ...Image
        }
        featuredImage {
          ...Image
        }
        carouselAbstract
        carouselCtaLabel
      }
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_LOGO_LINKS {
      id
      title
      logoLinks {
        link
        attachment {
          ...Image
        }
      }
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_HERO_SLIDER {
      id
      heroSliderItems {
        body {
          data {
            childMarkdownRemark {
              html
            }
          }
        }
        image {
          ...Image
        }
        link
        linkLabel
        title
      }
    }
  }
`;
