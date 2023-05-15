export const createImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = src;
    image.addEventListener("load", () => resolve(image));
  });
};
export const convertToGrayscale = (imageData: ImageData) => {
  for (let i = 0; i < imageData.data.length; i += 4) {
    const red = imageData.data[i];
    const green = imageData.data[i + 1];
    const blue = imageData.data[i + 2];

    const average = (red + green + blue) / 3;

    imageData.data[i] = average;
    imageData.data[i + 1] = average;
    imageData.data[i + 2] = average;
  }

  return imageData;
};
