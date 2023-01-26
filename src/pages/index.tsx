import React from 'react';

import { StaticQuery, graphql } from 'gatsby';
import { JobEntry } from '../components/Jobposition/JobEntry';

const query = graphql`
	query AllJobs {
		allStrapiJobposition {
			edges {
				node {
					id
					slug
					url_path
					title
					isNew
					openDate
					closeDate
				}
			}
		}
	}
`;

const IndexPage = () => (
	<StaticQuery
		query={query}
		render={(data: Queries.AllJobsQuery) => (
			<ul>
				{data.allStrapiJobposition.edges.map(({ node: jobposition }) => (
					<div className="p-4">
						<JobEntry jobposition={jobposition} />
					</div>
				))}
			</ul>
		)}
	/>
);

export default IndexPage;
