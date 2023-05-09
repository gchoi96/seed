import { useCallback, useEffect, useRef } from "react";

export const useScreenCapture = () => {
  const videoRef = useRef<HTMLVideoElement>();

  useEffect(() => {
    const video = document.createElement("video");
    video.autoplay = true;
    videoRef.current = video;
  }, []);

  const selectScreen = useCallback(() => {
    navigator.mediaDevices.getDisplayMedia({ video: true }).then((screen) => {
      if (!videoRef.current) return;
      videoRef.current.srcObject = screen;
    });
  }, [videoRef]);

  return { selectScreen, videoRef };
};
