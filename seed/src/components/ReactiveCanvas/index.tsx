import styled from "@emotion/styled";
import { forwardRef } from "react";

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const ReactiveCanvas = forwardRef<HTMLCanvasElement>((_, ref) => {
  return <Canvas ref={ref} />;
});

ReactiveCanvas.displayName = "ReactiveCanvas";

export default ReactiveCanvas;
