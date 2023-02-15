import { graphql } from 'gatsby';
import React from 'react';

export const SharedBlockBodyFragment = graphql`
	fragment SharedBlockBody on STRAPI__COMPONENT_SHARED_BLOCK_INTROBody {
		data {
			childMarkdownRemark {
				html
			}
			id
		}
	}
`;

export const SharedBlockBody = ({
	data: { data },
}: {
	data: Queries.SharedBlockBodyFragment;
}) => (
	<div
		className="wysiwyg"
		dangerouslySetInnerHTML={{
			__html: data?.childMarkdownRemark?.html as string,
		}}
	/>
);
