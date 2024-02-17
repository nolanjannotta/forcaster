import { NextResponse } from "next/server";
import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit";
import { NEXT_PUBLIC_URL} from '../../config';
import sharp from "sharp";
import {encodePNG, dayOfWeek} from "../../helpers.js"


async function getResponse(request) {

  const body = await request.json();


  const options = ["current.json?", "forecast.json?days=7&", "forecast.json?days=2&"]
  const response = await fetch(`http://api.weatherapi.com/v1/${options[body.untrustedData.buttonIndex-1]}q=${body.untrustedData.inputText}&key=${process.env.WEATHER_KEY}`);
  const forecast = await response.json();



  


    let svg = "<svg width='1200' height='630' xmlns='http://www.w3.org/2000/svg'><rect stroke='black' stroke-width='3' width='1200' height='630' fill='none'></rect>"



    // handle errors:
    if(body.untrustedData.inputText == "") {
      svg = `${svg}<text x="600" y="70" text-anchor="middle" font-size="70">Current weather for</text>
        <text x="600" y="150" text-anchor="middle" font-size="70">Nowhere</text>
        <text x="600" y="230" text-anchor="middle" font-size="70">Is probably zero degrees</text>`

    }

    // current weather 
    if(body.untrustedData.buttonIndex == 1) {
      let icon = await  encodePNG(`https:${forecast.current.condition.icon}`);
      svg = `${svg}<text x="600" y="70" text-anchor="middle" font-size="70">Current weather for</text>
        <text x="600" y="150" text-anchor="middle" font-size="70">${forecast.location.name}, ${forecast.location.region}</text>
        <text x="600" y="230" text-anchor="middle" font-size="70">${forecast.location.country}</text>
        <text x="600" y="370" text-anchor="middle" font-size="50"> Temp: ${forecast.current.temp_f}°F/${forecast.current.temp_c}°C</text>
        <text x="600" y="430" text-anchor="middle" font-size="50"> Condition: ${forecast.current.condition.text}</text>'
        <image height="150" width="150" x="525" y="450" href="${icon}"></image>
        `
    }
    // 7 day
    else if(body.untrustedData.buttonIndex == 2) {
      svg = `${svg}
      <text x="600" y="70" text-anchor="middle" font-size="70">${forecast.location.name}, ${forecast.location.region}</text>
      <text x="600" y="150" text-anchor="middle" font-size="70">${forecast.location.country}</text>
      `
      let startingCenter = 85.7;
      let width = 171.4;
      for(let [index, day] of forecast.forecast.forecastday.entries()) {
        let icon = await  encodePNG(`https:${forecast.current.condition.icon}`);
        svg = `${svg}
        <text x="${startingCenter + (width*index)}" y="250" text-anchor="middle" font-size="30">${dayOfWeek(day.date)}</text>
        <text x="${startingCenter + (width*index)}" y="290" text-anchor="middle" font-size="25"> High:</text>
        <text x="${startingCenter + (width*index)}" y="325" text-anchor="middle" font-size="25">${day.day.maxtemp_f}°F/${day.day.maxtemp_c}°C</text>
        <text x="${startingCenter + (width*index)}" y="360" text-anchor="middle" font-size="25"> Low:</text>
        <text x="${startingCenter + (width*index)}" y="395" text-anchor="middle" font-size="25">${day.day.mintemp_f}°F/${day.day.mintemp_c}°C</text>
        <text x="${startingCenter + (width*index)}" y="430" text-anchor="middle" font-size="25">${day.day.condition.text}</text>'
        <image height="100" width="100" x="${startingCenter + (width*index) - 50}" y="440" href="${icon}"></image>

        <line  x1="${(width*index)}" x2="${(width*index)}" y1="230" y2="580" stroke="black"></line>
        `
      }
    }

    // 12 hour
    else if (body.untrustedData.buttonIndex == 3) {
      svg = `${svg}
        <text x="600" y="70" text-anchor="middle" font-size="70">${forecast.location.name}, ${forecast.location.region}</text>
        <text x="600" y="150" text-anchor="middle" font-size="70">${forecast.location.country}</text>`
      
      let x = 100;
      let y = 210
      let hourCounter = 0;
      let localTime = new Date(forecast.location.localtime).getTime()

      for(let forecastday of forecast.forecast.forecastday) {
        for(let hour of forecastday.hour) {
          let time = new Date(hour.time).getTime()
          let icon = await  encodePNG(`https:${forecast.current.condition.icon}`);

          if(time > localTime-3600000 && hourCounter<12){
            svg = `${svg}
              <text x="${x}" y="${y}" text-anchor="middle" font-size="30">${hour.time.slice(11)}</text>
              <text x="${x}" y="${y + 35}" text-anchor="middle" font-size="30">${hour.temp_f}°F</text>
              <text x="${x}" y="${y + 70}" text-anchor="middle" font-size="30">${hour.temp_c}°C</text>
              <text x="${x}" y="${y + 100}" text-anchor="middle" font-size="30">${hour.condition.text}</text>
              <image height="100" width="100" x="${x-50}" y="${y + 100}" href="${icon}"></image>


            `
            x += 200
             hourCounter ++;

             if(hourCounter == 6) {
              y = 430
              x = 100
            }
          }
        }

      }


    }

    svg = `${svg}</svg>`

    
    const img = await sharp(Buffer.from(svg)).resize(1200).toFormat("png").toBuffer();

    const base64Img = `data:image/png;base64,${img.toString('base64')}`;
    
  

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: "back",
        },
      
      ],
      image: {
        src: base64Img,
      },
      postUrl: `${NEXT_PUBLIC_URL}/forcaster`,
    })
  );

}

export async function POST(request) {
  return getResponse(request);
}



export const dynamic = "force-dynamic";
