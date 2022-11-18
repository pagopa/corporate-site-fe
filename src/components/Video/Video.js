import React, { useState } from 'react'
import YouTube from 'react-youtube'

import Modal from 'react-modal'

import Image from 'components/Image/Image'

import 'components/Video/Video.sass'

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

  const ytVideoParams =
    'rel=0&showinfo=1&autoplay=1&cc_load_policy=1&color=white&iv_load_policy=3&modestbranding=1&showinfo=0'

  return (
    <>
      <figure className="video">
        {image && <Image image={image.localFile} title={image.altText} />}
        {videoCode && videoModalOpen && (
          <>
            <Modal
              isOpen={videoModalOpen}
              onRequestClose={() => setVideoModalOpen(false)}
              shouldCloseOnEsc={true}
            >
              <button
                className="close"
                onClick={() => setVideoModalOpen(false)}
              >
                close
              </button>
              <div className="video-wrapper">
                <YouTube
                  videoId={videoCode}
                  // id={string}
                  // className={string}
                  // iframeClassName={string}
                  // style={object}
                  // title={string}
                  // loading={string}
                  opts={{
                    playerVars: {
                      // https://developers.google.com/youtube/player_parameters
                      autoplay: 0,
                      rel: 0,
                      showinfo: 1,
                      cc_load_policy: 1,
                      color: 'white',
                      iv_load_policy: 3,
                      modestbranding: 1,
                      showinfo: 0,
                    },
                  }}
                  // onReady={func}
                  // onPlay={func}
                  // onPause={func}
                  // onEnd={func}
                  // onError={func}
                  // onStateChange={func}
                  // onPlaybackRateChange={func}
                  // onPlaybackQualityChange={func}
                />
                {/* <iframe
                  width="100%"
                  height="100%"
                  src={`//www.youtube-nocookie.com/embed/${videoCode}?${ytVideoParams}&vq=hd1080`}
                  frameBorder="0"
                  allow={
                    'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                  }
                  allowFullScreen={true}
                  tabIndex="-1"
                /> */}
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
