import React, { useState } from 'react'

import ModalVideo from 'react-modal-video'

import Image from '../Image/Image'

import './Video.sass'

const Video = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  return (
    <>
      <figure className="video" onClick={() => setIsVideoOpen(!isVideoOpen)}>
        {/* <Image image="http://via.placeholder.com/1920x1080" /> */}
        <img src="http://via.placeholder.com/1920x1080" alt="placeholder" />
      </figure>

      <ModalVideo
        channel="custom"
        autoplay
        url="https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_1920_18MG.mp4"
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
      />
    </>
  )
}

export default Video
