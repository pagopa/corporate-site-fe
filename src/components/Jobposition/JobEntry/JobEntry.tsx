import React from 'react';
import { Link } from 'gatsby';

import './JobEntry.sass';

export const JobEntry = ({ jobposition }: { jobposition: any }) => (
	<Link key={jobposition?.id} to={jobposition?.url_path || '/#'}>
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
	</Link>
);