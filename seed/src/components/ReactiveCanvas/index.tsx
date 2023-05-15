import { useAnimation } from "#/hooks/useAnimation";
import useForwardRef from "#/hooks/useForwardRef";
import styled from "@emotion/styled";
import { forwardRef, useEffect } from "react";

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const ReactiveCanvas = forwardRef<HTMLCanvasElement>((_, ref) => {
  const canvasRef = useForwardRef<HTMLCanvasElement>(ref, null);
  useEffect(() => {
    const canvas = canvasRef.current;
    [canvas.width, canvas.height] = [canvas.offsetWidth * 2, canvas.offsetHeight * 2];
  }, [canvasRef]);

  return <Canvas ref={canvasRef} />;
});

ReactiveCanvas.displayName = "ReactiveCanvas";

export default ReactiveCanvas;
