import { Inter } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })




export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >{children}
      {/* <a target="blank" href="https://warpcast.com/nolanj">follow meeeeee</a> */}
      </body>
    </html>
  );
}