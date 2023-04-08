import "./globals.scss";
import "react-tooltip/dist/react-tooltip.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata = {
  title: "Alan AI",
  description:
    "Alan AI is a free, open-source, and extensible a new way to use LLM with internet access, i",
  keywords: ["Next.js", "React", "JavaScript"],
  theme-color: "#62c0c9"
  authors: [{ name: "Turing AI", url: "https://turingai.tech" }],
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icons/neon.png",
    shortcut: "/icons/neon.png",
  },
  themeColor: "black",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://kit.fontawesome.com/962d295c08.js"
          crossOrigin="anonymous"
          async
          defer
        ></script>
      </head>
      <body className="text-white overflow-hidden mx-5">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
