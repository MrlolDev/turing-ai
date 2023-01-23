"use client";
import Image from "next/image";
import useUser from "@/hooks/useUser";
import supabase from "@/utils/supabase";
import Loading from "@/components/Loading";
import { useRef, useState } from "react";
import Link from "next/link";

export default function App() {
  var user = useUser();
  var [token, setToken] = useState("N/A");

  if (!user) {
    supabase.auth.signInWithOAuth({
      provider: "discord",
    });
    return <Loading message="Redirecting to login..." />;
  }
  if (user == "loading") {
    return <Loading message="Loading session" />;
  }
  async function getToken(CaptchaToken: string) {
    var response = await fetch(`${process.env.NEXT_PUBLIC_API}/token`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        CaptchaToken,
        userId: user.id,
      }),
    });
    var json = await response.json();
    if (json.error) return alert(`Something wrong happened: ${json.error}`);
    console.log(json);
    setToken(json.token);
  }
  return (
    <>
      <main className="relative top-[14vh] w-[95%] left-[2.5%] ">
        <button className="text-2xl text-white font-bold">
           Hello, {user ? user.user_metadata.name : "Loading..."}
        </button>
        <br />
        <p className="mt-3">The dashboard is in the Beta phase, if you found any error tell us in the support.</p>
        <div className="flex flex-row items-start gap-10 mt-2 h-fit w-full sm:w-fit"></div>

        <Link href="/app/dalle2" className="mr-4 text-2x font-bold bg-turing-primary/[.88] px-4 py-1 text-turing-white rounded-md text-turing-white rounded-md">
          Go to Dall-e 2
        </Link>
        <Link href="/app/chatgpt" className="mr-4 text-2x font-bold bg-turing-primary/[.88] px-4 py-1 text-turing-white rounded-md text-turing-white rounded-md">
          Go to ChatGPT
        </Link>
        <Link href="/app/turing" className="text-2x font-bold bg-turing-primary/[.88] px-4 py-1 text-turing-white rounded-md text-turing-white rounded-md">
          Go to Turing
        </Link>
      </main>
    </>
  );
}
