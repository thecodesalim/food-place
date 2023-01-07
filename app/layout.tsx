"use client";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body className=" text-sm p-4">
        <SessionProvider refetchOnWindowFocus={false}>
          <>{children}</>
        </SessionProvider>
      </body>
    </html>
  );
}
