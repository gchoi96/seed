import { useCallback, useEffect, useRef } from "react";

export const useScreenCapture = () => {
  const videoRef = useRef<HTMLVideoElement>();

  useEffect(() => {
    videoRef.current = document.createElement("video");
    videoRef.current.autoplay = true;
  }, []);

  const selectScreen = useCallback(() => {
    navigator.mediaDevices.getDisplayMedia({ video: true }).then((screen) => {
      if (!videoRef.current) return;
      videoRef.current.srcObject = screen;
    });
  }, [videoRef]);

  return { selectScreen, videoRef };
};
