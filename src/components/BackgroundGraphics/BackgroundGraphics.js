import React from 'react'

import { Parallax } from 'react-scroll-parallax'

const BackgroundGraphics = ({ data }) => {
  return (
    <>
      {data.map((el, key) => {
        const { size, xposition, yposition } = el

        return (
          <>
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
          </>
        )
      })}
    </>
  )
}

export default BackgroundGraphics
