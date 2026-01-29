import type { Metadata } from "next";

import { Poppins } from "next/font/google";

import "../index.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "@/components/providers";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lofi Study App - Focus & Productivity",
  description: "A beautiful study companion with Pomodoro timer, task management, and lofi music",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <Providers>
          <div className="grid grid-rows-[auto_1fr_auto] min-h-svh">
            <Header />
            <main className="min-h-0">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
