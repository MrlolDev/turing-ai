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
  let [token, setToken] = useState<string | null>(null);
  function getres(text: string, photo?: any) {
    console.log(token);
    if (!token) {
      setIsProcessing(false);
      return alert("Please verify you are not a robot");
    }

    addMessage(text, token, photo);
    setToken(null);
  }

  return (
    <>
      {mode == "text" ? (
        <Text
          sendMsg={getres}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          token={token}
          setToken={setToken}
        />
      ) : (
        <Voice
          sendMsg={getres}
          speechToTextModel={speechToTextModel}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
          token={token}
          setToken={setToken}
        />
      )}
    </>
  );
}
