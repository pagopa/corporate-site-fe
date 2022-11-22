import React, { useState, useRef, useEffect } from 'react'
import YouTube from 'react-youtube'

import { gsap } from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

import Image from 'components/Image/Image'
import 'components/Video/Video.sass'

// Modal.setAppElement('#___gatsby')

const youtubeParser = url => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  var match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : false
}

const Video = ({ image, video }) => {
  const [videoActive, setVideoActive] = useState(false)
  const [videoPlayed, setVideoPlayed] = useState(false)
  const [videoInstance, setVideoInstance] = useState(null)

  const videoCode = video ? youtubeParser(video) : false

  const handlePlay = (muted, alreadyPlayed) => {
    if (!alreadyPlayed && videoInstance) {
      if (muted) {
        videoInstance.mute()
      } else {
        videoInstance.unMute()
      }
      setVideoActive(true)
      videoInstance.playVideo()
    }
  }

  const handleStop = () => {
    setVideoActive(false)
    videoInstance.pauseVideo()
  }

  const videoRef = useRef()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    let ctx

    if (videoInstance !== null) {
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: videoRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            handlePlay(true, videoPlayed)
            setVideoPlayed(true)
          },
          onEnterBack: () => {
            handlePlay(true, videoPlayed)
            setVideoPlayed(true)
          },
          onLeave: () => handleStop(),
          onLeaveBack: () => handleStop(),
        })
      }, videoRef)
    }

    return () => ctx?.revert()
  }, [videoInstance, videoPlayed])

  return (
    <>
      <figure className="video" ref={videoRef}>
        {videoCode && (
          <YouTube
            videoId={videoCode}
            id={`video-${videoCode}`}
            className="video__frame"
            opts={{
              playerVars: {
                autoplay: 0,
                rel: 0,
                cc_load_policy: 1,
                color: 'white',
                iv_load_policy: 3,
                modestbranding: 1,
                showinfo: 0,
              },
            }}
            onReady={event => setVideoInstance(event.target)}
            onEnd={() => setVideoActive(false)}
          />
        )}

        {!videoActive && (
          <>
            {image && <Image image={image.localFile} title={image.altText} />}
            <div className="video__curtain"></div>
            <button
              className="video__play"
              onClick={() => {
                handlePlay(false, false)
                setVideoPlayed(true)
              }}
            >
              play
            </button>
          </>
        )}
      </figure>
    </>
  )
}

export default Video
