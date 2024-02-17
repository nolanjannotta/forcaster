import { getFrameMetadata } from '@coinbase/onchainkit';
import { NEXT_PUBLIC_URL, image } from './config.js';

// import type { Metadata } from 'next';

// const NEXT_PUBLIC_URL = 'http://localhost:3000';

// const frameMetadata = getFrameMetadata({
//   buttons: [{label: 'current'},{label: '7 day'},{label: '12 hour'}],
//   image: {
//     src: image,
//     aspectRatio: '1:1',
//   },
//   input: {
//     text: 'city, zip code, or location',
//   },
//   postUrl: `${NEXT_PUBLIC_URL}/api/forcaster`,
// });

export const metadata = {
  title: 'frames by nolan',
  description: 'collection of random frames',
  openGraph: {
    title: 'frames by nolan',
    description: 'collection of random frames',
    images: [image],
  },
  // other: {
  //   ...frameMetadata,
  // },
};


export default function Page() {
  return (
    <>
      <h1>Just some frames, thats it. </h1>
    </>
  );
}
