import { createRef, useEffect, useRef, useState } from "react";

export const useScreenCapture = () => {
  const videoRef = useRef<HTMLVideoElement>();

  useEffect(() => {
    videoRef.current = document.createElement("video");
    videoRef.current.autoplay = true;
  }, []);

  const selectScreen = () => {
    navigator.mediaDevices.getDisplayMedia({ video: true }).then((screen) => {
      if (!videoRef.current) return;
      videoRef.current.srcObject = screen;
      console.log(videoRef);
    });
  };

  return { selectScreen, videoRef };
};
