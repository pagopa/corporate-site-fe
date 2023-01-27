import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';

import './Cta.sass';
type CtaProps = {
  label: string;
  url: string;
  blank?: boolean;
  variant?: string;
  className?: string;
  href: string;
};

export const Cta = ({
  label,
  url,
  blank = false,
  variant,
  className,
  href,
}: CtaProps) => {
  if (!url) {
    return (
      <>
        <span
          className={classNames(
            'cta',
            variant ? ` --${variant}` : '',
            className
          )}
        >
          <span>{label}</span>
        </span>
      </>
    );
  }

  return (
    <>
      {blank && href ? (
        <a
          href={href}
          target="_blank"
          className={classNames(
            'cta',
            variant ? ` --${variant}` : '',
            className
          )}
          rel="noopene noreferrer"
        >
          <span>{label}</span>
        </a>
      ) : (
        <Link
          to={href}
          className={classNames(
            'cta',
            variant ? ` --${variant}` : '',
            className
          )}
        >
          <span>{label}</span>
        </Link>
      )}
    </>
  );
};
