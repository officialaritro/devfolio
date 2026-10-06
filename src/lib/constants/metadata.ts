import { Metadata } from "next";

export const defaultMetadata: Partial<Metadata> = {
  openGraph: {
    type: "website",
    images: [
      {
        url: "/og-image.png",
        alt: "Contact Aritro Roy - Full Stack and AI/MLDeveloper",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  keywords: [
    "Aritro Roy",
    "Full Stack and AI/ML Developer Portfolio",
    "Web Developer Portfolio",
    "Full Stack Developer",
    "Aritro Roy Projects",
    "Hire Aritro Roy",
    "Full Stack Development",
    "React Developer Portfolio",
  ],
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.svg',
      },
    ],
  },
  alternates: {
    canonical: "./",
  },
  robots: "index, follow",
}