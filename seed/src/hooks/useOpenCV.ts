import { useCallback } from "react";
import cv from "@techstark/opencv-js";
import {  RectangleBounds } from "#/types/Point";
import { getBoundsFromMaxPoint } from "#/utils/coordinateUtils";
import { createImage } from "#/utils/imageUtils";

export const useOpenCV = () => {
  const compareColor = (color1: Uint8ClampedArray, color2: Uint8ClampedArray) => {
    return color1.every((b, idx) => b === color2[idx]);
  };

  const matchTemplate = useCallback(
    async (
      canvas: HTMLCanvasElement,
      image: string | HTMLElement,
    ): Promise<RectangleBounds> => {
      let imageElement = image;
      if (typeof image === "string") imageElement = await createImage(image as string);

      const [src, template] = [cv.imread(canvas), cv.imread(imageElement)];
      const [dst, mask] = [new cv.Mat(), new cv.Mat()];
      cv.matchTemplate(src, template, dst, cv.TM_CCOEFF, mask);
      const result = cv.minMaxLoc(dst, mask);

      //@ts-ignore
      const maxPoint = result.maxLoc as cv.Point;
      [src, dst, mask].forEach((el) => el.delete());
      return getBoundsFromMaxPoint(maxPoint, template.cols, template.rows);
    },
    []
  );

  return { matchTemplate };
};
