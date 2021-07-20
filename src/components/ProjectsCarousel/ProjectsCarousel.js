import React from 'react'

import SwiperCore, { Navigation } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'

import Cta from '../Cta/Cta'
import Image from '../Image/Image'
import './ProjectsCarousel.sass'

SwiperCore.use([Navigation])

const ProjectsCarousel = ({ data, locale, classes }) => {
  const { items } = data

  const swiperCommons = {
    speed: 480,
    spaceBetween: 60,
    slidesPerView: 1.63,
    loop: true,
  }

  return (
    <section className={`block --${classes} projects-carousel`}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-md-10 offset-md-1 d-flex align-items-center justify-content-center">
            <header className="projects-carousel__header">
              <button className="projects-carousel__nav --prev" title="prev" />
              <h2>{data.title}</h2>
              <button className="projects-carousel__nav --next" title="next" />
            </header>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row d-flex align-items-center">
          <div className="col-12 col-md-10 offset-md-1">
            <div className="projects-carousel__content">
              <Swiper
                speed={swiperCommons.speed}
                spaceBetween={swiperCommons.spaceBetween}
                slidesPerView={swiperCommons.slidesPerView}
                navigation={{
                  prevEl: '.projects-carousel__nav.--prev',
                  nextEl: '.projects-carousel__nav.--next',
                }}
              >
                {items.map(({
                      projectCustomFields,
                      title,
                      slug,
                      featuredImage,
                      nodeType,
                    },
                    key
                  ) => {
                    const content = projectCustomFields.carouselFields
                    const projectPostTitle = content.title
                      ? content.title
                      : title
                    const projectPostAbstract = content.text
                      ? content.text
                      : false
                    const image = content.image
                      ? content.image
                      : featuredImage
                      ? featuredImage.node
                      : false

                    return (
                      <SwiperSlide key={key}>
                        <article className="projects-carousel__item">
                          <div>
                            <h1>{projectPostTitle}</h1>
                            {image && (
                              <Image
                                image={image.localFile}
                                title={image.altText ? image.altText : 'image'}
                              />
                            )}
                          </div>
                          <div>
                            {projectPostAbstract && (
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: projectPostAbstract,
                                }}
                              />
                            )}
                            <Cta
                              label={content.button}
                              url={`${slug}`}
                              locale={locale}
                              type={nodeType}
                              variant="white-hollow"
                            />
                          </div>
                        </article>
                      </SwiperSlide>
                    )
                  }
                )}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectsCarousel
