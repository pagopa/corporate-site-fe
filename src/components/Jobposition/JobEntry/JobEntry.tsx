import { Link } from 'gatsby';
import React from 'react';

import './JobEntry.sass';

const JobStatus = ({
  jobposition,
}: {
  jobposition: Queries.JobpositionFragment;
}) =>
  !jobposition?.isNew && jobposition?.embedIdentifier !== '' ? (
    <span>STILL ACTIVE</span>
  ) : (
    <span>NEW</span>
  );

export const JobEntry = ({
  jobposition,
  closed
}: {
  jobposition: Queries.JobpositionFragment;
  closed?: boolean
}) => (
  <Link key={jobposition?.id} to={jobposition?.slug}>
    <article className="job-entry">
      <h4 className="--primary job-entry__title">
        {jobposition?.title}
        {closed || <JobStatus jobposition={jobposition}/>}
      </h4>
      <p className="job-entry__timeframe">
        {jobposition?.openDate && `Data di apertura: ${jobposition.openDate}`}
        {jobposition?.closeDate &&
          ` - Data di chiusura: ${jobposition.closeDate}`}
      </p>
    </article>
  </Link>
);
