"use client";
import Image from "next/image";
import { useState } from "react";
import Turnstile from "react-turnstile";

export default function Text({
  sendMsg,
  isProcessing,
  setIsProcessing,
  resetConversation,
  messages,
  userId,
}: {
  sendMsg: (text: string, token: any, type: any, photo?: any) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  resetConversation: any;
  messages: any;
  userId: string;
}) {
  let [photo, setPhoto] = useState<string | null>(null);
  let [isDragging, setIsDragging] = useState(false);
  let [text, setText] = useState("");
  //let [showCaptcha, setShowCaptcha] = useState(false);

  async function send(text: string, token: any) {
    // check value
    if (text == "") {
      return;
    }

    // send message
    await sendMsg(text, token, "text", photo);
    setPhoto(null);
  }

  function onDragEnter() {
    setIsDragging(true);
  }
  function onDragLeave() {
    setIsDragging(false);
  }
  function onDragOver() {}
  function onDrop(e: any) {
    // disable default behavior
    e.preventDefault();
    setIsDragging(false);
    // @ts-ignore
    let file = e.dataTransfer.files[0];
    // send file
    // get file url
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // @ts-ignore
      setPhoto(reader.result as string);
    };
  }

  return (
    <div
      className="flex flex-col items-start gap-2 "
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      {photo && (
        <div className="absolute bottom-[10vh]">
          <i
            className="fas fa-times absolute ml-1 mt-1 text-gray-300 hover:text-white bg-gray-600 px-1 rounded-md text-xl cursor-pointer z-10"
            onClick={() => setPhoto(null)}
          ></i>
          <img src={photo} alt="Photo" className="h-[15vh]" />
        </div>
      )}
      <div className="flex flex-row items-center relative gap-2 w-full">
        {/*
        <button
          className="relative h-[5vh] w-[5vh] rounded-full bg-gradient-to-br from-turing-blue to-turing-purple shadow-lg flex items-center justify-center cursor-pointer text-sm transition duration-200 outline-none hover:from-turing-purple hover:to-turing-blue"
          onClick={() => {
            if (!showCaptcha) {
              setShowCaptcha(true);
            }
          }}
          disabled={showCaptcha}
        >
          <i className="fas fa-broom text-white"></i>
        </button>
        {showCaptcha && (
          <Turnstile
            sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
            onVerify={(token) => {
              resetConversation(token);
            }}
            theme="dark"
            size="normal"
            onExpire={() => {
              setIsProcessing(false);
            }}
            onError={() => {
              setIsProcessing(false);
            }}
            onLoad={() => {
              // @ts-ignore
            }}
          />
        )}
        */}
        {/*input */}
        <textarea
          className="w-[75.5vw] h-[5vh] rounded-md resize-none bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] text-white placeholder-gray-100/[.5] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent px-2 py-1"
          placeholder={isDragging ? "Drop to attach" : "Type a message"}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // do not add a new line
              e.preventDefault();
              if (!isProcessing) {
                setIsProcessing(true);
                setText(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }
            // if the user use shift + enter then it will add a new line
            if (e.key === "Enter" && e.shiftKey) {
              e.currentTarget.value += "\n";
            }
          }}
        />
        {/*camera button inside input */}
        <button
          className="px-1 z-40 rounded-fullshadow-lg flex items-center justify-center cursor-pointer text-sm transition duration-200 outline-none text-gray-400 hover:text-white"
          onClick={() => {
            // upload file
            let input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (e) => {
              // @ts-ignore
              let file = e.target.files[0];
              // send file
              // get file url
              let reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                // @ts-ignore
                setPhoto(reader.result as string);
              };
            };
            input.click();
          }}
        >
          <i className="fas fa-camera text-white"></i>
        </button>
        {/* inside a circle with a gradient from purple to greenblue with gradient shadow*/}
        <button
          className="relative h-[5vh] w-[5vh] rounded-full bg-gradient-to-br from-turing-blue to-turing-purple shadow-lg flex items-center justify-center cursor-pointer text-sm transition duration-200 outline-none hover:from-turing-purple hover:to-turing-blue"
          onClick={() => {
            if (!isProcessing) {
              setIsProcessing(true);
              let input = document.querySelector("textarea");
              if (input) {
                setText(input.value);
                input.value = "";
              }
            }
          }}
          disabled={isProcessing}
        >
          <i className="fas fa-paper-plane text-white"></i>
        </button>
        {isProcessing && (
          <Turnstile
            sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
            onVerify={(token) => {
              send(text, token);
            }}
            theme="dark"
            size="normal"
            onExpire={() => {
              setIsProcessing(false);
            }}
            onError={() => {
              setIsProcessing(false);
            }}
            onLoad={() => {
              // @ts-ignore
            }}
          />
        )}
      </div>
    </div>
  );
}
