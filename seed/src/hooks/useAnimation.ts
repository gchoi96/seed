import { useCallback } from "react";

export const useAnimation = () => {
  const drawFrame = useCallback(
    (video: HTMLVideoElement, canvas: HTMLCanvasElement) =>
      requestAnimationFrame(function drawFrame() {
        const [width, height] = [video.videoWidth, video.videoHeight];
        //drawImage 매개변수 관련 예전에 리뷰 받았던 PR 참조 https://github.com/Themion/javascript-p4-bmtown/pull/10
        canvas
          .getContext("2d")
          ?.drawImage(video, 0, 0, width, height, 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(drawFrame);
      }),
    []
  );

  return { drawFrame };
};
