import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/fonts";
import GlobalProvider from "@/providers/GlobalProvider";
import { UserContext } from "@/providers/UserContext";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Vertex Frontend",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <GlobalProvider>
        <body className={`${inter.className} antialiased`}>
          <UserContext>{children}</UserContext>
          <Toaster />
        </body>
      </GlobalProvider>
    </html>
  );
}
