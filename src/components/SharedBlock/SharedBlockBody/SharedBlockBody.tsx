import classNames from 'classnames';
import { graphql } from 'gatsby';
import React, {MutableRefObject} from 'react';

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
  className,
  forwardRef,
}: {
  data: Queries.SharedBlockBodyFragment;
  className?: string;
  forwardRef?: MutableRefObject<any>;
}) => (
  <div
    className={classNames('wysiwyg', className)}
    ref={forwardRef}
    dangerouslySetInnerHTML={{
      __html: data?.childMarkdownRemark?.html as string,
    }}
  />
);
