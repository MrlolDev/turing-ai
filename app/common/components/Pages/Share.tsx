"use client";
import { Tooltip } from "react-tooltip";
import { useEffect, useRef, useState } from "react";
import supabase from "@/app/common/lib/supabase";
import Loading from "@/app/common/components/Pages/Loading";

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
            <div
              key={message.id}
              className={`flex flex-row ${
                message.sender == "User" ? "justify-end " : "justify-start"
              } items-center gap-2 `}
            >
              <div
                className={`${
                  message.sender == "Error"
                    ? "border-red-500/[.25] bg-red-500 "
                    : "border-gray-100/[.25] bg-gray-500 "
                }rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 py-1 px-2 border max-w-[70vw] sm:max-w-[40vw]`}
              >
                <Tooltip id={`${message.id}-photo`} />
                <Tooltip id={`${message.id}-video`} />
                <Tooltip id={`${message.id}-audio`} />
                {message.data.photo && message.sender == "User" && (
                  <img
                    className="w-20 h-20 rounded object-fill"
                    src={message.data.photo}
                    alt="message photo"
                    width={80}
                    height={80}
                    data-tooltip-id={`${message.id}-photo`}
                    data-tooltip-content={
                      message.data.photoDescription
                        ? message.data.photoDescription
                        : "No description"
                    }
                    onClick={
                      message.data.photo
                        ? () => {
                            window.open(message.data.photo, "_blank");
                          }
                        : undefined
                    }
                  />
                )}
                <div
                  className="markdown prose w-full break-words dark:prose-invert light"
                  dangerouslySetInnerHTML={{ __html: message.text }}
                ></div>{" "}
                {message.data.photo && message.sender == "AI" && (
                  <img
                    className=" w-40 h-40 rounded object-fill cursor-pointer"
                    src={message.data.photo}
                    alt="message photo"
                    width={160}
                    height={160}
                    data-tooltip-id={`${message.id}-photo`}
                    data-tooltip-content={
                      message.data.photoDescription
                        ? message.data.photoDescription
                        : "No description"
                    }
                    onClick={
                      message.data.photo
                        ? () => {
                            window.open(message.data.photo, "_blank");
                          }
                        : undefined
                    }
                  />
                )}
                {message.data.video && (
                  <video
                    className="w-40 h-40 rounded object-fill cursor-pointer"
                    src={message.data.video}
                    width={160}
                    height={160}
                    data-tooltip-id={`${message.id}-video`}
                    data-tooltip-content={
                      message.data.videoDescription
                        ? message.data.videoDescription
                        : "No description"
                    }
                    controls
                  />
                )}
                {message.data.audio && (
                  <audio
                    className=" rounded object-fill cursor-pointer"
                    src={message.data.audio}
                    data-tooltip-id={`${message.id}-audio`}
                    data-tooltip-content={
                      message.data.audioDescription
                        ? message.data.audioDescription
                        : "No description"
                    }
                    controls
                  />
                )}
              </div>
            </div>
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
