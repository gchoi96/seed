import { ICON_DEFAULT_MARGIN, ICON_HEIGHT, IMAGE_PATH, TEXT_AREA_MAX_WIDTH } from "#/constants";
import { Point, RectangleBounds } from "#/types/Point";
import { getBoundsFromMaxPoint } from "#/utils/coordinateUtils";
import { useOpenCV } from "./useOpenCV";
import useTesseract from "./useTesseract";

const useMap = () => {
  const { matchTemplate } = useOpenCV();
  const { extractText } = useTesseract();
  const getTextAreaBounds = (canvas: HTMLCanvasElement, sePoint: Point): RectangleBounds => {
    const imageData = canvas
      .getContext("2d")
      ?.getImageData(sePoint.x, sePoint.y, TEXT_AREA_MAX_WIDTH, ICON_HEIGHT);
    if (!imageData) throw new Error("지도 위치를 찾을 수 없습니다");
    for (let x = ICON_DEFAULT_MARGIN; x < imageData.width; x++) {
      const pixelIndex = (sePoint.x + x) * 4;
      const isEnd = imageData.data.slice(pixelIndex, pixelIndex + 3).every((el) => el > 230);

      if (!isEnd) continue;
      return getBoundsFromMaxPoint({ ...sePoint, y: sePoint.y - ICON_HEIGHT }, x, ICON_HEIGHT);
    }
    return getBoundsFromMaxPoint(
      { ...sePoint, y: sePoint.y - ICON_HEIGHT },
      sePoint.x + TEXT_AREA_MAX_WIDTH,
      ICON_HEIGHT
    );
  };
  const getTitle = async (canvas: HTMLCanvasElement) => {
    const matchBounds = await matchTemplate(canvas, IMAGE_PATH.SEED_ICON);
    return extractText(canvas, getTextAreaBounds(canvas, matchBounds.se));
  };
  return { getTitle };
};

export default useMap;
