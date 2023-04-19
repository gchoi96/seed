import { useScreenCapture } from "#/hooks/useScreenCapture";
import { useCallback, useEffect, useRef } from "react";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";

export default function CaptureTest() {
  const { selectScreen, videoRef } = useScreenCapture();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawFrame = useCallback(
    (video: HTMLVideoElement, canvas: HTMLCanvasElement) =>
      requestAnimationFrame(function drawFrame() {
        canvas.getContext("2d")?.drawImage(video, 0, 0);
        requestAnimationFrame(drawFrame);
      }),
    []
  );

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;
    console.log(videoRef)
    drawFrame(videoRef.current, canvasRef.current);
  }, [drawFrame, videoRef, canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef}/>
      <button onClick={selectScreen}>화면 선택</button>
    </div>
  );
}
