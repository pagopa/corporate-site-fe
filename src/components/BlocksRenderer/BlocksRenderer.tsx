import { graphql } from 'gatsby';
import * as React from 'react';
import {SharedBlockAttachmentGrid} from '../SharedBlock/SharedBlockAttachmentGrid';
import { SharedBlockAttachmentList } from '../SharedBlock/SharedBlockAttachmentList';
import { SharedBlockContentsList } from '../SharedBlock/SharedBlockContentsList/SharedBlockContentsList';
import { SharedBlockIntro } from '../SharedBlock/SharedBlockIntro/SharedBlockIntro';
import { SharedBlockVisualText } from '../SharedBlock/SharedBlockVisualText';

// This object is used to map Strapi component names to React components
const componentsMap: {
  [key: string]: (props: any) => JSX.Element;
} = {
  STRAPI__COMPONENT_SHARED_BLOCK_INTRO: SharedBlockIntro,
  STRAPI__COMPONENT_SHARED_BLOCK_LIST_ATTACHMENTS: SharedBlockAttachmentList,
  STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT: SharedBlockVisualText,
  STRAPI__COMPONENT_SHARED_BLOCK_CONTENTS_LIST: SharedBlockContentsList,
  STRAPI__COMPONENT_SHARED_BLOCK_ATTACHMENTS_GRID: SharedBlockAttachmentGrid
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
  fragment Image on STRAPI__MEDIA {
    url
    alternativeText
    localFile {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED)
      }
    }
  }
  fragment Blocks on SHARED_BLOCKS {
    __typename
    ... on STRAPI__COMPONENT_SHARED_BLOCK_INTRO {
      title
      eyelet
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
    ... on STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT {
      title
      caption
      visualWidth
      eyelet
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
  }
`;