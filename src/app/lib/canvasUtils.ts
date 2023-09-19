
export const createImage = async (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    image.crossOrigin = 'anonymous';
    image.src = url;
  });
};

export function getRadianAngle(degreeValue: number) {
  return (degreeValue * Math.PI) / 180;
}

export function rotateSize(width: number, height: number, rotation: number) {
  const rotRad = getRadianAngle(rotation);

  return {
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
  };
}

export const getRotatedImage = async (
  imageSrc: string,
  rotation = 0
): Promise<string> => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const orientationChanged = [90, -90, 270, -270].includes(rotation);
  if (orientationChanged) {
    [canvas.width, canvas.height] = [image.height, image.width];
  } else {
    [canvas.width, canvas.height] = [image.width, image.height];
  }

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(getRadianAngle(rotation));
  ctx.drawImage(image, -image.width / 2, -image.height / 2);

  return new Promise((resolve) => {
    canvas.toBlob((file) => {
      resolve(URL.createObjectURL(file || new Blob()));
    }, 'image/png');
  });
};

export const getCroppedImg = async (
	imageSrc: string,
	pixelCrop: {
		height: number;
		width: number;
		x: number;
		y: number;
	},
	file: File
): Promise<File> => {
	const image = await createImage(imageSrc);
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

	canvas.width = pixelCrop.width;
	canvas.height = pixelCrop.height;

	ctx.fillStyle = "rgba(255, 255, 255, 0)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(
		image,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		pixelCrop.width,
		pixelCrop.height
	);

	return new Promise((resolve) => {
		canvas.toBlob((blob) => {
			if (!blob) {
				return;
			}

			const newFile = new File([blob], file.name, {
				type: file.type,
			});
			resolve(newFile);
		});
	});
};

export const readFile = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => resolve(reader.result as string),
      false
    );
    reader.readAsDataURL(file);
  });
};
