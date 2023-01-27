import React from 'react';
import { ReactSVG } from 'react-svg';

import './Socials.sass';

export const Socials = ({ header }: any) => {
  const collection: any[] = [];

  // socials.forEach(item => {
  //   if (header) {
  //     item.onheader && collection.push(item)
  // })

  return (
    <>
      <ul className={`socials${header ? ' --in-header' : ''}`}>
        {collection.map((social, key) => {
          return (
            <li key={key}>
              <a
                href={social.link.url}
                target="_blank"
                title={social.link.title}
                rel="noreferrer noopener"
              >
                <ReactSVG
                  src={social.image.localFile.publicURL}
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
