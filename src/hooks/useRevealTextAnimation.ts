import { useLayoutEffect, RefObject } from 'react';

import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

export const useRevealTextAnimation = ({
  elementRef,
}: {
  elementRef: RefObject<any>;
}) => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // gsap.set(revealRef.current, { backgroundPosition: '100% 50%' });

    const ctx = gsap.context(() => {
      // const marks = [...(revealRef.current?.querySelectorAll(selector) || [])];

      gsap.to(elementRef.current, {
        backgroundPosition: '0% 50%',
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: 0.24,
          onUpdate: ({ progress }) => {
            if (progress > 0.5) {
              gsap.to(elementRef, {
                backgroundColor: '#caf2f5',
                color: '#171717',
                duration: 0.48,
                stagger: 0.36,
              });
            } else {
              gsap.to(elementRef, {
                backgroundColor: 'transparent',
                color: 'transparent',
                duration: 0.48,
                stagger: 0.36,
              });
            }
          },
        },
      });
    }, elementRef);

    return () => ctx.revert();
  }, []);
};
