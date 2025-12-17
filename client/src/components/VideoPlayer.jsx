import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, X } from "lucide-react";

function VideoPlayer({ video }) {
  let videoTag = useRef();
  const [mute, setMute] = useState(false);
  const [play, setPlay] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [zoomVideo, setZoomVideo] = useState(false);
  const handleClick = () => {
    if (play) {
      videoTag.current.pause();
      setPlay(false);
    } else {
      videoTag.current.play();
      setPlay(true);
    }
  };

  useEffect(() => {
    const video = videoTag.current;
    if (!video) return;

    const handleLoading = () => setIsLoaded(true);
    const handlePlay = () => setPlay(true);
    const handlePause = () => setPlay(false);

    video.addEventListener("loadeddata", handleLoading);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    const observer = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting) {
          video.play().catch(console.error);
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 }
    );
    if (video && play) {
      observer.observe(video);
    }
    return () => {
      video.removeEventListener("loadeddata", handleLoading);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);

      if (video) {
        observer.unobserve(video);
      }
    };
  }, [isLoaded]);

  const handleProgressBar = () => {
    const video = videoTag.current;
    if (video) {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
    }
  };

  return (
    <div className="w-45 sm:w-75 md:w-100 flex flex-col items-center">
      <video
        src={video}
        ref={videoTag}
        preload="metadata"
        onClick={handleClick}
        muted={mute}
        className="rounded-xl max-h-80 w-fit self-center"
        onTimeUpdate={handleProgressBar}
        onLoad={() => setPlay(false)}
      />
      <div className="py-2 flex gap-2 sm:gap-4 items-center">
        {play ? (
          <Pause className="cursor-pointer" size={20} onClick={handleClick} />
        ) : (
          <Play className="cursor-pointer" size={20} onClick={handleClick} />
        )}
        {mute ? (
          <VolumeX
            className="cursor-pointer"
            size={20}
            onClick={() => setMute(false)}
          />
        ) : (
          <Volume2
            className="cursor-pointer"
            size={20}
            onClick={() => setMute(true)}
          />
        )}
        <progress
          className="progress w-24 sm:w-49 md:w-72"
          value={`${progress}`}
          max="100"
        ></progress>
        <Maximize
          size={20}
          className="cursor-pointer"
          onClick={() => setZoomVideo(true)}
        />
      </div>
      {zoomVideo && (
        <div className="bg-base-100/80 w-screen h-screen fixed inset-0 flex justify-center z-1000 items-center flex-col">
          <button
            className="fixed btn btn-circle top-20 right-4 cursor-pointer hover:bg-accent-content hover:text-white"
            onClick={() => setZoomVideo(false)}
          >
            <X />
          </button>

          <video
            src={video}
            ref={videoTag}
            preload="metadata"
            onClick={handleClick}
            muted={mute}
            className="rounded-xl py-4 max-h-[70vh] max-w-[95vw] self-center"
            onTimeUpdate={handleProgressBar}
            onLoad={() => setPlay(false)}
          />
          <div className="flex gap-2 sm:gap-4 items-center bottom-20 fixed">
            {play ? (
              <Pause
                className="cursor-pointer"
                size={20}
                onClick={handleClick}
              />
            ) : (
              <Play
                className="cursor-pointer"
                size={20}
                onClick={handleClick}
              />
            )}
            {mute ? (
              <VolumeX
                className="cursor-pointer"
                size={20}
                onClick={() => setMute(false)}
              />
            ) : (
              <Volume2
                className="cursor-pointer"
                size={20}
                onClick={() => setMute(true)}
              />
            )}
            <progress
              className="progress w-52 sm:w-72 md:w-94"
              value={`${progress}`}
              max="100"
            ></progress>
            <Maximize
              size={20}
              className="cursor-pointer"
              onClick={() => setZoomVideo(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
