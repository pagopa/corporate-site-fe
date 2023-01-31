import { graphql, useStaticQuery } from 'gatsby';
import {useTranslation} from 'gatsby-plugin-react-i18next';
import React from 'react';
import { ReactSVG } from 'react-svg';

import './Socials.sass';

export const Socials = ({ header }: any) => {
  const collection: any[] = [];

  const {
    i18n: { language },
  } = useTranslation();

  const {
    allSocialsJson: { nodes },
  } = useStaticQuery(graphql`
    query {
      allSocialsJson {
        nodes {
          locale
          links {
            image
            label
            url
          }
        }
      }
    }
  `);

  const { links } = nodes.find((node: any) => node.locale === language);
  console.debug(links);

  return (
    <>
      <ul className={`socials${header ? ' --in-header' : ''}`}>
        {links.map((social: any) => {
          return (
            <li key={social.url}>
              <a
                href={social.url}
                target="_blank"
                title={social.label}
                rel="noreferrer noopener"
              >
                <ReactSVG
                  src={social.image}
                  wrapper="span"
                />
              </a>
            </li>
          );
        })}
      </ul>
    </>
  );
};
