import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import appleIcon from "@/images/apple-touch-icon.png";
import faviconIcon from "@/images/favicon-96x96.png";
import ogImage from "@/images/og.png";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Constants for reusability and maintainability
const SITE_CONFIG = {
  name: "OG Blogger",
  title: "Blogs",
  description: "One stop place for all my blogs",
  url: "https://exarvo.github.io",
  author: {
    name: "K A R S H",
    twitter: "@exarvo",
  },
  keywords: [
    "Machine Learning",
    "ML",
    "AI",
    "Artificial Intelligence",
    "Go",
    "TypeScript",
    "JavaScript",
    "Web Development",
    "Tech Blog",
  ],
};

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,

  // Keywords - use array format for better maintainability
  keywords: SITE_CONFIG.keywords,

  // Author information
  authors: [{ name: SITE_CONFIG.author.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.author.name,
  publisher: SITE_CONFIG.author.name,

  // Metadata base - used for relative URLs
  metadataBase: new URL(SITE_CONFIG.url),

  // Icons - use imported assets for better type safety and optimization
  icons: {
    icon: [{ url: faviconIcon.src, sizes: "32x32", type: "image/png" }],
    apple: [{ url: appleIcon.src, sizes: "180x180", type: "image/png" }],
  },

  // Open Graph metadata
  openGraph: {
    type: "website", // Changed from 'article' as this seems to be a blog listing page
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: ogImage.src,
        width: ogImage.width || 1200,
        height: ogImage.height || 630,
        alt: `${SITE_CONFIG.title} - ${SITE_CONFIG.description}`,
        type: "image/png",
      },
    ],
  },

  // Twitter metadata
  twitter: {
    card: "summary_large_image",
    site: SITE_CONFIG.author.twitter,
    creator: SITE_CONFIG.author.twitter,
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [
      {
        url: ogImage.src,
        alt: `${SITE_CONFIG.title} - ${SITE_CONFIG.description}`,
      },
    ],
  },

  // Additional SEO enhancements
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Category for the site
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex h-full bg-zinc-50 dark:bg-black antialiased`}
      >
        <div className="fixed inset-0 flex justify-center sm:px-8">
          <div className="flex w-full max-w-7xl lg:px-8">
            <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
          </div>
        </div>
        <div className="relative flex w-full flex-col">
          <Header />
          <main className="flex-auto">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
