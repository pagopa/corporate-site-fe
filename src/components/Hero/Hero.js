import React, { useState } from 'react'

import SwiperCore, {
  Navigation,
  Pagination,
  EffectFade,
  Controller,
} from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/effect-fade/effect-fade.min.css'

import Cta from '../Cta/Cta'
import Image from '../Image/Image'

import './Hero.sass'

SwiperCore.use([Navigation, Pagination, EffectFade, Controller])

const Hero = ({ data }) => {

  const [contentSwiper, setContentSwiper] = useState(null)

  const { items } = data

  const swiperCommons = {
    speed: 480,
    spaceBetween: 0,
    slidesPerView: 1,
    loop: true,
  }

  return (
    <section className="block --hero hero">
      <div className="hero__background" />
      <div className="container-fluid">
        <button className="hero__nav --prev" title="prev" aria-labelledby="prev" />
        <button className="hero__nav --next" title="next" aria-labelledby="next" />

        <div className="row d-flex align-items-center">
          <div className="col-12 col-lg-6 offset-lg-1">
            <div className="hero__content">
              <Swiper
                speed={swiperCommons.speed}
                spaceBetween={swiperCommons.spaceBetween}
                slidesPerView={swiperCommons.slidesPerView}
                loop={swiperCommons.loop}
                allowTouchMove={false}
                effect="fade"
                fadeEffect={{
                  crossFade: true,
                }}
                onSwiper={setContentSwiper}
              >
                {items.map(({ content }, key) => {
                  return (
                    <SwiperSlide key={key}>
                      <article>
                        <h1>{content.title}</h1>
                        <div
                          dangerouslySetInnerHTML={{ __html: content.text }}
                        />
                        {content.link && (
                          <Cta
                            label={content.link.title}
                            url={content.link.url}
                            blank={content.link.target}
                            variant="white"
                          />
                        )}
                      </article>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div className="hero__image">
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
                pagination={{
                  clickable: true,
                  el: '.hero__pagination',
                  bulletClass: 'bullet',
                  bulletActiveClass: 'is-current',
                  type: 'bullets',
                }}
                controller={{
                  control: contentSwiper,
                }}
              >
                {items.map(({ image }, key) => {
                  return (
                    <SwiperSlide key={key}>
                      <figure>
                        <Image image={image.localFile} title={image.altText} />
                      </figure>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
