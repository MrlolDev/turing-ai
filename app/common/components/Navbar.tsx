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
  let imageReaders = [
    {
      name: "Blip-2",
      value: "blip-2",
      developer: "Salesforce",
      disabled: true,
    },
  ];
  let imageGenerators = [
    {
      name: "Dall-e 2",
      value: "dall-e-2",
      developer: "OpenAI",
      disabled: true,
    },
    {
      name: "Stable diffusion",
      value: "stable-diffusion",
      developer: "StabilityAI",
      disabled: true,
    },
  ];
  let imageModificators = [
    {
      name: "Stable diffusion img2img",
      value: "stable-diffusion-img2img",
      developer: "StabilityAI",
      disabled: true,
    },
    {
      name: "ControlNet",
      value: "controlnet",
      developer: "",
      disabled: true,
    },
  ];
  let videoGenerators = [
    {
      name: "GEN-1",
      value: "gen-1",
      developer: "RunwayML",
      disabled: true,
    },
  ];
  let audioGenerators = [
    {
      name: "Mubert",
      value: "mubert",
      developer: "Mubert",
      disabled: true,
    },
    {
      name: "Riffussion",
      value: "riffussion",
      developer: "Riffussion",
      disabled: true,
    },
  ];
  let codeRunners = [
    {
      name: "Turing Machines",
      value: "turing-machines",
      developer: "TuringAI",
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
        className="hidden w-[95vw] md:w-[30vw] h-[95vh] fixed right-[2.5vw] top-[2.5vh] z-50 flex flex-col justify-between bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 py-1 px-2 border border-gray-100/[.25]"
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
          <div className="flex flex-col gap-2 mt-6 items-start h-[75vh] py-2 overflow-y-auto">
            <h3 className="text-gray-300 font-bold text-xl">Settings</h3>
            <div className="flex flex-col items-start gap-2 mt-1">
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
            <div className="flex flex-col items-start gap-2 mt-1">
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
            <div className="flex flex-col items-start gap-2 mt-1">
              <p className="text-gray-300 font-bold">Image generator(Soon)</p>
              <select
                className=" rounded-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] text-white placeholder-gray-100/[.5] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent px-2 py-1  outline-none"
                value={imageGenerator}
                onChange={(e) => {
                  setImageGenerator(e.target.value);
                }}
              >
                {imageGenerators.map((imageGenerator) => (
                  <option
                    key={imageGenerator.name}
                    value={imageGenerator.value}
                    disabled={imageGenerator.disabled}
                  >
                    {imageGenerator.name} ({imageGenerator.developer})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-start gap-2 mt-1">
              <p className="text-gray-300 font-bold">Audio generator(Soon)</p>
              <select
                className=" rounded-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] text-white placeholder-gray-100/[.5] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent px-2 py-1  outline-none"
                value={audioGenerator}
                onChange={(e) => {
                  setAudioGenerator(e.target.value);
                }}
              >
                {audioGenerators.map((audioGenerator) => (
                  <option
                    key={audioGenerator.name}
                    value={audioGenerator.value}
                    disabled={audioGenerator.disabled}
                  >
                    {audioGenerator.name} ({audioGenerator.developer})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-start gap-2 mt-1">
              <p className="text-gray-300 font-bold">Video generator(Soon)</p>
              <select
                className=" rounded-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] text-white placeholder-gray-100/[.5] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent px-2 py-1  outline-none"
                value={videoGenerator}
                onChange={(e) => {
                  setVideoGenerator(e.target.value);
                }}
              >
                {videoGenerators.map((videoGenerator) => (
                  <option
                    key={videoGenerator.name}
                    value={videoGenerator.value}
                    disabled={videoGenerator.disabled}
                  >
                    {videoGenerator.name} ({videoGenerator.developer})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-start gap-2 mt-1">
              <p className="text-gray-300 font-bold">Image Modificator(Soon)</p>
              <select
                className=" rounded-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] text-white placeholder-gray-100/[.5] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent px-2 py-1  outline-none"
                value={imageModificator}
                onChange={(e) => {
                  setImageModificator(e.target.value);
                }}
              >
                {imageModificators.map((imageModificator) => (
                  <option
                    key={imageModificator.name}
                    value={imageModificator.value}
                    disabled={imageModificator.disabled}
                  >
                    {imageModificator.name} ({imageModificator.developer})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-start gap-2 mt-1">
              <p className="text-gray-300 font-bold">Image readers(Soon)</p>
              <select
                className=" rounded-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] text-white placeholder-gray-100/[.5] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent px-2 py-1  outline-none"
                value={imageReader}
                onChange={(e) => {
                  setImageReader(e.target.value);
                }}
              >
                {imageReaders.map((imageReader) => (
                  <option
                    key={imageReader.name}
                    value={imageReader.value}
                    disabled={imageReader.disabled}
                  >
                    {imageReader.name} ({imageReader.developer})
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col items-start gap-2 mt-1">
              <p className="text-gray-300 font-bold">Code runners(Soon)</p>
              <select
                className=" rounded-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] text-white placeholder-gray-100/[.5] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent px-2 py-1  outline-none"
                value={codeRunner}
                onChange={(e) => {
                  setCodeRunner(e.target.value);
                }}
              >
                {codeRunners.map((codeRunner) => (
                  <option
                    key={codeRunner.name}
                    value={codeRunner.value}
                    disabled={codeRunner.disabled}
                  >
                    {codeRunner.name} ({codeRunner.developer})
                  </option>
                ))}
              </select>
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
        </div>
      </nav>
    </>
  );
}
