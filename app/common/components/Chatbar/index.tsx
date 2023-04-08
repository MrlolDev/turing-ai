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
  resetConversation,
}: {
  addMessage: (text: string, token: any, photo?: any) => void;
  mode: any;
  speechToTextModel: any;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  resetConversation: any;
}) {
  function getres(text: string, token: any, photo?: any) {
    if (!token) {
      setIsProcessing(false);
      return alert("Please verify you are not a robot");
    }
    console.log(photo);
    addMessage(text, token, photo);
  }

  return (
    <>
      {mode == "text" ? (
        <Text
          sendMsg={getres}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          resetConversation={resetConversation}
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
