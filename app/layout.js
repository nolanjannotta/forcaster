export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}
      {/* <a target="blank" href="https://warpcast.com/nolanj">follow meeeeee</a> */}
      </body>
    </html>
  );
}