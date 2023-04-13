"use client";
import { useState } from "react";
import useUser from "../../hooks/useUser";
import Turnstile from "react-turnstile";

export default function Voice({
  sendMsg,
  speechToTextModel,
  isProcessing,
  setIsProcessing,
}: {
  sendMsg: (text: string, token: any, photo?: any) => void;
  speechToTextModel: any;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}) {
  const [recording, setRecording] = useState<any>(null);
  const [audioData, setAudioData] = useState<any>([]);
  const { status, profile } = useUser(true);
  let [text, setText] = useState("");
  let [photo, setPhoto] = useState<string | null>(null);

  const handleRecording = async () => {
    if (!recording || recording === "finished") {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const chunks: any = [];

      mediaRecorder.addEventListener("dataavailable", (event) => {
        chunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const blob = new Blob(chunks, { type: "audio/mp3; codecs=opus" });
        const reader = new FileReader();
        reader.readAsArrayBuffer(blob);
        reader.onloadend = () => {
          setAudioData(reader.result);
        };
      });

      setRecording(mediaRecorder);
    } else {
      recording.stop();
      setRecording("finished");
    }
  };
  let [showCaptcha, setShowCaptcha] = useState(false);

  async function send(token: any) {
    //  get transcription
    // array buffer to base64
    if (!audioData) {
      return;
    }
    if (!token) {
      setIsProcessing(false);
      alert("Please verify that you are not a robot :)");
      return;
    }
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transcript`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${profile.access_token}`,
        "Content-Type": "application/json",
        "x-captcha-token": token,
      },
      body: JSON.stringify({
        file: await blobToBase64(
          new Blob([audioData], { type: "audio/mp3; codecs=opus" })
        ),
        ai: speechToTextModel,
      }),
    });
    let response = await res.json();

    sendMsg(response.text, token, null);
    setRecording(null);
    setAudioData([]);
  }
  function blobToBase64(blob: any) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }
  return (
    <div className="flex flex-row items-center relative gap-2">
      <button
        className="relative h-[8vh] w-[8vh] rounded-full bg-gradient-to-br from-turing-blue to-turing-purple shadow-lg flex items-center justify-center cursor-pointer text-xl transition duration-200 outline-none hover:from-turing-purple hover:to-turing-blue"
        onClick={handleRecording}
      >
        <i
          className={`fas ${
            recording && recording != "finished"
              ? "fas fa-square"
              : "fa-microphone"
          } text-white`}
        ></i>
      </button>
      {audioData && recording == "finished" && (
        <audio
          src={URL.createObjectURL(
            new Blob([audioData], { type: "audio/mp3; codecs=opus" })
          )}
          className="outline-none"
          controls
        />
      )}
      {recording == "finished" && (
        <button
          className="relative h-[8vh] w-[8vh] rounded-full bg-gradient-to-br from-turing-blue to-turing-purple shadow-lg flex items-center justify-center cursor-pointer text-xl transition duration-200 outline-none hover:from-turing-purple hover:to-turing-blue"
          onClick={() => {
            if (!isProcessing) {
              setIsProcessing(true);
            }
          }}
          disabled={isProcessing}
        >
          <i className="fas fa-paper-plane text-white"></i>
        </button>
      )}
      {isProcessing && (
        <Turnstile
          sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
          onVerify={(token) => {
            send(token);
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
  );
}
