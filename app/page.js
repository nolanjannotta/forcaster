import { getFrameMetadata } from '@coinbase/onchainkit';
// import type { Metadata } from 'next';

const NEXT_PUBLIC_URL = 'http://localhost:3000';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Show me the weather',
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
    text: 'enter a city',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});

export const metadata = {
  title: 'zizzamia.xyz',
  description: 'LFG',
  openGraph: {
    title: 'zizzamia.xyz',
    description: 'LFG',
    images: [`${NEXT_PUBLIC_URL}/park-1.png`],
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
