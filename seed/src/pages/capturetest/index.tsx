import { useScreenCapture } from "#/hooks/useScreenCapture";
import { useEffect, useRef } from "react";
import { useAnimation } from "#/hooks/useAnimation";
import ReactiveCanvas from "#/components/ReactiveCanvas";
import Tesseract from "tesseract.js";
export default function CaptureTest() {
  const { selectScreen, videoRef } = useScreenCapture();
  const { drawFrame } = useAnimation();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;
    drawFrame(videoRef.current, canvasRef.current);
  }, [drawFrame, videoRef, canvasRef]);

  const onClickOCR = () => {
    if (!canvasRef.current) return;
    Tesseract.recognize(canvasRef.current, "eng+kor").then(({ data: { text } }) =>
      console.log(text)
    );
  };

  return (
    <div style={{ width: "100vw", height: "100vh", padding: "10%" }}>
      <ReactiveCanvas ref={canvasRef} />
      <button onClick={selectScreen}>화면 선택</button>
      <button onClick={onClickOCR}>텍스트 추출</button>
    </div>
  );
}
