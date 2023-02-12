import { graphql } from 'gatsby';
import * as React from 'react';
import { SharedBlockAttachmentList } from '../SharedBlockAttachmentList';
import { SharedBlockIntro } from '../SharedBlockIntro/SharedBlockIntro';
import { SharedBlockVisualText } from '../SharedBlockVisualText';

const componentsMap: {
  [key: string]: (props: any) => JSX.Element;
} = {
  STRAPI__COMPONENT_SHARED_BLOCK_INTRO: SharedBlockIntro,
  STRAPI__COMPONENT_SHARED_BLOCK_LIST_ATTACHMENTS: SharedBlockAttachmentList,
  STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT: SharedBlockVisualText,
};

const Block = ({ block }: { block: Queries.BlocksFragment }) => {
  const Component = componentsMap[block.__typename];

  return !!Component ? <Component {...block} /> : null;
};

export const BlocksRenderer = ({
  blocks,
}: {
  blocks: ReadonlyArray<Queries.BlocksFragment>;
}) => {
  return (
    <>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </>
  );
};

export const query = graphql`
  fragment Blocks on STRAPI__COMPONENT_SHARED_BLOCK_CONTENTS_LISTSTRAPI__COMPONENT_SHARED_BLOCK_INTROSTRAPI__COMPONENT_SHARED_BLOCK_LIST_ATTACHMENTSSTRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXTUnion {
    __typename
    ... on STRAPI__COMPONENT_SHARED_BLOCK_INTRO {
      title
      eyelet
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_LIST_ATTACHMENTS {
      id
      linksAttachments {
        id
        link
      }
    }
    ... on STRAPI__COMPONENT_SHARED_BLOCK_VISUAL_TEXT {
      title
      caption
      body {
        data {
          childMarkdownRemark {
            html
          }
        }
      }
      image {
        url
        alternativeText
        localFile {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED)
          }
        }
      }
    }
  }
`;
