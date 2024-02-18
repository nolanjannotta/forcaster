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





  export function wordWrap(words, characters) {
    words = words.trim()

    if(words.length < characters) {
      return [words]
    }
    
    const wordsArr = words.split(" ")
    const lines = []
    let currentLine = "";
    
    while(wordsArr.length > 0) {
        let nextWord = wordsArr.shift()
    
        if(currentLine.length + nextWord.length <=characters) {
            currentLine = currentLine.concat(nextWord, " ")
        }
        else {
            lines.push(currentLine.trim())
            currentLine = nextWord
        }
        if(wordsArr.length == 0) {
            lines.push(currentLine)
        }

    }
    return lines
}
