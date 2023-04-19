import { useScreenCapture } from "#/hooks/useScreenCapture";
import { useEffect, useRef } from "react";
import { useAnimation } from "#/hooks/useAnimation";
export default function CaptureTest() {
  const { selectScreen, videoRef } = useScreenCapture();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { drawFrame } = useAnimation();

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;
    console.log(videoRef);
    drawFrame(videoRef.current, canvasRef.current);
  }, [drawFrame, videoRef, canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} />
      <button onClick={selectScreen}>화면 선택</button>
    </div>
  );
}
