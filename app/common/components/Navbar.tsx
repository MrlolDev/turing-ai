import Image from "next/image";
import { useRef } from "react";
import SystemMenu from "./SystemMenu";
import Settings from "./config/settings";

export default function Navbar({
  mode,
  setMode,
  model,
  setModel,
  searchEngine,
  setSearchEngine,
  imageGenerator,
  setImageGenerator,
  audioGenerator,
  setAudioGenerator,
  videoGenerator,
  setVideoGenerator,
  imageModificator,
  setImageModificator,
  imageReader,
  setImageReader,
  codeRunner,
  setCodeRunner,
}: {
  mode: any;
  setMode: any;
  model: any;
  setModel: any;
  searchEngine: any;
  setSearchEngine: any;
  imageGenerator: any;
  setImageGenerator: any;
  audioGenerator: any;
  setAudioGenerator: any;
  videoGenerator: any;
  setVideoGenerator: any;
  imageModificator: any;
  setImageModificator: any;
  imageReader: any;
  setImageReader: any;
  codeRunner: any;
  setCodeRunner: any;
}) {
  let sideBar = useRef(null);
  const socials = [
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
  return (
    <>
      <nav className="flex flex-row items-center justify-between w-[90vw] md:w-[80vw] absolute top-[4vh] left-[50%] translate-x-[-50%]">
        <Image
          src="/icons/neon.png"
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
        className="hidden w-[95vw] md:w-[30vw] h-[95vh] fixed right-[2.5vw] top-[2.5vh] z-50 flex flex-col justify-between bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 py-1 px-2 border border-gray-100/[.25]"
      >
        <div>
          <div className="flex flex-row items-center justify-between gap-2">
            <Image
              src="/icons/neon.png"
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
          <div className="flex flex-col gap-2 mt-6 items-start h-[75vh] py-2 overflow-y-auto">
            <h3 className="text-gray-300 font-bold text-xl">Settings</h3>
            <Settings
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
            />
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
        </div>
      </nav>
    </>
  );
}
