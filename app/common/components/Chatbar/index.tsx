"use client";
import Voice from "./voice";
import Text from "./text";
import Turnstile from "react-turnstile";

export default function Chatbar({
  addMessage,
  mode,
  speechToTextModel,
  isProcessing,
  setIsProcessing,
}: {
  addMessage: (text: string, photo?: any) => void;
  mode: any;
  speechToTextModel: any;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}) {
  function getres(text: string, photo?: any) {
    addMessage(text, photo);
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
