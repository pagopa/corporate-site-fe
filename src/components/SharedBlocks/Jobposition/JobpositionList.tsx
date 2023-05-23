import React from 'react';

import { graphql, Link, useStaticQuery } from 'gatsby';
import { useLocalizedQuery } from '../../../hooks';
import { JobEntry } from '../../Jobposition/JobEntry';

import { JobPastList } from '../../Jobposition/JobPastList';
import './JobpositionList.sass';
import { Body } from '../../Remark/Body';
import { Cta } from '../../../partials/Cta';

const LinksAttachments = ({
  links,
}: {
  links: readonly Queries.STRAPI__COMPONENT_BLOCK_CONTEXT_LINK_ATTACHMENT[];
}) => (
  <div className="jobs-listing__links-attachment">
    <ul>
      {links &&
        links.map((link, index) => {
          return (
            <li key={index}>
              {link?.attachment?.url && (
                <Cta
                  label={link.link}
                  href={link.attachment.url}
                  variant="link"
                />
              )}
            </li>
          );
        })}
    </ul>
  </div>
);

export const JobpositionList = ({
  body,
  eyelet,
  links,
  title,
  commons,
}: Queries.STRAPI__COMPONENT_SHARED_BLOCK_JOBS_LISTING) => {
  const query = useStaticQuery(graphql`
    fragment Jobposition on STRAPI_JOBPOSITION {
      id
      slug
      title
      isNew
      locale
      openDate
      closeDate
    }
    query AllJobs {
      allStrapiJobposition {
        nodes {
          ...Jobposition
        }
      }
    }
  `);

  const { localeNodes: allStrapiJobposition } = useLocalizedQuery<
    Queries.JobpositionFragment,
    Queries.AllJobsQuery
  >({
    query,
    type: 'allStrapiJobposition',
  });

  const byRecentJobOpening = (
    job: Queries.JobpositionFragment,
    nextJob: Queries.JobpositionFragment
  ) => new Date(nextJob.openDate).getTime() - new Date(job.openDate).getTime();

  const { openJobs, pastJobs } = allStrapiJobposition
    .sort(byRecentJobOpening)
    .reduce<Record<'openJobs' | 'pastJobs', Queries.JobpositionFragment[]>>(
      (acc, job) => {
        const now = new Date().getTime();
        const jobExpiration = job?.closeDate
          ? new Date(job.closeDate).getTime()
          : now;

        return jobExpiration >= now
          ? { ...acc, openJobs: [...acc.openJobs, job] }
          : { ...acc, pastJobs: [...acc.pastJobs, job] };
      },
      { openJobs: [], pastJobs: [] }
    );

  return (
    <section className="block --block-jobs-listing jobs-listing">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            {eyelet && <h4>{eyelet}</h4>}
            {title ? <h1>{title}</h1> : false}
            {body && <Body data={body} />}
            {!!commons?.length && (
              <div className="jobs-listing__common">
                {commons.map((feature, key) => {
                  const { title, body } = feature;
                  return (
                    <div
                      className="row align-items-center mb-4 mb-xl-3"
                      key={key}
                    >
                      <div className="col-12 col-xl-4">
                        <h4 className="mb-0">{title}</h4>
                      </div>
                      <div className="col-12 col-xl-8">
                        <p className="mb-0">{body}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="jobs-listing__disclaimer">
              <p>
                Prima di inviare la candidatura ricorda di leggere la{' '}
                <a href="https://www.pagopa.it/it/privacy-policy-candidati/">
                  Privacy Policy
                </a>
              </p>
            </div>

            {links && <LinksAttachments links={links} />}
            <div className="jobs-listing__list">
              {openJobs.map(jobposition => (
                <div className="p-4">
                  <JobEntry jobposition={jobposition} />
                </div>
              ))}
            </div>
            <JobPastList pastJobs={pastJobs} />
          </div>
        </div>
      </div>
    </section>
  );
};
