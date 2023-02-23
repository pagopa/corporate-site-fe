import { graphql } from 'gatsby';
import React from 'react';
import { Body } from '../../Remark/Body';

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

export const SharedBlockFragment = graphql`
  fragment SharedBlock on STRAPI__COMPONENT_SHARED_BLOCK_INTRO {
    eyelet
    id
    isEventLanding
    strapi_id
    title
    useFeaturedImage
    body {
      data {
        childMarkdownRemark {
          html
        }
        id
      }
    }
  }
`;

export const JobIntroFragment = graphql`
  fragment JobIntro on STRAPI_JOBPOSITION {
    closeDate
    hiredPositions
    openDate
    openPositions
    selectedPeople
    blocks {
      ...Blocks
    }
  }
`;

export const JobIntro = ({
  data: {
    closeDate,
    hiredPositions,
    openDate,
    openPositions,
    selectedPeople,
    blocks,
  },
}: {
  data: Queries.JobIntroFragment;
}) => {
  const block: Queries.SharedBlockFragment | null = blocks ? blocks[0] : null;

  const startDate = openDate
    ? new Date(openDate).toLocaleDateString('it', dateFormatOptions)
    : null;
  const endDate = closeDate
    ? new Date(closeDate).toLocaleDateString('it', dateFormatOptions)
    : null;

  const hasPositionsData = openPositions || hiredPositions ? true : false;
  const hasSelectionData = selectedPeople ? true : false;

  return (
    <header className="block --block-intro intro --job">
      <div className="container-fluid">
        {block && (
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <div className="intro__heading">
                {block.eyelet && <h4>{block.eyelet}</h4>}
                {block.title && <h1>{block.title}</h1>}
              </div>
            </div>
          </div>
        )}

        <div className="row">
          <div className="col-12 d-flex flex-column align-items-center justify-content-center">
            <div className="intro__data justify-content-center">
              {startDate && (
                <div>
                  <p className="--label">DATA APERTURA</p>
                  <p>{startDate}</p>
                </div>
              )}
              {endDate && (
                <div>
                  <p className="--label">DATA CHIUSURA</p>
                  <p>{endDate}</p>
                </div>
              )}
            </div>

            {hasPositionsData && (
              <div className="intro__data justify-content-center">
                {openPositions && (
                  <div>
                    <p className="--label">POSIZIONI RICERCATE</p>
                    <p>{openPositions}</p>
                  </div>
                )}
                {hiredPositions && (
                  <div>
                    <p className="--label">POSIZIONI ASSUNTE</p>
                    <p>{hiredPositions}</p>
                  </div>
                )}
              </div>
            )}

            {hasSelectionData && (
              <div className="intro__data justify-content-center --auto-w">
                <div>
                  <p className="--label">PERSONE SELEZIONATE</p>
                  <p>{selectedPeople}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {block?.body && (
          <div className="row job__intro">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <Body data={block?.body} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
