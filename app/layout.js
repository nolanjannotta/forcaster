import { Roboto } from 'next/font/google'
 
const font = Roboto({ 
  subsets: ['latin'],
  weight:["400", "700"] })




export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.className}>
      <body  >
        {children}
      {/* <a target="blank" href="https://warpcast.com/nolanj">follow meeeeee</a> */}
      </body>
    </html>
  );
}