"use client";
import Image from "next/image";
import { useState } from "react";

export default function Text({
  sendMsg,
}: {
  sendMsg: (text: string, photo?: any) => void;
}) {
  let [photo, setPhoto] = useState<string | null>(null);
  function send(text: string) {
    // check value
    if (text == "") {
      return;
    }

    // send message
    setPhoto(null);
    sendMsg(text, photo);
  }
  return (
    <div className="flex flex-col items-start gap-2 ">
      {photo && (
        <div className="absolute bottom-[18vh]">
          <i
            className="fas fa-times absolute ml-1 text-gray-300 hover:text-white text-xl cursor-pointer z-10"
            onClick={() => setPhoto(null)}
          ></i>
          <img src={photo} alt="Photo" className="h-[15vh]" />
        </div>
      )}
      <div className="flex flex-row items-center relative gap-2 w-full">
        {/*photo */}

        {/*input */}
        <textarea
          className="w-[75.5vw] h-[5vh] rounded-md resize-none bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] text-white placeholder-gray-100/[.5] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent px-2 py-1"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // do not add a new line
              e.preventDefault();

              send(e.currentTarget.value);
              e.currentTarget.value = "";
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
            let input = document.querySelector("textarea");
            if (input) {
              send(input.value);
              input.value = "";
            }
          }}
        >
          <i className="fas fa-paper-plane text-white"></i>
        </button>
      </div>
    </div>
  );
}
