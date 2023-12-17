import "./globals.css";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "TicTacToe Online",
  description: "A multi-platform online tic-tac-toe game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen flex items-center justify-center">
        <main className="flex flex-col items-center justify-center shadow-2xl border-8 mobile-screen border-gray-800 rounded-3xl bg-center bg-no-repeat bg-cover overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
