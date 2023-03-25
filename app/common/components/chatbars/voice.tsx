"use client";
import { useState } from "react";

export default function Voice({
  sendMsg,
}: {
  sendMsg: (text: string) => void;
}) {
  const [recording, setRecording] = useState<any>(null);
  const [audioData, setAudioData] = useState<any>([]);

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
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
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
  async function send() {
    //  get transcription
    let res = await fetch("https://api.turingai.tech/transcript", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.TURING_API}`,
      },
      body: JSON.stringify({
        file: URL.createObjectURL(
          new Blob([audioData], { type: "audio/ogg; codecs=opus" })
        ),
        ai: "gladia",
      }),
    });
    console.log(res);
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
            new Blob([audioData], { type: "audio/ogg; codecs=opus" })
          )}
          className="outline-none"
          controls
        />
      )}
      {recording == "finished" && (
        <button
          className="relative h-[8vh] w-[8vh] rounded-full bg-gradient-to-br from-turing-blue to-turing-purple shadow-lg flex items-center justify-center cursor-pointer text-xl transition duration-200 outline-none hover:from-turing-purple hover:to-turing-blue"
          onClick={() => {
            send();
          }}
        >
          <i className="fas fa-paper-plane text-white"></i>
        </button>
      )}
    </div>
  );
}
