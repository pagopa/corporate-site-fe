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

export const SharedBlock = ({
	data: { body },
}: {
	data: Queries.SharedBlockFragment;
}) => (
	<div
		className="wysiwyg"
		dangerouslySetInnerHTML={{
			__html: body?.data?.childMarkdownRemark?.html as string,
		}}
	/>
);
