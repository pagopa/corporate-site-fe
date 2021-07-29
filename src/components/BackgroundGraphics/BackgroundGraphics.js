import React, { useState, useEffect } from 'react'

// import { useInView } from 'react-intersection-observer'
import { Parallax } from 'react-scroll-parallax';

const BackgroundGraphics = ({ data }) => {
  // const [scrolled, setScrolled] = useState(0)
  // const [directionDown, setDirectionDown] = useState(true)
  // const { ref, inView, entry } = useInView()
  

  // const handleScroll = () => {
  //   console.log(directionDown)
  //   setScrolled(scrolled => directionDown ? scrolled + 1 : scrolled - 1)
  // }
  // const handleDirection = isDown => setDirectionDown(directionDown => isDown ? !directionDown : directionDown)

  // useEffect(() => {
  //   let lastScrollTop = 0
  //   window.addEventListener('scroll', () => {
  //     const st = window.pageYOffset
  //     if (st > lastScrollTop) {
  //       handleDirection(true)
  //     } else {
  //       handleDirection(false)
  //     }
  //     lastScrollTop = st <= 0 ? 0 : st
  //   })
  //   return () => window.removeEventListener('scroll', handleDirection)
  // }, [])

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll)
  //   return () => window.removeEventListener('scroll', handleScroll)
  // }, [])

  return (
    <div>
      {data.map((el, key) => {
        const { size, xposition, yposition } = el

        return (
          <Parallax
            key={key}
            y={[-15, 15]}
            styleOuter={{
              position: `absolute`,
              display: `block`,
              top: `${xposition}%`,
              left: `${yposition}%`,
              zIndex: -1,
            }}
          >
            <span 
              
              // ref={ref}
              style={{
                display: `block`,
                width: `${size / 10}rem`,
                height: `${size / 10}rem`,
                backgroundColor: `#ebfdff`,
                borderRadius: `50%`,
                // transform: `translate3d(0, ${scrolled * 0.5}px, 0)`,
              }}
            />
          </Parallax>
        )
      })}
    </div>
  )
}

export default BackgroundGraphics
