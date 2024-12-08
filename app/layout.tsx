import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/fonts";
import GlobalProvider from "@/providers/GlobalProvider";

export const metadata: Metadata = {
  title: "Vertex Frontend",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <GlobalProvider>
        <body className={`${inter.className} antialiased`}>{children}</body>
      </GlobalProvider>
    </html>
  );
}
