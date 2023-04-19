import {  useRef, useState } from "react";

export const useScreenCapture = () => {
  const [screen, setScreen] = useState<MediaStream>();
  
  const selectScreen = () => {
    navigator.mediaDevices
    .getDisplayMedia({ video: true })
    .then(setScreen);
  }

  return { selectScreen, screen };
};
