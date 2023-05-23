import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';

import './Cta.sass';
type CtaProps = {
  label: string;
  blank?: boolean;
  variant?: string;
  className?: string;
  href?: string;
};

export const Cta = ({
  label,
  blank = false,
  variant,
  className,
  href = '#',
}: CtaProps) => {
  return (
    <>
      {blank && href ? (
        <a
          target="_blank"
          rel="noopene noreferrer"
          href={href}
          className={classNames('cta', variant && `--${variant}`, className)}
        >
          <span>{label}</span>
        </a>
      ) : (
        <Link
          to={href}
          className={classNames('cta', variant && `--${variant}`, className)}
        >
          <span>{label}</span>
        </Link>
      )}
    </>
  );
};
