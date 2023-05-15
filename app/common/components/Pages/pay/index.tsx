"use client";
import useUser from "../../../hooks/useUser";
import Loading from "../Loading";
import { useRouter } from "next/navigation";
import PayButtons from "./PayButtons";
import { useState } from "react";
import Image from "next/image";
// @ts-ignore
import sellix from "@sellix/node-sdk";
import SubSelector from "./SubSelector";
import supabase from "../../../lib/supabase";

export default function PayPage() {
  const router = useRouter();
  const { status, profile } = useUser(true);
  const [sub, setSub] = useState("user");
  const [credits, setCredits] = useState("default");
  const [servers, setServers] = useState<any>([]);
  const [selectedServer, setSelectedServer] = useState<any>(null);

  const handleCreditChange = (event: any) => {
    setCredits(event.target.value);
  };

  if (status === "loading" || profile.id === "loading") {
    return <Loading message="Loading" />;
  }
  async function handleSubscribe(e: any) {
    if (sub == "server" && !selectedServer)
      return alert("Please select a server");
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.access_token}`,
      },
      body: JSON.stringify({
        productId: sub == "user" ? "645fb8d0eb031" : "64627207b5a95",
        email: profile.email,
        gateway: e,
        name: profile.user.user_metadata.name,
        userId: profile.user.user_metadata.sub,
        serverId: selectedServer?.id || null,
      }),
    });
    let session = await res.json();
    window.location = session.url;
  }
  async function getDiscordServers() {
    let accessToken = profile.provider_token;
    if (servers.length > 0) return servers;
    let res = await fetch(
      `https://discord.com/api/v8/users/@me/guilds?limit=100`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: null,
      }
    );
    let serversJSON = await res.json();
    // if answers un authorized
    if (serversJSON.code == 0 || serversJSON.code == 401 || res.status == 401) {
      supabase.auth.signInWithOAuth({
        provider: "discord",
        options: {
          redirectTo: "https://app.turing.sh/pay",
          scopes: "connections, guilds",
        },
      });
      return;
    }
    // filter servers where the user is admin or owner
    serversJSON = serversJSON.filter(
      (server: any) =>
        (server.permissions & 0x8) === 0x8 ||
        (server.permissions & 0x20) === 0x20
    );
    setServers(serversJSON);
    console.log(serversJSON);
    return serversJSON;
  }

  return (
    <div className="flex flex-col items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      {/*   <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold">Features</h2>
        <ul className="flex flex-col items-start">
          <li>
            <h3 className="font-semibold text-lg">Way lower cooldown</h3>
            <p>
              Chat with the bot for as long as you want - without being
              interrupted by an annoying cool-down! ⏰ Your cool-down will be
              lowered to an amazing 14 seconds, for all normal models.
            </p>
          </li>
          <li>
            <h3 className="font-semibold text-lg">No ads</h3>
            <p>
              No more ads! 🚫 You will no longer see any ads in the chat, and
              you will be able to use the bot without any interruptions.
            </p>
          </li>
          <li>
            <h3 className="font-semibold text-lg">GPT-4 access</h3>
            <p>
              Be part of the few people that have access to GPT-4 - while still
              being cheaper than ChatGPT Plus.
            </p>
          </li>
          <li>
            <h3 className="font-semibold text-lg">
              Earlier access to new features
            </h3>
            <p>
              As a Premium member, you get access to preview features that we
              may add in the future, before the rest.
            </p>
          </li>
          <li>
            <h3 className="font-semibold text-lg">
              ...a special place in our️️️ ❤
            </h3>
            <p>
              Keeping this bot free is our top priority, but it wouldn&apos;t be
              possible without supporters like you. Feel free to become one of
              the supporters of the bot.
            </p>
          </li>
        </ul>
      </div>*/}
      <div className="flex flex-col items-center overflow-y-auto h-[100vh] w-[100vw] py-[5vh]">
        <h1 className="text-4xl font-semibold">Turing AI Premium</h1>
        <SubSelector
          sub={sub}
          setSub={(e: any) => {
            setSub(e);
            setCredits("default");
            if (e == "server") getDiscordServers();
          }}
        />
        {sub == "server" && (
          <div className="flex flex-col items-center">
            <select
              className="bg-gray-900 outline-none bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] rounded-lg shadow-lg p-2"
              onChange={(e) => {
                setSelectedServer(e.target.value);
              }}
            >
              <option value="default">Select a server</option>
              {servers.map((server: any) => (
                <option value={server.id} key={server.id}>
                  {server.name}
                </option>
              ))}
            </select>
            {/* 
            <div
              className={`flex flex-row items-center w-[600px] overflow-x-auto bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] rounded-lg p-2 select-none`}
            >
              {servers.map((server: any) => (
                <div
                  className={`flex flex-col items-center gap-1 px-4`}
                  key={server.id}
                >
                  <Image
                    src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`}
                    width={64}
                    height={64}
                    alt="server icon"
                    className="rounded-full"
                  />
                </div>
              ))}
            </div>
            */}
          </div>
        )}
        {/* fixed price plan card */}
        <div className="flex flex-col  md:flex-row items-start gap-8">
          <div className=" mt-2 flex flex-col  bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] items-center w-[300px] h-[420px] rounded-lg shadow-lg justify-between p-2">
            <div className="items-center flex-col flex">
              <h2 className="text-2xl font-semibold w-fit">Fixed plan</h2>
              <p className="w-fit">{sub == "user" ? 4.99 : 19.99}€/month</p>
              <div>
                <ul className="list-disc mt-2 w-fit">
                  <li
                    title="Chat with the bot for as long as you want - without being
              interrupted by an annoying cool-down! ⏰ Your cool-down will be
              lowered to an amazing 14 seconds, for all normal models."
                    className="cursor-help text-lg"
                  >
                    Way lower cooldown
                  </li>
                  <li className="cursor-help text-lg">
                    Bigger token/character limit
                  </li>
                  <li className="cursor-help text-lg">No ads</li>
                  <li className="cursor-help  text-lg">GPT-4 access</li>
                  <li className="cursor-help  text-lg">
                    Earlier access to new features
                  </li>
                  <li className="cursor-help text-lg">
                    ...a special place in our️️️ ❤
                  </li>
                </ul>
              </div>
            </div>

            <PayButtons handleSubscribe={handleSubscribe} />
          </div>
          {/*     
          <div className=" mt-2 flex flex-col  bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] items-center w-[300px] h-[420px] rounded-lg shadow-lg justify-between p-2 ">
            <div className="items-center flex-col flex">
              <h2 className="text-2xl font-semibold w-fit">
                Pay as you go Plan
              </h2>
              <div className="flex flex-col items-center mt-2">
                <input
                  id="default-range"
                  type="range"
                  min={sub == "user" ? 3 : 10}
                  max={sub == "user" ? 100 : 200}
                  value={
                    credits == "default" ? (sub == "user" ? 10 : 20) : credits
                  }
                  onChange={handleCreditChange}
                  step="1.00"
                  className="w-full  h-2 bg-none outline-none rounded-lg appearance-none cursor-pointer "
                />
                <p className="w-fit text-sm">
                  {credits == "default" ? (sub == "user" ? 10 : 20) : credits}$
                </p>
              </div>

              <ul className="list-disc mt-2 ml-6 w-fit">
                <li
                  title="Chat with the bot for as long as you want - without being
              interrupted by an annoying cool-down! ⏰ Your cool-down will be
              lowered to an amazing 14 seconds, for all normal models."
                  className="cursor-help text-lg"
                >
                  No cooldown
                </li>
                <li className="cursor-help text-lg">No ads</li>
                <li className="cursor-help text-lg">
                  No token/character limit
                </li>
                <li className="cursor-help  text-lg">
                  GPT-4 and ChatGPT Plugins access
                </li>
                <li className="cursor-help  text-lg">
                  Earlier access to new features
                </li>
                <li className="cursor-help text-lg">
                  ...a special place in our️️️ ❤
                </li>
              </ul>
            </div>

            <PayButtons handleSubscribe={handleSubscribe} />
          </div>*/}
        </div>
      </div>
    </div>
  );
}
