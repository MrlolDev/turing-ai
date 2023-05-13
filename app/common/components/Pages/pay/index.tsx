"use client";
import useUser from "../../../hooks/useUser";
import Loading from "../Loading";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
// @ts-ignore
import sellix from "@sellix/node-sdk";

export default function PayPage() {
  const router = useRouter();
  const { status, profile } = useUser(true);

  if (status === "loading" || profile.id === "loading") {
    return <Loading message="Loading" />;
  }
  async function handleSubscribe(e: any) {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.access_token}`,
      },
      body: JSON.stringify({
        productId: "645fb8d0eb031",
        email: profile.email,
        gateway: e,
        name: profile.user.user_metadata.name,
        userId: profile.user.user_metadata.id,
      }),
    });
    let session = await res.json();
    window.location = session.url;
  }

  return (
    <div className="flex flex-col items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <div className="flex flex-col items-center">
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
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-semibold">Select your payment method</h2>
        <p>Buy your TuringAI premium subscription for 4.99€</p>
        <div className="flex flex-row items-center gap-2">
          {/* payment methods */}
          <button
            className="bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 hover:bg-opacity-50 px-4 sm:px-10 md:px-4 rounded-md transition duration-200 border border-gray-100/[.2] flex flex-row items-center gap-2 text-lg  outline-none"
            onClick={() => handleSubscribe("paypal")}
          >
            <i className="fab fa-paypal"></i>
            PayPal
          </button>
          <button
            className="bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 hover:bg-opacity-50 px-4 sm:px-10 md:px-4 rounded-md transition duration-200 border border-gray-100/[.2] flex flex-row items-center gap-2 text-lg outline-none"
            onClick={() => handleSubscribe("stripe")}
          >
            <i className="fab fa-cc-visa"></i>
            Credit Card
          </button>
          <button
            className="bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 hover:bg-opacity-50 px-4 sm:px-10 md:px-4 rounded-md transition duration-200 border border-gray-100/[.2] flex flex-row items-center gap-2 text-lg outline-none"
            onClick={() => handleSubscribe("bitcoin")}
          >
            <i className="fab fa-bitcoin"></i>
            Bitcoin
          </button>
          <button
            className="bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 hover:bg-opacity-50 px-4 sm:px-10 md:px-4 rounded-md transition duration-200 border border-gray-100/[.2] flex flex-row items-center gap-2 text-lg outline-none"
            onClick={() => handleSubscribe("ethereum")}
          >
            <i className="fab fa-ethereum"></i>
            Ethereum
          </button>
          <button
            className="bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 hover:bg-opacity-50 px-4 sm:px-10 md:px-4 rounded-md transition duration-200 border border-gray-100/[.2] flex flex-row items-center gap-2 text-lg outline-none"
            onClick={() => handleSubscribe("BINANCE_COIN")}
          >
            <Image
              src="https://cdn.worldvectorlogo.com/logos/binance-logo.svg"
              className="w-6 h-6"
              width={24}
              height={24}
              alt="Binance"
            />
            Binance
          </button>
        </div>
      </div>
    </div>
  );
}
