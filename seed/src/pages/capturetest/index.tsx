import { useScreenCapture } from "#/hooks/useScreenCapture";
import { useEffect, useRef } from "react";

export default function CaptureTest() {
  const { selectScreen, screen } = useScreenCapture();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!screen) return;
    if (!videoRef.current) return;
    videoRef.current.srcObject = screen;
  }, [screen]);

  return (
    <div>
      <video ref={videoRef} autoPlay></video>
      <button onClick={selectScreen}>화면 선택</button>
    </div>
  );
}
