"use client";

import { store } from "@/store/store";
import "./globals.css";
import { Provider } from "react-redux";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={` antialiased `}>
          <main className="mx-auto  grid grid-cols-2 px-5 gap-x-5">
            {children}
          </main>
        </body>
      </html>
    </Provider>
  );
}
