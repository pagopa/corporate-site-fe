import React from 'react';
import { Cta } from '../../../partials/Cta';
import { Image } from '../../Image';
import { useLocation } from '@reach/router';
import classNames from 'classnames';
import { Body } from '../../Remark/Body';

type IntroMenuProps = {
  menu: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_INTRO_Fragment['introMenu'];
};

const IntroMenu = ({ menu }: IntroMenuProps) => {
  if (!menu?.length) return <></>;

  const { pathname } = useLocation();

  return (
    <nav className="intro-menu">
      <ul>
        {menu.map((item, key) => {
          const { link, title, linkLabel } = item || {};
          if (link) {
            const linkWithoutSlashes = link
              .replace(/\/+$/, '')
              .split('/')
              .pop();
            const isCurrent = pathname.split('/').includes(linkWithoutSlashes);
            return (
              <li key={key} className={classNames(isCurrent && 'is-current')}>
                {(linkLabel || title) && (
                  <Cta
                    label={linkLabel || title}
                    href={isCurrent ? '#' : link}
                    variant="link-simple"
                  />
                )}
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};

export const Intro = ({
  eyelet,
  title,
  image,
  introMenu,
  body,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_INTRO_Fragment) => {
  return (
    <section
      className={classNames('block --block-intro intro', 'mb-0 --nocontent')}
    >
      <div className="container-fluid">
        {(title || eyelet) && (
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-9">
              <div className={title ? 'intro__heading' : 'intro'}>
                <h4>{eyelet}</h4>
                {introMenu && <IntroMenu menu={introMenu} />}
                <h1>{title}</h1>
              </div>
            </div>
          </div>
        )}
        {image && image?.localFile && (
          <div className="row">
            <div className="col-12 col-lg-10 offset-lg-1 d-flex align-items-center justify-content-center">
              {image && <Image data={image as Queries.STRAPI__MEDIA} />}
            </div>
          </div>
        )}
        {body && (
          <div>
            <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
              <Body data={body} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
