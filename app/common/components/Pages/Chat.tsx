"use client";
import Navbar from "../Navbar";
import Chatbar from "../Chatbar";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useLocalStorage } from "react-use";
import useUser from "../../hooks/useUser";
import { v4 as uuidv4 } from "uuid";
import Loading from "./Loading";
import Image from "next/image";
import { Tooltip } from "react-tooltip";
import md from "markdown-it";
import { useRouter } from "next/navigation";
import ApplyPage from "./Apply";
import WaitPage from "./Wait";

export default function Chat() {
  const router = useRouter();
  const [mode, setMode] = useLocalStorage("mode", "text");
  const [model, setModel] = useLocalStorage("model", "chatgpt");
  let [isProcessing, setIsProcessing] = useState(false);
  const [searchEngine, setSearchEngine] = useLocalStorage(
    "searchEngine",
    "google"
  );
  const [imageGenerator, setImageGenerator] = useLocalStorage(
    "imageGenerator",
    "stable-diffusion"
  );
  const [audioGenerator, setAudioGenerator] = useLocalStorage(
    "audioGenerator",
    "riffusion"
  );
  const [videoGenerator, setVideoGenerator] = useLocalStorage(
    "videoGenerator",
    "damo-text-to-video"
  );
  const [imageModificator, setImageModificator] = useLocalStorage(
    "imageModificator",
    "controlnet"
  );
  const [imageReader, setImageReader] = useLocalStorage(
    "imageReader",
    "blip-2"
  );
  const [codeRunner, setCodeRunner] = useLocalStorage(
    "codeRunner",
    "codesandbox"
  );
  let [speechToTextModel, setSpeechToTextModel] = useLocalStorage(
    "speechToTextModel",
    "whisper"
  );
  const [allowNsfw, setAllowNsfw] = useLocalStorage("allowNsfw", false);
  const { status, profile } = useUser(true);
  const [lastPhoto, setLastPhoto] = useState<{
    img: string;
    description?: string | null;
  } | null>(null);

  let [messages, setMessages] = useState<
    Array<{
      id: string;
      text: string;
      sender: "User" | "AI" | "Error";
      time: string;
      data: {
        photo?: string;
        photoDescription?: string | null;
        video?: string;
        videoDescription?: string | null;
        audio?: string;
        audioDescription?: string | null;
      };
    }>
  >([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      // @ts-ignore
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (status === "loading" || profile.id === "loading") {
    return <Loading message="Loading" />;
  }

  if (profile.tester.apply == false) {
    return <ApplyPage />;
  }
  if (profile.tester.apply == true && profile.tester.approved == false) {
    return <WaitPage />;
  }

  async function addMessage(msg: any, token: string, photo?: any) {
    setLastPhoto({
      img: photo,
      description: null,
    });
    messages.push({
      id: uuidv4(),
      text: msg,
      sender: "User",
      time: formatTime(Date.now()),
      data: {
        photo: photo,
        photoDescription: null,
      },
    });
    setMessages([...messages]);
    // add loading message that dissapears after 2 seconds
    messages.push({
      id: uuidv4(),
      text: "Loading...",
      sender: "AI",
      time: formatTime(Date.now()),
      data: {},
    });
    setMessages([...messages]);
    let res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/alan/${model}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${profile.access_token}`,
        "x-captcha-token": token,
      },
      body: JSON.stringify({
        message: msg,
        userName: profile.user_metadata?.full_name,
        conversationId: `alan-${model}-${profile.user_metadata?.sub}`,
        searchEngine: searchEngine,
        photo: lastPhoto ? lastPhoto.img : null,
        photoDescription: lastPhoto ? lastPhoto.description : null,
        imageGenerator: imageGenerator,
        nsfwFilter: allowNsfw,
        videoGenerator: videoGenerator,
        audioGenerator: audioGenerator,
        imageModificator: imageModificator,
      }),
    });
    let data = await res.json();
    messages.pop();
    setMessages([...messages]);
    if (!data.error) {
      let photoResult;
      if (data.images) {
        photoResult = data.images[0];
        setLastPhoto({
          img: photoResult,
          description: data.photoPrompt,
        });
      }

      console.log(data);
      let contentHtml = "";
      if (data.response) {
        contentHtml = md().render(data.response);
      }

      messages.push({
        id: uuidv4(),
        text: contentHtml,
        sender: "AI",
        time: formatTime(Date.now()),
        data: {
          photo: photoResult,
          photoDescription: data.photoPrompt,
          video: data.video,
          videoDescription: data.videoPrompt,
          audio: data.audio,
          audioDescription: data.audioPrompt,
        },
      });
      setMessages([...messages]);
    } else {
      messages.push({
        id: uuidv4(),
        text: data.error,
        sender: "Error",
        time: formatTime(Date.now()),
        data: {},
      });
      setMessages([...messages]);
    }
    setIsProcessing(false);
  }
  // format time to hh:mm:ss
  function formatTime(time: number) {
    let date = new Date(time);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  }
  async function resetConversation(token: string | null) {
    if (!token) return alert("Please complete the captcha");
    let res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/conversation/alan-${model}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${profile.access_token}`,
          "x-captcha-token": token,
        },
        body: JSON.stringify({
          conversationId: `alan-${model}-${profile.user_metadata?.sub}`,
        }),
      }
    );
    let data = await res.json();
    if (!data.error) {
      alert("Conversation reset");
      setMessages([]);
    } else {
      messages.push({
        id: uuidv4(),
        text: data.error,
        sender: "Error",
        time: formatTime(Date.now()),
        data: {},
      });
      setMessages([...messages]);
    }
  }

  return (
    <>
      <Navbar
        resetConversation={resetConversation}
        mode={mode}
        setMode={setMode}
        model={model}
        setModel={setModel}
        searchEngine={searchEngine}
        setSearchEngine={setSearchEngine}
        imageGenerator={imageGenerator}
        setImageGenerator={setImageGenerator}
        audioGenerator={audioGenerator}
        setAudioGenerator={setAudioGenerator}
        videoGenerator={videoGenerator}
        setVideoGenerator={setVideoGenerator}
        imageModificator={imageModificator}
        setImageModificator={setImageModificator}
        imageReader={imageReader}
        setImageReader={setImageReader}
        codeRunner={codeRunner}
        setCodeRunner={setCodeRunner}
        allowNsfw={allowNsfw}
        setAllowNsfw={setAllowNsfw}
        speechToTextModel={speechToTextModel}
        setSpeechToTextModel={setSpeechToTextModel}
      />
      <main className="min-h-[86vh] relative top-[14vh] w-full flex flex-col items-center  ">
        {/* messages div */}
        <div className="flex flex-col gap-2 h-full w-full min-h-[70vh] max-h-[60vh] py-2 overflow-y-auto list-none overflow-x-none pr-2">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-row ${
                message.sender == "User" ? "justify-end " : "justify-start"
              } items-center gap-2 `}
            >
              <div
                className={`${
                  message.sender == "Error"
                    ? "border-red-500/[.25] bg-red-500 "
                    : "border-gray-100/[.25] bg-gray-500 "
                }rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 py-1 px-2 border max-w-[70vw] sm:max-w-[40vw]`}
              >
                <Tooltip id={`${message.id}-photo`} />
                <Tooltip id={`${message.id}-video`} />
                <Tooltip id={`${message.id}-audio`} />
                {message.data.photo && message.sender == "User" && (
                  <img
                    className="w-20 h-20 rounded object-fill"
                    src={message.data.photo}
                    alt="message photo"
                    width={80}
                    height={80}
                    data-tooltip-id={`${message.id}-photo`}
                    data-tooltip-content={
                      message.data.photoDescription
                        ? message.data.photoDescription
                        : "No description"
                    }
                    onClick={
                      message.data.photo
                        ? () => {
                            window.open(message.data.photo, "_blank");
                          }
                        : undefined
                    }
                  />
                )}
                <div
                  className="markdown prose w-full break-words dark:prose-invert light"
                  dangerouslySetInnerHTML={{ __html: message.text }}
                ></div>{" "}
                {message.data.photo && message.sender == "AI" && (
                  <img
                    className=" w-40 h-40 rounded object-fill cursor-pointer"
                    src={message.data.photo}
                    alt="message photo"
                    width={160}
                    height={160}
                    data-tooltip-id={`${message.id}-photo`}
                    data-tooltip-content={
                      message.data.photoDescription
                        ? message.data.photoDescription
                        : "No description"
                    }
                    onClick={
                      message.data.photo
                        ? () => {
                            window.open(message.data.photo, "_blank");
                          }
                        : undefined
                    }
                  />
                )}
                {message.data.video && (
                  <video
                    className="w-40 h-40 rounded object-fill cursor-pointer"
                    src={message.data.video}
                    width={160}
                    height={160}
                    data-tooltip-id={`${message.id}-video`}
                    data-tooltip-content={
                      message.data.videoDescription
                        ? message.data.videoDescription
                        : "No description"
                    }
                    controls
                  />
                )}
                {message.data.audio && (
                  <audio
                    className=" rounded object-fill cursor-pointer"
                    src={message.data.audio}
                    data-tooltip-id={`${message.id}-audio`}
                    data-tooltip-content={
                      message.data.audioDescription
                        ? message.data.audioDescription
                        : "No description"
                    }
                    controls
                  />
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="fixed bottom-2 flex flex-col items-center mx-10">
          <Chatbar
            addMessage={(msg, token, photo?) => {
              addMessage(msg, token, photo);
            }}
            mode={mode}
            speechToTextModel={speechToTextModel}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            setLastPhoto={setLastPhoto}
            lastPhoto={lastPhoto}
            resetConversation={resetConversation}
          />
          <footer className="text-sm text-gray-100/[.75] ">
            Service powered by{" "}
            <a
              className="underline hover:text-turing-blue"
              href="https://dsc.gg/turing"
            >
              Turing AI
            </a>
          </footer>
        </div>
      </main>
    </>
  );
}
