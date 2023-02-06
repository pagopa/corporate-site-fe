import { graphql } from 'gatsby';
import React from 'react';
import { SharedBlockBody } from '../../SharedBlockBody';
import { JobIntro } from '../JobIntro';

const iframeURL = 'https://pagopa.applytojob.com/apply/__JOBID__';

export const JobPageFragment = graphql`
  fragment JobPage on STRAPI_JOBPOSITION {
    applicationLink
    embedIdentifier
    ...JobIntro
  }
`;

type JobPageProps = {
  data: Queries.JobPageFragment;
};

export const JobPage = ({
  data: { embedIdentifier, applicationLink, ...jobIntro },
}: JobPageProps) => {
  // const { jobIframe } = useWpOptionsPage().various

  const hasTextBlocks = !!jobIntro?.blocks?.length;
  const hasEmbedForm = !!embedIdentifier;

  const iframeCode = hasEmbedForm
    ? `${iframeURL.replace('__JOBID__', embedIdentifier as string)}`
    : false;

  return (
    <article className="job">
      <JobIntro data={jobIntro} />

      {hasTextBlocks &&
        jobIntro?.blocks
          ?.slice(1)
          .map((block: Queries.SharedBlockFragment | null) => {
            return (
              <section className="job__section" key={block?.id}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                      {block?.title && <h4>{block.title}</h4>}
                      {block?.body && <SharedBlockBody data={block?.body} />}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}

      {applicationLink && (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              {applicationLink}
            </div>
          </div>
        </div>
      )}

      {hasEmbedForm && (
        <section className="job__form">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                <iframe
                  src={iframeCode as string}
                  width="100%"
                  height="1000vw"
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  );
};
