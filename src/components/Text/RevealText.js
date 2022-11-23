import React, { useRef, useEffect } from 'react'

import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const RevealText = ({ text }) => {
  const revealRef = useRef()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    gsap.set(revealRef.current, { backgroundPosition: '100% 50%' })

    const ctx = gsap.context(() => {
      gsap.to(revealRef.current, {
        backgroundPosition: '0% 50%',
        ease: 'none',
        scrollTrigger: {
          trigger: revealRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.24,
          onUpdate: ({ progress }) => {
            if (progress > 0.5) {
              gsap.to('mark', {
                backgroundColor: '#caf2f5',
                color: '#171717',
                duration: 0.48,
                stagger: 0.36,
              })
            } else {
              gsap.to('mark', {
                backgroundColor: 'transparent',
                color: 'transparent',
                duration: 0.48,
                stagger: 0.36,
              })
            }
          },
        },
      })
    }, revealRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="wysiwyg" ref={revealRef}>
      {text}
    </div>
  )
}

export default RevealText
