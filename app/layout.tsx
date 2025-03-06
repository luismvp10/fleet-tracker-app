import type { Metadata } from "next";
import { Inter } from 'next/font/google'

import {AuthProvider} from "@/providers/AuthProvider";
import "@/styles/globals.css"
import {NextFont} from "next/dist/compiled/@next/font";

const inter: NextFont = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Fleet Tracker | Traxión ",
  description: "Real-time vehicle tracking and fleet management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}  antialiased`}
      >
      <AuthProvider>
          {children}
      </AuthProvider>

      </body>
    </html>
  );
}
