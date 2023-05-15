import { Point, RectangleBounds } from "#/types/Point";
import { Rectangle } from "tesseract.js";

export const getBoundsFromMaxPoint = (
  maxPoint: Point,
  width: number,
  height: number
): RectangleBounds => {
  return {
    nw: { x: maxPoint.x, y: maxPoint.y },
    ne: { x: maxPoint.x + width, y: maxPoint.y },
    sw: { x: maxPoint.x, y: maxPoint.y + height },
    se: { x: maxPoint.x + width, y: maxPoint.y + height },
  };
};

export const convertBoundsToRectangle = (bounds: RectangleBounds): Rectangle => {
  return {
    top: bounds.ne.y,
    left: bounds.nw.x,
    width: bounds.ne.x - bounds.nw.x,
    height: bounds.se.y - bounds.ne.y,
  };
};

export const getNEfromSEPoint = (sePoint: Point, height: number): Point => {
  return { ...sePoint, y: sePoint.y - height };
};
