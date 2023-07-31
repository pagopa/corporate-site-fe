import React from 'react';
import SwiperCore, {
  Controller,
  EffectFade,
  Navigation,
  Pagination,
} from 'swiper';
// import 'swiper/components/effect-fade/effect-fade.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import { Cta } from '../../../partials/Cta';
import { Image } from '../../Image';
import { Body } from '../../Remark/Body';
import { Video } from '../../Video';
import './HeroSlider.sass';

SwiperCore.use([Navigation, Pagination, EffectFade, Controller]);

export const HeroSlider = ({
  heroSliderItems,
  slug,
  id
}: Queries.Blocks_STRAPI__COMPONENT_SHARED_BLOCK_HERO_SLIDER_Fragment) => {
  if (heroSliderItems?.length) {
    const swiperCommons = {
      speed: 480,
      spaceBetween: 0,
      slidesPerView: 1,
      loop: heroSliderItems.length > 1 ? true : false,
    };

    const { title, body, link, linkLabel } = heroSliderItems[0] || {};

    return (
      <section className="block --hero hero" id={slug || id}>
        <div className="hero__background" />
        <div className="container-fluid">
          <div className="row d-flex align-items-center">
            <div className="col-12 col-lg-6 offset-lg-1">
              <div className="hero__content">
                {title && body && (
                  <>
                    <article>
                      <h1>{title}</h1>
                      <div className="wysiwyg">
                        <Body data={body} />
                      </div>
                      {link && (
                        <Cta
                          label={linkLabel || title}
                          href={link}
                          blank
                          variant="white"
                        />
                      )}
                    </article>
                  </>
                )}
              </div>
            </div>
            <div className="col-12 col-lg-5">
              <div className="hero__image">
                <button
                  className="hero__nav --prev"
                  title="prev"
                  aria-labelledby="prev"
                />
                <button
                  className="hero__nav --next"
                  title="next"
                  aria-labelledby="next"
                />
                <div className="hero__pagination"></div>
                <Swiper
                  speed={swiperCommons.speed}
                  spaceBetween={swiperCommons.spaceBetween}
                  slidesPerView={swiperCommons.slidesPerView}
                  centeredSlides={true}
                  loop={swiperCommons.loop}
                  navigation={{
                    prevEl: '.hero__nav.--prev',
                    nextEl: '.hero__nav.--next',
                  }}
                  pagination={
                    heroSliderItems.length > 1
                      ? {
                          clickable: true,
                          el: '.hero__pagination',
                          bulletClass: 'bullet',
                          bulletActiveClass: 'is-current',
                          type: 'bullets',
                        }
                      : false
                  }
                >
                  {heroSliderItems.map((item, key) => {
                    const { image, youtubeVideo } = item || {};
                    return (
                      <SwiperSlide key={key}>
                        {youtubeVideo ? (
                          <Video
                            video={youtubeVideo}
                            image={(image as Queries.STRAPI__MEDIA) || null}
                          />
                        ) : (
                          image && (
                            <Image data={image as Queries.STRAPI__MEDIA} />
                          )
                        )}
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
  }
  return <></>;
};
