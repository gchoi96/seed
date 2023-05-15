import { RectangleBounds } from "#/types/Point";
import { convertBoundsToRectangle } from "#/utils/coordinateUtils";
import { createWorker, ImageLike } from "tesseract.js";

const useTesseract = () => {
  const extractText = async (image: ImageLike, bounds: RectangleBounds) => {
    const worker = await createWorker();
    await worker.load();
    await worker.loadLanguage("kor");
    await worker.initialize("kor");
    const {
      data: { text },
    } = await worker.recognize(image, { rectangle: convertBoundsToRectangle(bounds) });
    return text;
  };

  return { extractText };
};

export default useTesseract;
