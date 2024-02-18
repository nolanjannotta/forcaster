import { NextResponse } from "next/server";
import { NEXT_PUBLIC_URL} from '../../config.js';
import {getFrameHtmlResponse} from "@coinbase/onchainkit";
import {forecaster} from "../../images.js"
    
    export async function POST(request) {

      return new NextResponse(
        getFrameHtmlResponse({
          buttons: [{label: 'current'},{label: '7 day'},{label: '12 hour'}],
          image: {
            src: forecaster,
          },
          input: {
            text: 'city, zip code, or location',
          },
          postUrl: `${NEXT_PUBLIC_URL}/forecaster/results`,
        }));

      }

export const dynamic = "force-dynamic";
