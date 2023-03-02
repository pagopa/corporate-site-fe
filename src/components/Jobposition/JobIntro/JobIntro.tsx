import { graphql } from 'gatsby';
import React from 'react';

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

export const JobIntroFragment = graphql`
  fragment JobIntro on STRAPI_JOBPOSITION {
    closeDate
    hiredPositions
    openDate
    openPositions
    selectedPeople
    title
    eyelet
  }
`;

export const JobIntro = ({
  data: {
    closeDate,
    hiredPositions,
    openDate,
    openPositions,
    selectedPeople,
    title,
    eyelet,
  },
}: {
  data: Queries.JobIntroFragment;
}) => {
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
        {title && (
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <div className="intro__heading">
                {eyelet && <h4>{eyelet}</h4>}
                {title && <h1>{title}</h1>}
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
      </div>
    </header>
  );
};
