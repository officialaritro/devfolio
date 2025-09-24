import { Analytics } from '@vercel/analytics/next';

import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import "./globals.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { defaultMetadata } from "@/lib/constants/metadata";

import GrainyFilter from "@/components/grainy-filter";
import SmoothScroll from "@/components/smooth-scroll";

const spaceGrotesk = Space_Grotesk({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "Aritro Roy - Full Stack and AI/ML Developer | Portfolio",
  description: "Welcome to Aritro's portfolio. Explore my projects, skills, and journey as a full-stack developer passionate about building innovative digital experiences.",
  openGraph: {
    title: "Aritro Roy - Full Stack and AI/ML Developer | Portfolio",
    description: "Explore Aritro's portfolio and discover innovative projects and cutting-edge web development solutions.",
    ...defaultMetadata.openGraph,
  },
  twitter: {
    title: "Aritro Roy - Full Stack and AI/ML Developer | Portfolio",
    description: "Explore Aritro's portfolio and discover innovative projects and cutting-edge web development solutions.",
    ...defaultMetadata.twitter
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <Script id="gtm-init" strategy="afterInteractive">
          {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-WVPS3JFL');
      `}
        </Script>
      </head> */}
      <body
        className={`${spaceGrotesk.className} antialiased bg-zinc-900`}
      >
        {/* Google Tag Manager (noscript */}
        {/* <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WVPS3JFL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript> */}

        <GrainyFilter />
        <ToastContainer theme="dark" />
        <SmoothScroll>
          {children}
        </SmoothScroll>

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
