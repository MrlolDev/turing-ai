"use client";
import useUser from "../../hooks/useUser";
import Loading from "./Loading";
import { useState } from "react";
import supabase from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function ApplyPage() {
  const router = useRouter();
  const { status, profile } = useUser(true);
  if (status === "loading" || profile.id === "loading") {
    return <Loading message="Loading" />;
  }
  if (profile.tester.apply) {
    router.push("/waitlist/wait");
    return <Loading message="Loading" />;
  }
  console.log(profile);
  async function getDiscordConnections() {
    let discordToken = profile.provider_token;
    let discordId = profile.user_metadata?.sub;
    let res = await fetch(`https://discord.com/api/users/@me/connections`, {
      headers: {
        Authorization: `Bearer ${discordToken}`,
      },
    });
    let discordConnections = await res.json();
    console.log(discordConnections);
    return discordConnections;
  }
  async function apply() {
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
