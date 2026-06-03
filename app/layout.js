import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#040404",
};

export const metadata = {
  title: "Prompt CEO — Creative Marketing OS",
  description: "One brief. Your entire marketing stack. Hooks, landing pages, email sequences, SMS, retargeting, video storyboards, and the world's most advanced cinematic prompt engine.",
  keywords: "AI marketing, ad copy generator, hooks, landing page, email sequence, UGC, cinematic prompts, HeyGen, Runway, Synthesia",
  authors: [{ name: "Zirunas Michailovas" }],
  creator: "Zirunas Michailovas",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Prompt CEO",
  },
  openGraph: {
    type:        "website",
    locale:      "en_US",
    url:         "https://www.promptceo.io",
    siteName:    "Prompt CEO",
    title:       "Prompt CEO — Creative Marketing OS",
    description: "One brief. Your entire marketing stack. Hooks, landing pages, email sequences, SMS, retargeting, video storyboards, and the world's most advanced cinematic prompt engine.",
    images: [
      {
        url:    "/icons/icon.svg",
        width:  512,
        height: 512,
        alt:    "Prompt CEO",
      },
    ],
  },
  twitter: {
    card:        "summary",
    title:       "Prompt CEO — Creative Marketing OS",
    description: "One brief. Your entire marketing stack.",
    images:      ["/icons/icon.svg"],
  },
  icons: {
    icon:   [{ url: "/icons/icon.svg", type: "image/svg+xml" }],
    apple:  [{ url: "/icons/icon.svg", sizes: "any" }],
    other:  [{ rel: "mask-icon", url: "/icons/icon.svg", color: "#c8a84b" }],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* PWA meta tags */}
        <meta name="application-name" content="Prompt CEO" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Prompt CEO" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#040404" />
        <meta name="msapplication-tap-highlight" content="no" />
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Apple touch icon */}
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon.svg" />
        {/* Service worker registration */}
        <script dangerouslySetInnerHTML={{ __html: `
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/sw.js').catch(function() {});
            });
          }
        `}} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
