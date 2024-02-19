import { NextResponse } from "next/server";
import {getFrameHtmlResponse} from "@coinbase/onchainkit";
import { NEXT_PUBLIC_URL} from '../../config.js';
import { tryDifferentPlace,errorImage} from '../../images.js';
import sharp from "sharp";
import {encodePNG, dayOfWeek,wordWrap} from "../../helpers.js"


async function getResponse(request) {

    


    const options = ["current.json?", "forecast.json?days=7&", "forecast.json?days=2&"]

    let response, forecast, body

        try {
            body = await request.json();
            response = await fetch(`http://api.weatherapi.com/v1/${options[body.untrustedData.buttonIndex-1]}q=${body.untrustedData.inputText}&key=${process.env.WEATHER_KEY}`);
            forecast = await response.json();
            
        }
        catch {
            
            return new NextResponse(
                getFrameHtmlResponse({
                    buttons: [{label: "back"}],
                    image: {src: errorImage},
                    postUrl: `${NEXT_PUBLIC_URL}/forecaster/search`,
                })
            );
        
        }
 



  


    let svg = "<svg width='1200' height='630' xmlns='http://www.w3.org/2000/svg'><rect stroke='black' stroke-width='3' width='1200' height='630' fill='none'></rect>"
    
    // let svgTest = SVG().addTo('body')
    // svgTest.size(1200,630).rect(1200, 630).attr({stroke:"black", strokeWidth: '3', fill: 'none' });
    // console.log(svgTest);             


    // incase no text input was sent or in case an invalid location was sent
    if(forecast.error) {
    
        return new NextResponse(
            getFrameHtmlResponse({
                buttons: [{label: "back"}],
                image: {src: tryDifferentPlace},
                postUrl: `${NEXT_PUBLIC_URL}/forecaster`,
            })
        );
    }


    // current weather 
    if(body.untrustedData.buttonIndex == 1) {
        let icon = await encodePNG(`https:${forecast.current.condition.icon}`);
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
            const lines = wordWrap(day.day.condition.text, 15)
            let icon = await  encodePNG(`https:${day.day.condition.icon}`);
            svg = `${svg}
            <text x="${startingCenter + (width*index)}" y="250" text-anchor="middle" font-size="30">${dayOfWeek(day.date)}</text>
            <text x="${startingCenter + (width*index)}" y="290" text-anchor="middle" font-size="25"> High:</text>
            <text x="${startingCenter + (width*index)}" y="325" text-anchor="middle" font-size="25">${day.day.maxtemp_f}°F/${day.day.maxtemp_c}°C</text>
            <text x="${startingCenter + (width*index)}" y="360" text-anchor="middle" font-size="25"> Low:</text>
            <text x="${startingCenter + (width*index)}" y="395" text-anchor="middle" font-size="25">${day.day.mintemp_f}°F/${day.day.mintemp_c}°C</text>
            
            <image height="100" width="100" x="${startingCenter + (width*index) - 50}" y="480" href="${icon}"></image>

            <line  x1="${(width*index)}" x2="${(width*index)}" y1="230" y2="580" stroke="black"></line>
            `
            lines.forEach((line, lineIndex)=>{
                svg =  `${svg}<text x="${startingCenter + (width*index)}" y="${430 + (30*lineIndex)}" text-anchor="middle" font-size="30">${line}</text>`
            })
        }

    }

    // 12 hour
    else if (body.untrustedData.buttonIndex == 3) {
        svg = `${svg}
            <text x="600" y="60" text-anchor="middle" font-size="45">${forecast.location.name}, ${forecast.location.region},${forecast.location.country}</text>`



        let x = 100;
        let y = 110
        let hourCounter = 0;
        let localTime = new Date(forecast.location.localtime).getTime()

        for(let forecastday of forecast.forecast.forecastday) {
            for(let hour of forecastday.hour) {
            let dateTime = new Date(hour.time)
            
            let time = dateTime.getHours();


                if(dateTime.getTime() > localTime-3600000 && hourCounter<12){
                    const lines = wordWrap(hour.condition.text, 12)
                    let icon = await  encodePNG(`https:${hour.condition.icon}`);

                    svg = `${svg}
                        <text x="${x}" y="${y}" text-anchor="middle" font-size="30">${(time % 12) == 0 ? 12 : time % 12} ${time<12 ? "am" : "pm"}</text>
                        <text x="${x}" y="${y + 35}" text-anchor="middle" font-size="30">${hour.temp_f}°F</text>
                        <text x="${x}" y="${y + 70}" text-anchor="middle" font-size="30">${hour.temp_c}°C</text>
                        <image height="90" width="90" x="${x-45}" y="${y + 155}" href="${icon}"></image>`
                    lines.forEach((line, index)=>{
                        svg =  `${svg}<text x="${x}" y="${y + 110 + (30*index)}" text-anchor="middle" font-size="30">${line}</text>`
                    })

                    x += 200
                    hourCounter ++;

                    if(hourCounter == 6) {
                        y = 380
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
            buttons: [{label: "back"}],
            image: {src: base64Img},
            postUrl: `${NEXT_PUBLIC_URL}/forecaster/search`,
        })
    );

}

export async function POST(request) {
  return getResponse(request);
}



export const dynamic = "force-dynamic";
