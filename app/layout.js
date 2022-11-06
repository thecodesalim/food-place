import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Hello, Salim</title>
      </head>
      <body className=" text-xs">{children}</body>
    </html>
  );
}
