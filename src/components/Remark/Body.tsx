import classNames from 'classnames';
import React, { MutableRefObject } from 'react';

export const Body = ({
  data: { data },
  className,
  forwardRef,
}: {
  data: {
    readonly data: {
      readonly id: string;
      readonly childMarkdownRemark: { readonly html: string | null } | null;
    } | null;
  };
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
