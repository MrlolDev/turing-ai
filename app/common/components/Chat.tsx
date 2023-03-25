"use client";
import Navbar from "./Navbar";
import Chatbar from "./Chatbar";
import UserMessage from "./messages/user";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { type } from "os";

export default function Chat() {
  let [messages, setMessages] = useState<
    Array<{ text: string; sender: "User" | "AI"; time: string }>
  >([]);
  function addMessage(msg: any) {
    messages.push({
      text: msg,
      sender: "User",
      time: formatTime(Date.now()),
    });
    setMessages([...messages]);
    console.log(messages);
    messages.push({
      text: `Answer`,
      sender: "AI",
      time: formatTime(Date.now()),
    });
    setMessages([...messages]);
  }
  // format time to hh:mm:ss
  function formatTime(time: number) {
    let date = new Date(time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  }
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <Navbar />
      <main className="min-h-[86vh] relative top-[14vh] w-full flex flex-col items-center  ">
        {/* messages div */}
        <div className="flex flex-col gap-2 w-[80vw] h-[76vh] pb-2 overflow-y-auto list-none overflow-x-none px-2">
          {messages.map((message) => (
            <div
              key={message.time}
              className={`flex flex-row ${
                message.sender == "User" ? "justify-end " : "justify-start"
              } items-center gap-2 `}
            >
              <div className="bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 py-1 px-2 border border-gray-100/[.25]}">
                <p>{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <Chatbar
          addMessage={(...args) => {
            addMessage(...args);
          }}
        />
        <footer className="text-sm text-gray-100/[.75] mt-1">
          Service powered by{" "}
          <a
            className="underline hover:text-turing-blue"
            href="https://dsc.gg/turing"
          >
            Turing AI
          </a>
        </footer>
      </main>
    </>
  );
}
