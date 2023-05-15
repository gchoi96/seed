import { useScreenCapture } from "#/hooks/useScreenCapture";
import { useEffect, useRef } from "react";
import { useAnimation } from "#/hooks/useAnimation";
import ReactiveCanvas from "#/components/ReactiveCanvas";
import useMap from "#/hooks/useMap";

export default function CaptureTest() {
  const { selectScreen, videoRef } = useScreenCapture();
  const { drawFrame } = useAnimation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { getTitle } = useMap();
  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;
    drawFrame(videoRef.current, canvasRef.current);
  }, [drawFrame, videoRef, canvasRef]);

  return (
    <div style={{ width: "100vw", height: "100vh", padding: "10%" }}>
      <ReactiveCanvas ref={canvasRef} />
      <button onClick={selectScreen}>화면 선택</button>
      <button
        onClick={async () => canvasRef.current && console.log(await getTitle(canvasRef.current))}
      >
        글자 추출
      </button>
    </div>
  );
}
