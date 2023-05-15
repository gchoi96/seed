import { useCallback } from "react";

export const useAnimation = () => {
  const drawFrame = useCallback(
    (src: CanvasImageSource, canvas: HTMLCanvasElement) =>
      requestAnimationFrame(function drawFrame() {
        //drawImage 매개변수 관련 예전에 리뷰 받았던 PR 참조 https://github.com/Themion/javascript-p4-bmtown/pull/10
        canvas.getContext("2d")?.drawImage(src, 0, 0, 100, 100);
        requestAnimationFrame(drawFrame);
      }),
    []
  );

  return { drawFrame };
};
