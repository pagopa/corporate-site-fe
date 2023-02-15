import React from 'react';
import { Cta } from '../../../partials/Cta';
import { Image } from '../../Image';
import { useLocation } from '@reach/router';
import classNames from 'classnames';

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
          const { link, title } = item || {};
          if (link && title) {
            const isCurrent = pathname.split('/').includes(link);
            return (
              <li key={key} className={classNames(isCurrent && 'is-current')}>
                <Cta
                  label={title}
                  href={isCurrent ? '#' : link}
                  variant="link-simple"
                />
              </li>
            );
          }
        })}
      </ul>
    </nav>
  );
};

export const SharedBlockIntro = ({
  eyelet,
  title,
  image,
  introMenu,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_INTRO_Fragment) => {
  return (
    <section className="block --block-intro intro mb-0 --nocontent">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-9">
            <div className="intro__heading">
              <h4>{eyelet}</h4>
              {introMenu && <IntroMenu menu={introMenu} />}
              <h1>{title}</h1>
            </div>
          </div>
        </div>
        {image && image?.localFile && (
          <div className="row">
            <div className="col-12 col-lg-10 offset-lg-1 d-flex align-items-center justify-content-center">
              {image && <Image data={image as Queries.STRAPI__MEDIA} />}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
