import { useScreenCapture } from "#/hooks/useScreenCapture";
import { useEffect, useRef } from "react";
import { useAnimation } from "#/hooks/useAnimation";
import ReactiveCanvas from "#/components/ReactiveCanvas";
import { useOpenCV } from "#/hooks/useOpenCV";
export default function CaptureTest() {
  const { selectScreen, videoRef } = useScreenCapture();
  const { drawFrame } = useAnimation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { matchTemplate } = useOpenCV();
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;
    drawFrame(videoRef.current, canvasRef.current);
  }, [drawFrame, videoRef, canvasRef]);

  return (
    <div style={{ width: "100vw", height: "100vh", padding: "10%" }}>
      <ReactiveCanvas ref={canvasRef} />
      <button onClick={selectScreen}>화면 선택</button>
      <button
        onClick={() =>
          canvasRef.current &&
          matchTemplate(canvasRef.current, "/images/templates/seed_region_icon.png")
        }
      >
        이미지 분석
      </button>
    </div>
  );
}
