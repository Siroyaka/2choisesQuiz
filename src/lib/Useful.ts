const canvasToBlob = async (canvas: HTMLCanvasElement) => {
  return new Promise<Blob>((resolve, rejects) => {
    canvas.toBlob((blob) => {
      if(blob === null) {
        rejects(null);
        return;
      }
      resolve(blob);
    });
  })
}

const readAsDataURL = async (file: Blob): Promise<string> => {
  if (file === null) return new Promise(null);
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      switch(typeof(reader.result))
      {
        case 'string':
          resolve(reader.result);
          return;
        default:
          reject('');
          break;
      }
    };
    reader.onerror = (e) => {reject('')};
    reader.readAsDataURL(file);
  })
}

const loadImage = async (src: string): Promise<HTMLImageElement> => {
  if (src === null) return new Promise(null);
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () => {
      resolve(image);
    }
    image.onerror = () => {
      reject(null);
    }
  });
}

export {
  canvasToBlob,
  readAsDataURL,
  loadImage,
}