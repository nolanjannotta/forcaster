import { NextResponse } from "next/server";
import {
  FrameRequest,
  getFrameMessage,
  getFrameHtmlResponse,
} from "@coinbase/onchainkit";
import { NEXT_PUBLIC_URL } from '../../config';

const city = "los angeles";
// const NEXT_PUBLIC_URL = "http://localhost:3000";

async function getWeather() {
  // const options = ["current.json", "forecast.json"]
  const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?days=7&q=${city}&key=${process.env.WEATHER_KEY}`);
  const forcast = await response.json();

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'back',
        },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/forcaster.png`,
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    })
  );
}

export async function GET() {
  return getWeather();
}

export const dynamic = "force-dynamic";
