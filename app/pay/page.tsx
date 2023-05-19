import Pay from "../common/components/Pages/pay";
export const metadata = {
  title: "TuringAI - Pay",
  description:
    "TuringAI premium subscription. Get access to all premium features and support TuringAI's development.",
  keywords: ["turingai", "pay", "premium", "subscription", "support", "turing"],
  themeColor: "#62c0c9",
  authors: [{ name: "Turing AI", url: "https://turing.sh" }],
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
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  category: "technology",
};

export default function Page() {
  return <Pay />;
}
