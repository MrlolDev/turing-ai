"use client";
import Voice from "./voice";
import Text from "./text";
import { useRef, useState } from "react";

export default function Chatbar({
  addMessage,
  mode,
  speechToTextModel,
  isProcessing,
  setIsProcessing,
}: {
  addMessage: (text: string, token: any, photo?: any) => void;
  mode: any;
  speechToTextModel: any;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}) {
  function getres(text: string, token: any, photo?: any) {
    console.log(token);
    if (!token) {
      setIsProcessing(false);
      return alert("Please verify you are not a robot");
    }

    addMessage(text, token, photo);
  }

  return (
    <>
      {mode == "text" ? (
        <Text
          sendMsg={getres}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      ) : (
        <Voice
          sendMsg={getres}
          speechToTextModel={speechToTextModel}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      )}
    </>
  );
}
