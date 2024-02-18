import { getFrameMetadata } from '@coinbase/onchainkit';
import { NEXT_PUBLIC_URL } from '../config.js';
import {forecaster} from "../images.js"

const frameMetadata = getFrameMetadata({
  buttons: [{label: 'current'},{label: '7 day'},{label: '12 hour'}],
  image: {
    src: forecaster,
  },
  input: {
    text: 'city, zip code, or location',
  },
  postUrl: `${NEXT_PUBLIC_URL}/forecaster/results`,
});

export const metadata = {
  title: 'forecaster',
  description: 'frame for getting forecasts',
  openGraph: {
    title: 'forecaster',
    description: 'frame for getting forecasts',
    images: [forecaster], 
  },
  other: {
    ...frameMetadata,
  },
};



export default function Page() {
  return (
    <>
      <h1>Forecaster frame</h1>

    </>
  );
}