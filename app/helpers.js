// import { createCanvas, loadImage } from "canvas"
import fs from 'fs';
// import fetch from "node-fetch"

// export async function convertImageToBase64(imgUrl) {
//     const canvas = createCanvas();
//     const ctx = canvas.getContext('2d');
//     canvas.height = 64;
//     canvas.width = 64;
//     let image = await loadImage(imgUrl)
//     ctx.drawImage(image, 0, 0);
//     return canvas.toDataURL();

//   }

  export async function encodePNG(url) {
    let response = await fetch(url)
    let array = await response.arrayBuffer()
    let base64 = Buffer.from(array).toString('base64')
    return `data:image/png;base64,${base64}`

  }

  export function dayOfWeek(date) {
    const dayOfWeek = new Date(date).getDay();    
    return ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'][dayOfWeek];
  }