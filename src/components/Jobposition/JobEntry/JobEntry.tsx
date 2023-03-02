import React from 'react';

import './JobEntry.sass';

export const JobEntry = ({
  jobposition,
}: {
  jobposition: Queries.JobpositionFragment;
}) => (
  <article className="job-entry">
    <h4 className="--primary job-entry__title">
      {jobposition?.title}
      {jobposition?.isNew && <span>NEW</span>}
    </h4>
    <p className="job-entry__timeframe">
      {jobposition?.openDate && `Data di apertura: ${jobposition.openDate}`}
      {jobposition?.closeDate &&
        ` - Data di chiusura: ${jobposition.closeDate}`}
    </p>
  </article>
);
