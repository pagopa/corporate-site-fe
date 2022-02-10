import React, { useState } from 'react'

import ModalVideo from '../../plugins/video-modal'

import Image from '../Image/Image'

import './Video.sass'

const youtubeParser = url => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  var match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : false
}

const Video = ({ image, video }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  const videoCode = video ? youtubeParser(video) : false

  const ytVideoParams = {
    youtube: {
      color: 'white',
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline: null,
      rel: 0,
      showinfo: 0
    },
  }

  return (
    <>
      <figure className="video">
        {image && <Image image={image.localFile} title={image.altText} />}
        {videoCode && (
          <ModalVideo
            channel="youtube"
            autoplay
            {...ytVideoParams}
            videoId={videoCode}
            isOpen={videoModalOpen}
            onClose={() => setVideoModalOpen(false)}
          />
        )}
        <div className="video__curtain"></div>
        <button className="video__play" onClick={() => setVideoModalOpen(true)}>play</button>
      </figure>
    </>
  )
}

export default Video
