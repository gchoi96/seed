import { useCallback } from "react";

export const useAnimation = () => {
  const drawFrame = useCallback(
    (video: HTMLVideoElement, canvas: HTMLCanvasElement) =>
      requestAnimationFrame(function drawFrame() {
        canvas.getContext("2d")?.drawImage(video, 0, 0);
        requestAnimationFrame(drawFrame);
      }),
    []
  );

  return { drawFrame };
};
