import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "./common/components/Navbar";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // create state linked to localStorage

  return (
    <main>
      <Navbar />
    </main>
  );
}
