import { NextResponse } from "next/server";
import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit";
import { NEXT_PUBLIC_URL, image } from '../../config';

const city = "los angeles";
// const NEXT_PUBLIC_URL = "http://localhost:3000";


// button 1 = current
// button 2 = 7 day
// button 3 = 24 hour

async function getResponse(request) {

  // const body = await request.json();
  let text;
  console.log(request)
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: process.env.NEYNAR_KEY});

  // if (isValid) {
  //   accountAddress = message.interactor.verified_accounts[0];
  // }

  if (message?.input) {
    text = message.input;
  }


  // if (message?.button === 3) {
  //   return NextResponse.redirect(
  //     'https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms',
  //     { status: 302 },
  //   );
  // }



  // const options = ["current.json?", "forecast.json?", "forecast.json?days=7&"]
  // const response = await fetch(`http://api.weatherapi.com/v1/${options[1]}q=${city}&key=${process.env.WEATHER_KEY}`);
  // const forcast = await response.json();

  

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: text,
        },
      ],
      image: {
        src: image,
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/forcaster`,
    })
  );

}

export async function POST(request) {
  return getResponse(request);
}



export const dynamic = "force-dynamic";
