import { ICON_DEFAULT_MARGIN, ICON_HEIGHT, IMAGE_PATH, TEXT_AREA_MAX_WIDTH } from "#/constants";
import { Point, RectangleBounds } from "#/types/Point";
import { getBoundsFromMaxPoint } from "#/utils/coordinateUtils";
import { convertToGrayscale } from "#/utils/imageUtils";
import { useOpenCV } from "./useOpenCV";
import useTesseract from "./useTesseract";

const useMap = () => {
  const { matchTemplate } = useOpenCV();
  const { extractText } = useTesseract();

  const getTextAreaBounds = (canvas: HTMLCanvasElement, sePoint: Point): RectangleBounds => {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("공유된 화면이 없습니다.");
    const imageData = convertToGrayscale(
      ctx.getImageData(sePoint.x, sePoint.y, TEXT_AREA_MAX_WIDTH, 1)
    );
    let width = sePoint.x + TEXT_AREA_MAX_WIDTH;
    for (let x = ICON_DEFAULT_MARGIN; x < imageData.width; x++) {
      const pixelIndex = (sePoint.x + x) * 4;
      const isEnd = imageData.data.slice(pixelIndex, pixelIndex + 3).every((el) => el > 245);
      if (!isEnd) continue;
      width = x;
      break;
    }
    console.log(getBoundsFromMaxPoint({ ...sePoint, y: sePoint.y - ICON_HEIGHT }, width, ICON_HEIGHT));
    return getBoundsFromMaxPoint({ ...sePoint, y: sePoint.y - ICON_HEIGHT }, width, ICON_HEIGHT);
  };

  const getTitle = async (canvas: HTMLCanvasElement) => {
    const matchBounds = await matchTemplate(canvas, IMAGE_PATH.SEED_ICON);
    
    return extractText(canvas, getTextAreaBounds(canvas, matchBounds.se));
  };
  return { getTitle };
};

export default useMap;
