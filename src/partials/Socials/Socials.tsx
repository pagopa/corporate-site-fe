import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import { ReactSVG } from 'react-svg';
import { useLocalizedQuery } from '../../hooks/useLocalizedQuery';

import './Socials.sass';

type SocialsProps = {
  header?: boolean;
  ariaLabelledBy?: string;
};

export const Socials = ({ header, ariaLabelledBy }: SocialsProps) => {
  const query = useStaticQuery(graphql`
    fragment Socials on SocialsJson {
      locale
      links {
        image
        label
        url
      }
    }
    query SocialsData {
      allSocialsJson {
        nodes {
          ...Socials
        }
      }
    }
  `);

  const {
    localeNodes: [socialsData],
  } = useLocalizedQuery<Queries.SocialsFragment, Queries.SocialsDataQuery>({
    query,
    type: 'allSocialsJson',
  });

  return socialsData?.links ? (
    <ul
      aria-labelledby={ariaLabelledBy}
      className={`socials${header ? ' in-header' : ''}`}
    >
      {socialsData?.links.map(social => {
        if (!social) return null;
        return (
          <li key={social.url}>
            <a
              href={social.url ?? undefined}
              target="_blank"
              title={social.label ?? undefined}
              rel="noreferrer noopener"
            >
              <ReactSVG src={social.image ?? ''} wrapper="span" />
            </a>
          </li>
        );
      })}
    </ul>
  ) : null;
};
