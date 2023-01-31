import { graphql } from 'gatsby';
import React from 'react';
import { ReactSVG } from 'react-svg';
import { useLocalizedQuery } from '../../hooks/useLocalizedQuery';

import './Socials.sass';

export const Socials = ({ header }: any) => {

  const { localeData: socialsData } = useLocalizedQuery<
    Queries.SocialsFragment,
    Queries.SocialsDataQuery
  >({
    query: graphql`
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
    `,
    type: 'allSocialsJson',
  });

  return socialsData?.links ? (
    <ul className={`socials${header ? ' --in-header' : ''}`}>
      {socialsData?.links.map((social: any) => {
        return (
          <li key={social.url}>
            <a
              href={social.url}
              target="_blank"
              title={social.label}
              rel="noreferrer noopener"
            >
              <ReactSVG src={social.image} wrapper="span" />
            </a>
          </li>
        );
      })}
    </ul>
  ) : null;
};
