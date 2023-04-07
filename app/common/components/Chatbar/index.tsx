"use client";
import Voice from "./voice";
import Text from "./text";
import { useRef, useState } from "react";
import Turnstile from "react-turnstile";

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
  let captchaRef = useRef<any>(null);
  let [token, setToken] = useState<string | null>(null);
  function getres(text: string, photo?: any) {
    console.log(token);
    if (!token) {
      setIsProcessing(false);
      return alert("Please verify you are not a robot");
    }

    addMessage(text, token, photo);
  }

  return (
    <>
      <Turnstile
        sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
        onVerify={(token) => {
          setToken(token);
        }}
        theme="dark"
        size="normal"
        userRef={captchaRef}
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
