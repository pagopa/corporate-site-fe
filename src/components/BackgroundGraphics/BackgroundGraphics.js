import React, { useEffect, useRef } from 'react'

import { animated, useSpring } from 'react-spring'

const calc = o => `translate3d(0, ${o * 0.05}px, 0)`

const BackgroundGraphics = ({ data }) => {
  const ref = useRef()
  const [{ offset }, set] = useSpring(() => ({ offset: 0 }))

  const handleScroll = () => {
    const posY = ref.current.getBoundingClientRect().top
    const offset = window.pageYOffset - posY
    set.start({ offset })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  })

  return (
    <>
      {data.map((el, key) => {
        const { size, xposition, yposition } = el

        return (
          <div
            key={key}
            ref={ref}
            style={{
              position: `absolute`,
              display: `block`,
              top: `${yposition}%`,
              left: `${xposition}%`,
              zIndex: -1,
            }}
          >
            <animated.span
              style={{
                display: `block`,
                position: `relative`,
                width: `${size / 10}rem`,
                height: `${size / 10}rem`,
                backgroundColor: `#ebfdff`,
                borderRadius: `50%`,
                transform: offset.to(calc)
              }}
            />
          </div>
        )
      })}
    </>
  )
}

export default BackgroundGraphics
