export default class ImageUtils {
  static createImage(src: string): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const image = new Image();
      image.src = src;
      image.addEventListener("load", () => resolve(image));
    });
  }
}
