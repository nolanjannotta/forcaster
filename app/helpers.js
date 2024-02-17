import { createCanvas, loadImage } from "canvas"

export async function convertImageToBase64(imgUrl) {
    // const image = Canvas.Image();
    // image.crossOrigin='anonymous';
    const canvas = createCanvas();
    const ctx = canvas.getContext('2d');
    canvas.height = 64;
    canvas.width = 64;
    let dataUrl;
    let image = await loadImage(imgUrl)
    ctx.drawImage(image, 0, 0);
    return canvas.toDataURL();




  }

  export function dayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();    
  return isNaN(dayOfWeek) ? null : 
    ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'][dayOfWeek ];
  }