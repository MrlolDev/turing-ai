"use client";
import Image from "next/image";

export default function Text({ sendMsg }: { sendMsg: (text: string) => void }) {
  function send(text: string) {
    // check value
    if (text == "") {
      return;
    }
    // send message
    sendMsg(text);
  }
  return (
    <div className="flex flex-row items-center relative gap-2">
      <input
        type="text"
        className="w-[80vw] h-[5vh] rounded-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] text-white placeholder-gray-100/[.5] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent px-2"
        placeholder="Type a message..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            send(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
      {/* inside a circle with a gradient from purple to greenblue with gradient shadow*/}
      <button
        className="relative h-[5vh] w-[5vh] rounded-full bg-gradient-to-br from-turing-blue to-turing-purple shadow-lg flex items-center justify-center cursor-pointer text-sm"
        onClick={() => {
          let input = document.querySelector("input");
          if (input) {
            send(input.value);
            input.value = "";
          }
        }}
      >
        <i className="fas fa-paper-plane text-white"></i>
      </button>
    </div>
  );
}
