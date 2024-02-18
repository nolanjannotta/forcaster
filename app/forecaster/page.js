import { getFrameMetadata } from '@coinbase/onchainkit';
import { NEXT_PUBLIC_URL } from '../config.js';
import {forcaster} from "../images.js"

const frameMetadata = getFrameMetadata({
  buttons: [{label: 'current'},{label: '7 day'},{label: '12 hour'}],
  image: {
    src: forcaster,
  },
  input: {
    text: 'city, zip code, or location',
  },
  postUrl: `${NEXT_PUBLIC_URL}/forecaster`,
});

export const metadata = {
  title: 'forecaster',
  description: 'frame for getting forecasts',
  openGraph: {
    title: 'forecaster',
    description: 'frame for getting forecasts',
    images: [forcaster],
  },
  other: {
    ...frameMetadata,
  },
};


export default function Page() {
  return (
    <>
      <h1>Forcaster frame</h1>

    </>
  );
}