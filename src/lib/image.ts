export async function resizeImage(
  url: string,
  maxWidth: number,
  maxHeight: number,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = function () {
      URL.revokeObjectURL(img.src);
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = height * (maxWidth / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = width * (maxHeight / height);
          height = maxHeight;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          resolve(new File([blob], ""));
        } else {
          reject("error no blob");
        }
      }, "image/webp");
    };

    img.onerror = function (err) {
      reject(err);
    };

    img.src = url;
  });
}
