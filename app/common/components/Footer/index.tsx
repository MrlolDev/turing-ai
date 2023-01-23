"use client";
import useUser from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import supabase from "@/utils/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  var user = useUser();

  async function login() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
    });
  }
  async function logout() {
    const { error } = await supabase.auth.signOut();
    router.push("/");
  }
  return (
    <nav className="bg-neutral-900 w-[95%] fixed bottom-[3vh] left-[2.5%] h-14 rounded-xl flex flex-row justify-between p-2 px-4 items-center select-none">
      <Link href="/">
        <div className="flex flex-row items-center gap-1">
          <Image
            src="/lg.png"
            alt="turing ai logo"
            draggable="false"
            width={50}
            height={50}
          />
          <p>turing-ai.xyz &copy; 2023</p>
        </div>
      </Link>
      <div className="flex flex-row items-center gap-4">
        <Link
          href="/terms"
          className="text-turing-white transition duration-200 hover:text-turing-primary hover:underline"
        >
          Terms of service
        </Link>
        <Link
          href="/privacy"
          className="text-turing-white transition duration-200 hover:text-turing-primary hover:underline"
        >
          Privacy policy
        </Link>
      </div>
    </nav>
  );
}
