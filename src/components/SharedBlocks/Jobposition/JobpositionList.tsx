import React from 'react';

import { graphql, Link, useStaticQuery } from 'gatsby';
import { useLocalizedQuery } from '../../../hooks';
import { JobEntry } from '../../Jobposition/JobEntry';

import { JobPastList } from '../../Jobposition/JobPastList';
import './JobpositionList.sass';

export const JobpositionList = () => {
  const query = useStaticQuery(graphql`
    fragment Jobposition on STRAPI_JOBPOSITION {
      id
      slug
      url_path
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

  const { openJobs, pastJobs } = allStrapiJobposition.reduce<
    Record<'openJobs' | 'pastJobs', Queries.JobpositionFragment[]>
  >(
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
            <ul>
              {openJobs.map(jobposition => (
                <Link key={jobposition?.id} to={jobposition?.slug || '/#'}>
                  <div className="p-4">
                    <JobEntry jobposition={jobposition} />
                  </div>
                </Link>
              ))}
            </ul>
            <JobPastList pastJobs={pastJobs} />
          </div>
        </div>
      </div>
    </section>
  );
};
