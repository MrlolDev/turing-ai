"use client";
import useUser from "../../hooks/useUser";
import Loading from "./Loading";
import { useState, useRef } from "react";
import supabase from "../../lib/supabase";
import { useRouter } from "next/navigation";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function ApplyPage() {
  const router = useRouter();
  const { status, profile } = useUser(true);
  const [token, setToken] = useState<string | null>(null);
  const captchaRef = useRef(null);

  if (status === "loading" || profile.id === "loading") {
    return <Loading message="Loading" />;
  }
  if (profile.tester.apply) {
    router.push("/waitlist/wait");
    return <Loading message="Loading" />;
  }
  if (profile.tester.approved == true) {
    router.push("/");
    return <Loading message="Loading" />;
  }
  async function getDiscordConnections() {
    let discordToken = profile.provider_token;
    let discordId = profile.user_metadata?.sub;
    try {
      let res = await fetch(`https://discord.com/api/users/@me/connections`, {
        headers: {
          Authorization: `Bearer ${discordToken}`,
        },
      });
      let discordConnections = await res.json();
      if (discordConnections.message === "401: Unauthorized") {
        await supabase.auth.signOut();
        router.push("/login");
      }
      return discordConnections;
    } catch (e) {
      return [];
    }
  }
  async function apply() {
    if (!captchaRef.current) return;
    // @ts-ignore
    //captchaRef.current.execute();

    if (!token) return alert("Please verify you are not a robot");
    let res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/hcaptcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.access_token}`,
      },
      body: JSON.stringify({
        token,
      }),
    });
    let d = await res.json();
    if (!d.success) return alert("Please verify you are not a robot");
    let { data, error } = await supabase
      .from("alan_testers")
      .select("*")
      .eq("id", profile.user_metadata?.sub)
      .single();
    let discordConnections = await getDiscordConnections();
    discordConnections = discordConnections.filter(
      (connection: { verified: boolean }) => connection.verified === true
    );
    await supabase
      .from("alan_testers")
      .insert([
        {
          id: profile.user_metadata?.sub,
          social_media: discordConnections,
          isTester: false,
          testerType: 0,
          isPremium: profile.premium,
          approved_at: null,
          user_id: profile.id,
        },
      ])
      .single();
    profile.tester.apply = true;
    router.push("/waitlist/wait");
    alert("Applied!");
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <h1 className="text-4xl font-bold text-gray-300">Apply</h1>
      <p>
        Apply to get access to Alan. We consider if you already have a premium
        subscription, and your social media.
      </p>
      <HCaptcha
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string}
        onVerify={(token) => {
          setToken(token);
        }}
        ref={captchaRef}
        theme="dark"
      />
      <button
        className=" px-4 py-1 rounded-md bg-gradient-to-br from-turing-blue to-turing-purple flex items-center justify-center cursor-pointer transition duration-500 outline-none hover:from-turing-purple hover:to-turing-blue"
        onClick={() => {
          apply();
        }}
      >
        Apply
      </button>
    </div>
  );
}
