"use client";
import { Tooltip } from "react-tooltip";
import { useEffect, useRef, useState } from "react";
import supabase from "@/app/common/lib/supabase";
import Loading from "@/app/common/components/Pages/Loading";
import Message from "../Message";

export default function SharePage({ id }: { id: String }) {
  let [messages, setMessages] = useState<
    | "loading"
    | Array<{
        id: string;
        text: string;
        sender: "User" | "AI" | "Error";
        time: string;
        data: {
          photo?: string;
          photoDescription?: string | null;
          video?: string;
          videoDescription?: string | null;
          audio?: string;
          audioDescription?: string | null;
        };
      }>
  >("loading");

  if (messages == "loading") {
    supabase
      .from("saved_conversations")
      .select("*")
      .eq("id", id)
      .then((res) => {
        if (res.error) console.log(res.error);
        if (!res.data) {
          setMessages([]);
          return;
        }
        if (res.data.length > 0) {
          let msgs = res.data[0].messages;
          setMessages(msgs);
          scrollToBottom();
        }
      });
  }
  function contextMenu(e: any, message: any) {}
  const messagesEndRef = useRef(null);
  function scrollToBottom() {
    // @ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  // scroll to bottom on the first render then never again

  if (messages == "loading")
    return <Loading message="Obtaining messages from conversation" />;
  return (
    <>
      <main className="min-h-[90vh] relative top-[4vh] w-full flex flex-col items-center  ">
        {/* messages div */}
        <div className="flex flex-col gap-2 h-full w-full min-h-[70vh] max-h-[80vh] py-2 overflow-y-auto list-none overflow-x-none pr-2">
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              contextMenu={() => {}}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="fixed bottom-2 flex flex-col items-center mx-10">
          <footer className="text-sm text-gray-100/[.75] ">
            Service powered by{" "}
            <a
              className="underline hover:text-turing-blue"
              href="https://dsc.gg/turing"
            >
              Turing AI
            </a>
          </footer>
        </div>
      </main>
    </>
  );
}
