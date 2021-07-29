import React, { useLayoutEffect } from 'react'

import { Parallax, useController } from 'react-scroll-parallax'

const BackgroundGraphics = ({ data }) => {
  
  const { parallaxController } = useController()
  useLayoutEffect(() => {
    const handler = () => parallaxController.update()
    window.addEventListener('load', handler)
    return () => window.removeEventListener('load', handler)
  }, [parallaxController])

  return (
    <>
      {data.map((el, key) => {
        const { size, xposition, yposition } = el

        return (
          <Parallax
            key={key}
            y={[-10, 10]}
            styleOuter={{
              position: `absolute`,
              display: `block`,
              top: `${yposition}%`,
              left: `${xposition}%`,
              zIndex: -1,
            }}
          >
            <span
              style={{
                display: `block`,
                position: `relative`,
                width: `${size / 10}rem`,
                height: `${size / 10}rem`,
                backgroundColor: `#ebfdff`,
                borderRadius: `50%`,
              }}
            />
          </Parallax>
        )
      })}
    </>
  )
}

export default BackgroundGraphics
