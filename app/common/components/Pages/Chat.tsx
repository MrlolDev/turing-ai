"use client";
import Navbar from "../Navbar";
import Chatbar from "../Chatbar";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useLocalStorage } from "react-use";
import useUser from "../../hooks/useUser";
import { v4 as uuidv4 } from "uuid";
import Loading from "./Loading";

export default function Chat() {
  const [mode, setMode] = useLocalStorage("mode", "text");
  const { status, profile } = useUser(true);
  let [messages, setMessages] = useState<
    Array<{ id: string; text: string; sender: "User" | "AI"; time: string }>
  >([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      // @ts-ignore
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (status === "loading" || profile.id === "loading") {
    return <Loading message="Loading" />;
  }

  if (profile.premium == false) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <h1 className="text-2xl font-bold">
          You need to be a premium user to use this feature
        </h1>
      </div>
    );
  }
  async function addMessage(msg: any) {
    let model = "chatgpt";
    messages.push({
      id: uuidv4(),
      text: msg,
      sender: "User",
      time: formatTime(Date.now()),
    });
    setMessages([...messages]);
    // add loading message that dissapears after 2 seconds
    messages.push({
      id: uuidv4(),
      text: "Loading...",
      sender: "AI",
      time: formatTime(Date.now()),
    });
    setMessages([...messages]);
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/${model}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.access_token}`,
      },
      body: JSON.stringify({
        message: msg,
        userName: profile.user_metadata?.full_name,
        conversationId: `${model}-${profile.user_metadata?.sub}`,
      }),
    });
    let data = await res.json();
    messages.pop();
    setMessages([...messages]);

    messages.push({
      id: uuidv4(),
      text: data.response,
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
  return (
    <>
      <Navbar mode={mode} setMode={setMode} />
      <main className="min-h-[86vh] relative top-[14vh] w-full flex flex-col items-center  ">
        {/* messages div */}
        <div className="flex flex-col gap-2 w-[80vw] h-[70vh] pb-2 overflow-y-auto list-none overflow-x-none pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
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
          mode={mode}
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
