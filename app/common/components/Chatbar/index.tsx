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
  setLastPhoto,
  lastPhoto,
  messages,
  userId,
}: {
  addMessage: (text: string, token: any, photo?: any) => void;
  mode: any;
  speechToTextModel: any;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  resetConversation: any;
  setLastPhoto: any;
  lastPhoto: any;
  messages: any;
  userId: string;
}) {
  async function getres(text: string, token: any, photo?: any) {
    if (!token) {
      setIsProcessing(false);
      return alert("Please verify you are not a robot");
    }
    await addMessage(text, token, photo);
  }

  return (
    <>
      {mode == "text" ? (
        <Text
          sendMsg={getres}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          resetConversation={resetConversation}
          messages={messages}
          userId={userId}
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
