"use server";

import Image from "next/image";
import { Inter } from "next/font/google";
import Chat from "./common/components/Chat";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  let messages = [];
  // create state linked to localStorage
  return (
    <>
      <Chat></Chat>
    </>
  );
}
