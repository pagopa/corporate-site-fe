import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { YouTubePlayer, Options } from 'youtube-player/dist/types';
import { Image } from '../Image';
import './Video.sass';
import { useI18next, useTranslation } from 'gatsby-plugin-react-i18next';

const youtubeParser = (url: string) => {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
};

type VideoProps = {
  image?: Queries.STRAPI__MEDIA | null;
  video: string;
  isSlideChange?: boolean;
  currentSlideIndex?: number;
};

const Video = ({
  image,
  video,
  isSlideChange,
  currentSlideIndex,
}: VideoProps) => {
  const { language } = useI18next();
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoActive, setVideoActive] = useState(false);
  const [videoPreview, setVideoPreview] = useState(true);
  const [videoInstance, setVideoInstance] = useState<YouTubePlayer | null>(
    null
  );

  const videoCode = video ? youtubeParser(video) : false;

  const videoLabelId = `video-label-${videoCode}`;

  const videoRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handlePlay = useCallback(() => {
    if (videoInstance) {
      videoInstance.playVideo();
    }
  }, [videoInstance]);

  const handleStop = useCallback(() => {
    if (videoInstance) {
      videoInstance.pauseVideo();
    }
  }, [videoInstance]);

  const handlePlayStart = useCallback(() => {
    handlePlay();
    setVideoPreview(false);
    setVideoActive(true);
    videoInstance?.unMute();

    setTimeout(() => {
      buttonRef.current?.focus();
    }, 0);
  }, [handlePlay, videoInstance]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();

        if (videoPreview && !videoActive) {
          handlePlayStart();
        } else if (videoActive && videoInstance) {
          if (isPlaying) {
            videoInstance.pauseVideo();
          } else {
            videoInstance.playVideo();
          }
        }
      }
    },
    [videoPreview, videoActive, videoInstance, isPlaying, handlePlayStart]
  );

  // Iframe focusable only when video is active ---
  useEffect(() => {
    if (videoInstance && typeof videoInstance.getIframe === 'function') {
      const iframe = videoInstance.getIframe() as unknown as HTMLIFrameElement;

      if (iframe && iframe.setAttribute) {
        if (videoActive) {
          iframe.removeAttribute('tabindex');
        } else {
          iframe.setAttribute('tabindex', '-1');
        }
      }
    }
  }, [videoActive, videoInstance]);

  useEffect(() => {
    if (isSlideChange && currentSlideIndex !== 0) {
      handleStop();
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => {
        setVideoActive(false);
      }, 0);
    }
  }, [isSlideChange, currentSlideIndex, handleStop]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx: gsap.Context | null = null;

    if (videoInstance !== null && videoRef.current) {
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
  }, [videoInstance, videoPreview, handlePlay, handleStop]);

  const playerOptions: Options = {
    playerVars: {
      autoplay: 0,
      hl: language,
      rel: 0,
      cc_load_policy: 1,
      color: 'white',
      iv_load_policy: 3,
      modestbranding: 1,
      //@ts-expect-error this props are missing in the type definition but used
      showInfo: 0,
      mute: 1,
      cc_lang_pref: language,
      enablejsapi: 1,
    },
  };

  return (
    // Accessibility: figure with group role and linked label
    <figure
      className="video"
      ref={videoRef}
      role="group"
      aria-labelledby={videoLabelId}
    >
      {/* Visually hidden label but read by screen readers to name the group */}
      <div
        id={videoLabelId}
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        {t('youtubeVideo')}
      </div>

      {videoCode && (
        <YouTube
          videoId={videoCode}
          id={`video-${videoCode}`}
          className="video__frame"
          opts={playerOptions}
          title={t('youtubeVideo')}
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
            aria-label={t('playVideo')}
            // Accessibility: Associate button with video title
            aria-describedby={videoLabelId}
            onClick={handlePlayStart}
            onKeyDown={handleKeyDown}
          >
            play
          </button>
        </>
      )}

      {!videoPreview && videoActive && (
        <button
          ref={buttonRef}
          className="video__control"
          aria-label={isPlaying ? t('pauseVideo') : t('resumeVideo')}
          // Accessibility: Associate pause button with title as well
          aria-describedby={videoLabelId}
          onClick={() => (isPlaying ? handleStop() : handlePlay())}
          onKeyDown={handleKeyDown}
        >
          {isPlaying ? 'pause' : 'play'}
        </button>
      )}
    </figure>
  );
};

export default Video;
