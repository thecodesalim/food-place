import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Food Place</title>
      </head>
      <body className=" text-sm p-4">{children}</body>
    </html>
  );
}
