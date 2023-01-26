import React from 'react';
import { graphql, PageProps } from 'gatsby';
import { JobPage } from '../components/Jobposition/JobPage';
import { Layout } from '../components/Layout';

export const query = graphql`
	query StrapiJobposition($id: String) {
		strapiJobposition(id: { eq: $id }) {
			...JobPage
		}
	}
`;

export default function Component({
	data: { strapiJobposition },
}: PageProps<Queries.StrapiJobpositionQuery>) {
	return (
		<Layout>
			{/* <SeoHelmet yoast={seo} locale={currentLocale} data={pageProps} /> */}
			<JobPage data={strapiJobposition as Queries.JobPageFragment} />
		</Layout>
	);
}
