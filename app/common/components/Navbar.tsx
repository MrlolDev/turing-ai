import Image from "next/image";
import { useRef } from "react";
import SystemMenu from "./SystemMenu";

export default function Navbar({
  mode,
  setMode,
  model,
  setModel,
  searchEngine,
  setSearchEngine,
}: {
  mode: any;
  setMode: any;
  model: any;
  setModel: any;
  searchEngine: any;
  setSearchEngine: any;
}) {
  let sideBar = useRef(null);
  let socials = [
    {
      name: "Twitter",
      icon: "fab fa-twitter",
      link: "https://twitter.com/alan_ai",
    },
    {
      name: "GitHub",
      icon: "fab fa-github",
      link: "",
    },
    {
      name: "Discord",
      icon: "fab fa-discord",
      link: "https://discord.gg/alanai",
    },
  ];
  let searchEngines = [
    {
      name: "Google",
      value: "google",
      disabled: false,
    },
    {
      name: "DuckDuckGo",
      value: "duckduckgo",
      disabled: false,
    },
    {
      name: "Bing",
      value: "bing",
      disabled: true,
    },
    {
      name: "Yahoo",
      value: "yahoo",
      disabled: true,
    },
    {
      name: "Yandex",
      value: "yandex",
      disabled: true,
    },
  ];
  let models = [
    {
      name: "ChatGPT",
      value: "chatgpt",
      developer: "OpenAI",
      disabled: false,
    },
    {
      name: "GPT-4",
      value: "gpt4",
      developer: "OpenAI",
      disabled: true,
    },
    {
      name: "GPT-3",
      value: "gpt3",
      developer: "OpenAI",
      disabled: true,
    },
    {
      name: "LLaMa",
      value: "llama",
      developer: "Meta",
      disabled: true,
    },
    {
      name: "Alpaca",
      value: "alpaca",
      developer: "Tatsu",
      disabled: true,
    },
    {
      name: "OpenAssistant",
      value: "openassistant",
      developer: "LAION",
      disabled: true,
    },
    {
      name: "GPT-neoX",
      value: "gpt-neox",
      developer: "EleutherAI",
      disabled: true,
    },
  ];
  return (
    <>
      <nav className="flex flex-row items-center justify-between w-[80vw] absolute top-[4vh] left-[50%] translate-x-[-50%]">
        <Image
          src="/neon.png"
          alt="Alan AI Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
        <SystemMenu mode={mode} setMode={setMode} />
        <div
          onClick={() => {
            // @ts-ignore
            sideBar.current.classList.toggle("hidden");
          }}
          className="cursor-pointer"
        >
          <i className="fas fa-bars text-gray-300 hover:text-white transition duration-300 text-xl"></i>
        </div>
      </nav>
      {/*side bar */}
      <nav
        ref={sideBar}
        className="w-[95vw] md:w-[30vw] h-[95vh] fixed right-[2.5vw] top-[2.5vh] z-50 flex flex-col justify-between bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 py-1 px-2 border border-gray-100/[.25]"
      >
        <div>
          <div className="flex flex-row items-center justify-between gap-2">
            <Image
              src="/neon.png"
              alt="Alan AI Logo"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div
              onClick={() => {
                // @ts-ignore
                sideBar.current.classList.toggle("hidden");
              }}
              className="cursor-pointer"
            >
              <i className="fas fa-times text-gray-300 hover:text-white transition duration-300 text-xl"></i>
            </div>
          </div>
          {/* settings */}
          <div className="flex flex-col gap-2 mt-6 items-start">
            <h3 className="text-gray-300 font-bold text-xl">Settings</h3>
            <div className="flex flex-col items-start gap-2 mt-2">
              <p className="text-gray-300 font-bold">Base model</p>
              <select
                className=" rounded-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] text-white placeholder-gray-100/[.5] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent px-2 py-1  outline-none"
                value={model}
                onChange={(e) => {
                  setModel(e.target.value);
                }}
              >
                {models.map((model) => (
                  <option
                    key={model.name}
                    value={model.value}
                    disabled={model.disabled}
                  >
                    {model.name} ({model.developer})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-start gap-2 mt-2">
              <p className="text-gray-300 font-bold">Search engine</p>
              <select
                className=" rounded-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] text-white placeholder-gray-100/[.5] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent px-2 py-1  outline-none"
                value={searchEngine}
                onChange={(e) => {
                  setSearchEngine(e.target.value);
                }}
              >
                {searchEngines.map((searchEngine) => (
                  <option
                    key={searchEngine.name}
                    value={searchEngine.value}
                    disabled={searchEngine.disabled}
                  >
                    {searchEngine.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* links */}
        <ul className="flex flex-row items-center gap-2 right-0">
          {socials.map((social) => (
            <li
              key={social.name}
              className="text-gray-300 hover:text-white transition duration-300 text-xl"
            >
              <a href={social.link} target="_blank" rel="noreferrer">
                <i className={social.icon} aria-hidden="true"></i>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
