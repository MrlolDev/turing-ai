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
    <nav className="bg-neutral-900 w-[95%] fixed top-[3vh] left-[2.5%] h-14 rounded-xl flex flex-row justify-between p-2 px-4 items-center select-none">
      <Link href="/">
        <Image
          src="/lg.png"
          alt="turing ai logo"
          draggable="false"
          width={50}
          height={50}
        />
      </Link>
      <div className="flex flex-row items-center gap-4">
        {user ? (
          <>
            <p className="select-none cursor-pointer">
              {user.user_metadata ? user.user_metadata.name : "loading"}
            </p>
            <button
              className="px-6 py-1 bg-turing-primary/[.88] text-turing-white rounded-md hover:bg-turing-primary transition duration-300"
              onClick={() => {
                router.push("/app");
              }}
            >
              Open Turing AI
            </button>
          </>
        ) : (
          <>
            <button
              className="px-6 py-1 bg-turing-primary/[.88] text-turing-white rounded-md hover:bg-turing-primary transition duration-300"
              onClick={() => login()}
            >
              Log in
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
