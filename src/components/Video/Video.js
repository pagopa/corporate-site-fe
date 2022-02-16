import React, { useState } from 'react'
import Modal from 'react-modal'

import Image from '../Image/Image'

import './Video.sass'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#___gatsby')

const youtubeParser = url => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  var match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : false
}

const Video = ({ image, video }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false)

  const videoCode = video ? youtubeParser(video) : false


  const ytVideoParams = 'rel=0&showinfo=1&autoplay=1&cc_load_policy=1&color=white&iv_load_policy=3&modestbranding=1&showinfo=0'

  return (
    <>
      <figure className="video">
        {image && <Image image={image.localFile} title={image.altText} />}
        {videoCode && (
          <>
            <Modal
              isOpen={videoModalOpen}
              onRequestClose={() => setVideoModalOpen(false)}
              shouldCloseOnEsc={true}
            >
              <button className="close" onClick={() => setVideoModalOpen(false)}>close</button>
              <div className="video-wrapper">
                <iframe
                  width="100%"
                  height="100%"
                  src={`//www.youtube-nocookie.com/embed/${videoCode}?${ytVideoParams}`}
                  frameBorder="0"
                  allow={'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'}
                  allowFullScreen={true}
                  tabIndex="-1"
                />
              </div>
            </Modal>
          </>
        )}
        <div className="video__curtain"></div>
        <button className="video__play" onClick={() => setVideoModalOpen(true)}>
          play
        </button>
      </figure>
    </>
  )
}

export default Video
