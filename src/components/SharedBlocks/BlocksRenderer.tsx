import { graphql } from 'gatsby';
import * as React from 'react';
import { Accordion } from './Accordion';
import { AttachmentGrid } from './AttachmentGrid';
import { AttachmentList } from './AttachmentList';
import { ContactsList } from './ContactsList';
import { ContentsList } from './ContentsList/ContentsList';
import { CtaBanner } from './CtaBanner/CtaBanner';
import { CtaGrid } from './CtaGrid';
import { HeroSlider } from './HeroSlider';
import { Intro } from './Intro/Intro';
import { JobpositionList } from './Jobposition';
import { LogoLinks } from './LogoLinks';
import { MapBox } from './MapBox';
import { NewsletterList } from './Newsletter';
import { PostEventsList } from './PostEvents';
import { PressReleaseList } from './PressRelease';
import { ProjectsCarousel } from './ProjectsCarousel';
import { UniversityCollaborationList } from './UniversityCollaboration';
import { Visual } from './Visual';
import { VisualText } from './VisualText';

// This object is used to map Strapi component names to React components
const componentsMap: {
  [key: string]: (props: any) => JSX.Element;
} = {
  STRAPI__COMPONENT_SHARED_BLOCK_ACCORDION: Accordion,
  STRAPI__COMPONENT_SHARED_BLOCK_ATTACHMENTS_GRID: AttachmentGrid,
  STRAPI__COMPONENT_SHARED_BLOCK_CONTACTS_LIST: ContactsList,
  STRAPI__COMPONENT_SHARED_BLOCK_CONTENTS_LIST: ContentsList,
  STRAPI__COMPONENT_SHARED_BLOCK_CTA_BANNER: CtaBanner,
  STRAPI__COMPONENT_SHARED_BLOCK_CTA_GRID: CtaGrid,
  STRAPI__COMPONENT_SHARED_BLOCK_HERO_SLIDER: HeroSlider,
  STRAPI__COMPONENT_SHARED_BLOCK_INTRO: Intro,
  STRAPI__COMPONENT_SHARED_BLOCK_JOBS_LISTING: JobpositionList,
  STRAPI__COMPONENT_SHARED_BLOCK_LIST_ATTACHMENTS: AttachmentList,
  STRAPI__COMPONENT_SHARED_BLOCK_LOGO_LINKS: LogoLinks,
  STRAPI__COMPONENT_SHARED_BLOCK_MAP_BOX: MapBox,
  STRAPI__COMPONENT_SHARED_BLOCK_NEWS_AND_EVENTS: PostEventsList,
  STRAPI__COMPONENT_SHARED_BLOCK_NEWSLETTER: NewsletterList,
  STRAPI__COMPONENT_SHARED_BLOCK_PRESS_RELEASE: PressReleaseList,
  STRAPI__COMPONENT_SHARED_BLOCK_PROJECTS_CAROUSEL: ProjectsCarousel,
  STRAPI__COMPONENT_SHARED_BLOCK_UNIVERSITY_ACCORDION:
    UniversityCollaborationList,
  STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT: VisualText,
  STRAPI__COMPONENT_SHARED_BLOCK_VISUAL: Visual,
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
    {blocks?.map((block, index) => (
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
  fragment Accordion on STRAPI__COMPONENT_BLOCK_CONTEXT_ACCORDION_ITEM {
    content {
      data {
        childMarkdownRemark {
          html
        }
        id
      }
    }
    heading
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
          id
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
      link
      ctaText
      reveal
      youtubeVideo
      backgroundAnimation {
        ...BackgroundAnimation
      }
      body {
        data {
          childMarkdownRemark {
            html
          }
          id
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
        link
        linkLabel
        body {
          data {
            childMarkdownRemark {
              html
            }
            id
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
            id
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
    ... on STRAPI__COMPONENT_SHARED_BLOCK_PRESS_RELEASE {
      id
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_NEWS_AND_EVENTS {
      id
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_UNIVERSITY_ACCORDION {
      id
      title
      pagination
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_NEWSLETTER {
      id
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_JOBS_LISTING {
      eyelet
      title
      links {
        link
        attachment {
          url
        }
      }
      body {
        data {
          childMarkdownRemark {
            html
          }
          id
        }
      }
      commons {
        title
        body
      }
      id
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_ACCORDION {
      id
      title
      accordionItems {
        ...Accordion
      }
      blockConf {
        BlockWidth
        BlockPosition
      }
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_MAP_BOX {
      id
      mapBoxItems {
        title
        linkLabel
        link
        body {
          data {
            childMarkdownRemark {
              html
            }
            id
          }
        }
      }
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_CONTACTS_LIST {
      id
      title
      contacts {
        email
        title
      }
      blockConf {
        BlockWidth
        BlockPosition
      }
    }
  }
`;
