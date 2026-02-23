import type { ReactElement } from 'react';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { Cta } from '../../../partials/Cta';
import { Image } from '../../Image';
import './ProjectsCarousel.sass';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { useTranslation } from 'gatsby-plugin-react-i18next';

export const ProjectsCarousel = ({
  title,
  projects,
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_PROJECTS_CAROUSEL_Fragment): ReactElement => {
  const swiperCommons = {
    speed: 480,
    spaceBetween: 16,
    slidesPerView: 1.1,
    loop: true,
  };

  const { language } = useI18next();
  const { t } = useTranslation();

  return (
    <section className="block block-project-carousel projects-carousel">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-11 offset-md-1 d-flex align-items-center justify-content-center">
            <header className="projects-carousel__header">
              <button className="projects-carousel__nav prev" />
              {title && <h2>{title}</h2>}
              <button className="projects-carousel__nav next" />
            </header>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row d-flex align-items-center">
          <div className="col-12">
            <div className="projects-carousel__content">
              <Swiper
                speed={swiperCommons.speed}
                spaceBetween={swiperCommons.spaceBetween}
                slidesPerView={swiperCommons.slidesPerView}
                breakpoints={{
                  992: {
                    slidesPerView: 1.63,
                    spaceBetween: 40,
                  },
                  1200: {
                    slidesPerView: 2,
                    spaceBetween: 60,
                  },
                }}
                navigation={{
                  prevEl: '.projects-carousel__nav.prev',
                  nextEl: '.projects-carousel__nav.next',
                }}
                a11y={{
                  enabled: true,
                  prevSlideMessage: t('slider.prevSlideMessage'),
                  nextSlideMessage: t('slider.nextSlideMessage'),
                  firstSlideMessage: t('slider.firstSlideMessage'),
                  lastSlideMessage: t('slider.lastSlideMessage'),
                  paginationBulletMessage: t('slider.paginationBulletMessage'),
                }}
              >
                {projects?.map((item, key) => {
                  const {
                    carouselAbstract,
                    carouselCtaLabel,
                    carouselImage,
                    carouselTitle,
                    featuredImage,
                    slug,
                  } = item || {};

                  return (
                    <SwiperSlide
                      key={key}
                      aria-label={carouselTitle}
                      role="group"
                      aria-describedby={`slide-content-${key}`}
                    >
                      <article className="projects-carousel__item">
                        <div>
                          <h3 id={`slide-title-${key}`}>{carouselTitle}</h3>
                          {(featuredImage || carouselImage) && (
                            <Image
                              data={
                                (carouselImage ||
                                  featuredImage) as Queries.STRAPI__MEDIA
                              }
                            />
                          )}
                        </div>
                        <div
                          className="project-carousel__item__cta"
                          id={`slide-content-${key}`}
                        >
                          {carouselAbstract && (
                            <div className="wysiwyg">
                              <p>{carouselAbstract}</p>
                            </div>
                          )}
                          {carouselCtaLabel && (
                            <Cta
                              label={carouselCtaLabel}
                              title={carouselTitle}
                              href={`/${language}/${t(
                                'productsAndServices'
                              )}/${slug}`}
                              variant="white-hollow"
                            />
                          )}
                        </div>
                      </article>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
