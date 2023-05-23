import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { YouTubePlayer, Options } from 'youtube-player/dist/types';
import { Image } from '../Image';
import './Video.sass';

const youtubeParser = (url: string) => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
};

type VideoProps = {
  image?: Queries.STRAPI__MEDIA | null;
  video: string;
};

const Video = ({ image, video }: VideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoActive, setVideoActive] = useState(false);
  const [videoPreview, setVideoPreview] = useState(true);
  const [videoInstance, setVideoInstance] = useState<YouTubePlayer | null>(
    null
  );

  const videoCode = video ? youtubeParser(video) : false;

  const videoRef = useRef<HTMLElement>(null);

  const handlePlay = () => {
    if (videoInstance) {
      videoInstance.playVideo();
    }
  };

  const handleStop = () => {
    if (videoInstance) {
      videoInstance.pauseVideo();
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context | null = null;

    if (videoInstance !== null) {
      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: videoRef.current,
          start: 'top 60%',
          end: 'bottom 40%',
          onEnter: () => {
            if (videoPreview) handlePlay();
          },
          onEnterBack: () => {
            if (videoPreview) handlePlay();
          },
          onLeave: () => {
            handleStop();
          },
          onLeaveBack: () => {
            handleStop();
          },
        });
      }, videoRef);
    }

    return () => ctx?.revert();
  }, [videoInstance, videoPreview]);

  const playerOptions: Options = {
    playerVars: {
      autoplay: 0,
      rel: 0,
      cc_load_policy: 1,
      color: 'white',
      iv_load_policy: 3,
      modestbranding: 1,
      //@ts-ignore this props are missing in the type definition but used
      showInfo: 0,
      mute: 1,
    },
  };

  return (
    <figure className="video" ref={videoRef}>
      {videoCode && (
        <YouTube
          videoId={videoCode}
          id={`video-${videoCode}`}
          className="video__frame"
          opts={playerOptions}
          onReady={event => setVideoInstance(event.target)}
          onStateChange={e => setIsPlaying(e.data === 1 ? true : false)}
          onEnd={() => setVideoActive(false)}
        />
      )}

      {videoPreview && !isPlaying && !videoActive && image?.localFile && (
        <>{image && <Image className="video__picture" data={image} />}</>
      )}

      {videoPreview && !videoActive && (
        <>
          <div className="video__curtain"></div>
          <button
            className="video__play"
            onClick={() => {
              handlePlay();
              setVideoPreview(false);
              setVideoActive(true);
              videoInstance?.unMute();
            }}
          >
            play
          </button>
        </>
      )}
    </figure>
  );
};

export default Video;
