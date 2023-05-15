"use client";
import Image from "next/image";

export default function PayButtons({
  handleSubscribe,
}: {
  handleSubscribe: (e: any) => void;
}) {
  return (
    <div className="grid grid-cols-2 justify-center items-center gap-2 text-center">
      {/* grid of 2 cols and auto rows */}
      {/* payment methods */}
      <button
        className="bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 hover:bg-opacity-50 px-4 sm:px-10 md:px-4 rounded-md transition duration-200 border border-gray-100/[.2] flex flex-row items-center gap-2   outline-none"
        onClick={() => handleSubscribe("paypal")}
      >
        <i className="fab fa-paypal"></i>
        PayPal
      </button>
      <button
        className="bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 hover:bg-opacity-50 px-4 sm:px-10 md:px-4 rounded-md transition duration-200 border border-gray-100/[.2] flex flex-row items-center gap-2 outline-none"
        onClick={() => handleSubscribe("stripe")}
      >
        <i className="fab fa-cc-visa"></i>
        Credit Card
      </button>
      <button
        className="bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 hover:bg-opacity-50 px-4 sm:px-10 md:px-4 rounded-md transition duration-200 border border-gray-100/[.2] flex flex-row items-center gap-2  outline-none"
        onClick={() => handleSubscribe("bitcoin")}
      >
        <i className="fab fa-bitcoin"></i>
        Bitcoin
      </button>
      <button
        className="bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 hover:bg-opacity-50 px-4 sm:px-10 md:px-4 rounded-md transition duration-200 border border-gray-100/[.2] flex flex-row items-center gap-2 outline-none"
        onClick={() => handleSubscribe("ethereum")}
      >
        <i className="fab fa-ethereum"></i>
        Ethereum
      </button>

      <button
        className="bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 hover:bg-opacity-50 px-4 sm:px-10 md:px-4 rounded-md transition duration-200 border border-gray-100/[.2] flex flex-row items-center gap-2 outline-none"
        onClick={() => handleSubscribe("monero")}
      >
        <i className="fab fa-monero"></i>
        Monero
      </button>
      <button
        className="bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 hover:bg-opacity-50 px-4 sm:px-10 md:px-4 rounded-md transition duration-200 border border-gray-100/[.2] flex flex-row items-center gap-2 outline-none"
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
  );
}
