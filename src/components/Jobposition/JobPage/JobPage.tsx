import React, { useRef } from 'react';
import { Body } from '../../Remark/Body';
import { JobIntro } from '../JobIntro';

const iframeURL =
  'https://career55.sapsf.eu/sfcareer/jobreqcareer?jobId=__JOBID__&company=pagopaspa';

type JobPageProps = {
  data: Queries.JobPageFragment;
};

export const JobPage = ({
  data: { embedIdentifier, applicationLink, ...jobIntro },
}: JobPageProps) => {
  const hasTextBlocks = !!jobIntro?.blocks?.length;
  const hasEmbedForm = !!embedIdentifier;

  const iframeCode = hasEmbedForm
    ? `${iframeURL.replace('__JOBID__', embedIdentifier as string)}`
    : false;

  return (
    <article className="job">
      <JobIntro data={jobIntro} />

      {hasTextBlocks &&
        jobIntro?.blocks?.map((block, key) => {
          return (
            <section className="job__section" key={key}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                    {block?.title && <h4>{block.title}</h4>}
                    {block?.body && <Body data={block?.body} />}
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
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <iframe
                  id="iframe-apply"
                  src={iframeCode as string}
                  width="1000rem"
                  height="500vw"
                />
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  );
};
