import React from 'react';
import { Cta } from '../../../partials/Cta';
import { Image } from '../../Image';
import { useLocation } from '@reach/router';
import classNames from 'classnames';
import { Body } from '../../Remark/Body';
import { useTranslation } from 'gatsby-plugin-react-i18next';

type IntroMenuProps = {
  menu: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_INTRO_Fragment['introMenu'];
  pathname: string;
};

const IntroMenu = ({ menu, pathname }: IntroMenuProps) => {
  if (!menu?.length) return <></>;

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
            const urlSplit = pathname.replace(/\/+$/, '').split('/');

            const isCurrent =
              urlSplit[urlSplit.length - 1] === linkWithoutSlashes;

            return (
              <li key={key} className={classNames(isCurrent && 'is-current')}>
                {(linkLabel || title) && (
                  <Cta
                    label={linkLabel || title}
                    href={link}
                    variant="link-simple"
                    as="h1"
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
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isSustainableDev =
    title === 'Il nostro impegno per uno sviluppo sostenibile';
  const isProjects = eyelet === t('intro.projectsEyelet');

  function renderEyelet() {
    if (!eyelet) return null;
    if (isProjects) return <div className="h4">{eyelet}</div>;
    return <h1 className="h4">{eyelet}</h1>;
  }

  return (
    <section
      className={classNames('block block-intro intro', 'mb-0 nocontent')}
    >
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-9">
            <div className={title ? 'intro__heading' : 'intro'}>
              {renderEyelet()}
              {introMenu && <IntroMenu menu={introMenu} pathname={pathname} />}
              {isSustainableDev ? (
                <h1 className="h1">{title}</h1>
              ) : (
                <h2 className="h1">{title}</h2>
              )}
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
