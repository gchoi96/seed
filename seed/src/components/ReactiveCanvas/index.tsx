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
    [canvas.width, canvas.height] = [canvas.offsetWidth, canvas.offsetHeight];
  }, [canvasRef]);

  return <Canvas ref={canvasRef} />;
});

ReactiveCanvas.displayName = "ReactiveCanvas";

export default ReactiveCanvas;
