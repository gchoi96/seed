import { useAnimation } from "#/hooks/useAnimation";
import useForwardRef from "#/hooks/useForwardRef";
import styled from "@emotion/styled";
import { forwardRef, useEffect } from "react";

interface ReactiveCanvasProps{
  
}

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const ReactiveCanvas = forwardRef<HTMLCanvasElement, ReactiveCanvasProps>((props, ref) => {
  const canvasRef = useForwardRef<HTMLCanvasElement>(ref, null);
  const { drawFrame } = useAnimation();
  useEffect(() => {
    const canvas = canvasRef.current;
    [canvas.width, canvas.height] = [canvas.offsetWidth, canvas.offsetHeight];
  }, [canvasRef]);

  return <Canvas ref={canvasRef} />;
});

ReactiveCanvas.displayName = "ReactiveCanvas";

export default ReactiveCanvas;
