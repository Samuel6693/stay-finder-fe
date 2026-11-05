import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Providers from "@/components/Providers";
import AuthHeader from "@/components/AuthHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stay Finder",
  description: "Find a place to stay",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Providers>
          <header className="sticky top-0 z-40 border-b border-[#dde2dc]/80 bg-[#f7f7f2]/90 backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8">
              <Link href="/" className="group flex items-center gap-2.5" aria-label="Stay Finder home">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#1f6f50] text-white shadow-sm transition group-hover:-translate-y-0.5">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M3.5 11.5 12 4l8.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5.5 10v9h13v-9M9.5 19v-5h5v5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="text-lg font-bold tracking-[-0.03em] text-[#18201b] sm:text-xl">
                  Stay Finder
                </span>
              </Link>
              <AuthHeader/>
            </div>
          </header>
          {children}
          <footer className="mt-auto border-t border-[#dde2dc] bg-white">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-5 py-8 text-sm text-[#667068] sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <p>© {new Date().getFullYear()} Stay Finder</p>
              <p>Thoughtful stays, memorable places.</p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
