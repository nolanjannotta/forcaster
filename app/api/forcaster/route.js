import { NextResponse } from "next/server"

const city = "los angeles" 

export async function GET() {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?q=${city}&key=${process.env.WEATHER_KEY}`)
    const forcast = await response.json();

    return NextResponse.json(forcast)

}