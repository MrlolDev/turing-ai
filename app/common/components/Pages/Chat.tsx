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
import Message from "../Message";
import ContextMenu from "../ContextMenu";
import axios from "axios";
import { fetchEventSource } from "@waylaidwanderer/fetch-event-source";

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
  let [AutoHearMessages, setAutoHearMessages] = useLocalStorage(
    "AutoHearMessages",
    "voice"
  );

  const [allowNsfw, setAllowNsfw] = useLocalStorage("allowNsfw", false);
  const { status, profile } = useUser(true);
  const [lastPhoto, setLastPhoto] = useState<{
    img: string;
    description?: string | null;
  } | null>(null);
  let [ContextMenuData, setContextMenuData] = useState<{
    x: number;
    y: number;
    show: boolean;
    message: any;
  }>({
    x: 0,
    y: 0,
    show: false,
    message: null,
  });

  let [messages, setMessages] = useState<
    Array<{
      id: string;
      text: string;
      sender: "User" | "AI" | "Error";
      time: string;
      data: {
        photo?: string | null;
        photoDescription?: string | null;
        video?: string | null;
        videoDescription?: string | null;
        audio?: string | null;
        audioDescription?: string | null;
      };
    }>
  >([
    {
      id: uuidv4(),
      text: "Hello there! How can I assist you today? 😊",
      sender: "AI",
      time: formatTime(Date.now()),
      data: {
        photo: null,
        photoDescription: null,
        video: null,
        videoDescription: null,
        audio: null,
        audioDescription: null,
      },
    },
  ]);
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

  async function addMessage(msg: any, token: string, type: any, photo?: any) {
    setLastPhoto({
      img: photo,
      description: null,
    });
    // wait for last photo to be set

    console.log(lastPhoto);

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
    let id = uuidv4();
    messages.push({
      id: id,
      text: "Loading...",
      sender: "AI",
      time: formatTime(Date.now()),
      data: {},
    });
    setMessages([...messages]);
    console.log(lastPhoto);
    var done = false;
    let stream = await fetchEventSource(
      `${process.env.NEXT_PUBLIC_API_URL}/text/alan/${model}`,
      {
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
          photo: photo ? photo : lastPhoto ? lastPhoto.img : null,
          photoDescription: lastPhoto ? lastPhoto.description : null,
          imageGenerator: imageGenerator,
          nsfwFilter: allowNsfw,
          videoGenerator: videoGenerator,
          audioGenerator: audioGenerator,
          imageModificator: imageModificator,
        }),

        onmessage: async (event: any) => {
          const data = JSON.parse(event.data);
          if (!data || !data.result) return;
          console.log(data);
          if (AutoHearMessages && type == AutoHearMessages) {
            await HearMsg(data.result);
          }
          if (!data.error) {
            let photoResult;
            if (data.results && data.generated == "image") {
              photoResult = data.results[0];
              await setLastPhoto({
                img: photoResult,
                description: data.generationPrompt,
              });
            }

            let contentHtml = "";
            if (data.result) {
              contentHtml = md().render(data.result);
            }

            let dataR: any = {};
            if (data.generated && data.results) {
              if (data.generated == "image") {
                dataR.photo = data.results[0];
                dataR.photoDescription = data.generationPrompt;
              }
              if (data.generated == "video") {
                dataR.video = data.results;
                dataR.videoDescription = data.generationPrompt;
              }
              if (data.generated == "audio") {
                dataR.audio = data.results;
                dataR.audioDescription = data.generationPrompt;
              }
            }
            if (data.generating) {
              await editMessage(
                id,
                `${contentHtml}\n\n<i>Generating ${data.generating}...</i>`,
                "AI",
                dataR
              );
            } else {
              await editMessage(id, contentHtml, "AI", dataR);
            }
          } else {
            await editMessage(id, data.error, "Error");
          }
          if (data.done) {
            setIsProcessing(false);
          }
        },
        onclose: () => {
          if (!done) {
            done = true;
          }
        },
        onerror: (error: any) => {
          throw error;
        },
        onopen: async (response: any) => {},
      }
    );
    console.log(stream);
    let data;

    return;
    let lastData = data.split("}\n\n").filter((x: any) => x != "");
    lastData = lastData[lastData.length - 1] + "}";
    // itt starts with data: {
    lastData = lastData.split("data: ")[1];
    console.log(lastData);
    data = JSON.parse(lastData);
    if (AutoHearMessages && type == AutoHearMessages) {
      await HearMsg(data.result);
    }
    if (!data.error) {
      let photoResult;
      if (data.results && data.generated == "image") {
        photoResult = data.results[0];
        await setLastPhoto({
          img: photoResult,
          description: data.generationPrompt,
        });
      }

      let contentHtml = "";
      if (data.result) {
        contentHtml = md().render(data.result);
      }

      let dataR: any = {};
      if (data.generated && data.results) {
        if (data.generated == "image") {
          dataR.photo = data.results[0];
          dataR.photoDescription = data.generationPrompt;
        }
        if (data.generated == "video") {
          dataR.video = data.results;
          dataR.videoDescription = data.generationPrompt;
        }
        if (data.generated == "audio") {
          dataR.audio = data.results;
          dataR.audioDescription = data.generationPrompt;
        }
      }
      await editMessage(id, contentHtml);
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
  function editMessage(
    id: string,
    msg: string,
    sender?: "User" | "AI" | "Error",
    data?: any
  ) {
    let message = messages.find((x) => x.id == id);
    if (message) {
      message.text = msg;
      if (sender) message.sender = sender;
      if (data) message.data = data;
      setMessages([...messages]);
    }
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
      `${process.env.NEXT_PUBLIC_API_URL}/text/alan/${model}`,
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
    // is a stream, wait for it to finish
    let data = await res.json();
    if (!data.error) {
      alert("Conversation reset");
      setMessages([]);
      setLastPhoto(null);
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
  function contextMenu(e: any, message: any) {
    e.preventDefault();
    e.stopPropagation();
    console.log("right click");

    setContextMenuData({
      show: true,
      x: e.clientX,
      y: e.clientY,
      message: message,
    });
  }
  async function HearMsg(msg: string) {
    let url = `https://api.pawan.krd/tts?text=${encodeURIComponent(
      msg
    )}&voice=arnold`;
    // url is the audio url
    let res = await fetch(url);
    let blob = await res.blob();
    let audio = new Audio(URL.createObjectURL(blob));
    audio.play();
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
        AutoHearMessages={AutoHearMessages}
        setAutoHearMessages={setAutoHearMessages}
      />
      <main className="min-h-[86vh] relative top-[14vh] w-full flex flex-col items-center  ">
        {/* messages div */}
        <ContextMenu
          show={ContextMenuData.show}
          setShow={(show) => {
            setContextMenuData({ ...ContextMenuData, show: show });
          }}
          position={{ x: ContextMenuData.x, y: ContextMenuData.y }}
          sections={[
            {
              items: [
                {
                  content: "Copy",
                  onClick: () => {
                    navigator.clipboard.writeText(
                      ContextMenuData.message
                        ? ContextMenuData.message.text
                        : ""
                    );
                    alert("Copied to clipboard");
                  },
                },
                {
                  content: "Hear message",
                  onClick: async () => {
                    await HearMsg(
                      ContextMenuData.message
                        ? ContextMenuData.message.text
                        : ""
                    );
                  },
                },
                {
                  content: "Download audio",
                  onClick: async () => {
                    let url = `https://api.pawan.krd/tts?text=${encodeURIComponent(
                      ContextMenuData.message
                        ? ContextMenuData.message.text
                        : ""
                    )}&voice=arnold`;
                    // url is the audio url
                    let res = await fetch(url);
                    let blob = await res.blob();
                    let audio = new Audio(URL.createObjectURL(blob));
                    audio.play();
                    let a = document.createElement("a");
                    a.href = URL.createObjectURL(blob);
                    a.download = "audio.mp3";
                    a.click();
                  },
                },
              ],
            },
          ]}
        />
        <div className="flex flex-col gap-2 h-full w-full min-h-[70vh] max-h-[60vh] py-2 overflow-y-auto list-none overflow-x-none pr-2">
          {messages.map((message) => (
            <Message
              key={message.id}
              message={message}
              contextMenu={contextMenu}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="fixed bottom-2 flex flex-col items-center mx-10">
          <Chatbar
            addMessage={(msg, token, type, photo?) => {
              addMessage(msg, token, type, photo);
            }}
            mode={mode}
            speechToTextModel={speechToTextModel}
            isProcessing={isProcessing}
            setIsProcessing={setIsProcessing}
            setLastPhoto={setLastPhoto}
            lastPhoto={lastPhoto}
            messages={messages}
            resetConversation={resetConversation}
            userId={profile.id}
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
