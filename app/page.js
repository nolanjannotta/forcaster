import { getFrameMetadata } from '@coinbase/onchainkit';
import { NEXT_PUBLIC_URL } from './config.js';

console.log(NEXT_PUBLIC_URL)
// import type { Metadata } from 'next';

// const NEXT_PUBLIC_URL = 'http://localhost:3000';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'current',
    },
    {
      // action: 'link',
      label: '7 day',
      // target: 'https://www.google.com',
    },
    {
      label: '24 hour',
      // action: 'post_redirect',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/forcaster.png`,
    aspectRatio: '1:1',
  },
  input: {
    text: 'enter a city, zip code, or location',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata = {
  title: 'forcaster',
  description: 'a frame for weather forcasts',
  openGraph: {
    title: 'forcaster',
    description: 'a frame for weather forcasts',
    images: [`${NEXT_PUBLIC_URL}/forcaster.png`],
  },
  other: {
    ...frameMetadata,
  },
};


export default function Page() {
  return (
    <>
      <h1>Forcaster</h1>
    </>
  );
}
