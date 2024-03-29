import Selector from "./Selector";

export default function Settings({
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
  allowNsfw,
  setAllowNsfw,
  speechToTextModel,
  setSpeechToTextModel,
  AutoHearMessages,
  setAutoHearMessages,
}: {
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
  allowNsfw: any;
  setAllowNsfw: any;
  speechToTextModel: any;
  setSpeechToTextModel: any;
  AutoHearMessages: any;
  setAutoHearMessages: any;
}) {
  const settingsSections = [
    {
      name: "Base model",
      array: models,
      set: setModel,
      get: model,
      disabled: false,
    },
    {
      name: "Search engines",
      array: searchEngines,
      set: setSearchEngine,
      get: searchEngine,
      disabled: false,
    },
    {
      name: "Image generators",
      array: imageGenerators,
      set: setImageGenerator,
      get: imageGenerator,
      disabled: false,
    },
    {
      name: "Allow NSFW Images",
      array: allowNsfwOptions,
      set: setAllowNsfw,
      get: allowNsfw,
      disabled: false,
    },
    {
      name: "Audio generators",
      array: audioGenerators,
      set: setAudioGenerator,
      get: audioGenerator,
      disabled: false,
    },
    {
      name: "Video generators",
      array: videoGenerators,
      set: setVideoGenerator,
      get: videoGenerator,
      disabled: false,
    },
    {
      name: "Image modificators",
      array: imageModificators,
      set: setImageModificator,
      get: imageModificator,
      disabled: false,
    },
    {
      name: "Image readers",
      array: imageReaders,
      set: setImageReader,
      get: imageReader,
      disabled: false,
    },

    {
      name: "Speech to text model",
      array: speechToTextModels,
      set: setSpeechToTextModel,
      get: speechToTextModel,
      disabled: false,
    },
    {
      name: "Auto hear messages",
      array: autoHearMessages,
      set: setAutoHearMessages,
      get: AutoHearMessages,
      disabled: false,
    },
  ];
  return (
    <>
      {settingsSections.map((section) => (
        <div
          className="flex flex-col items-start gap-2 mt-1 ml-1 pr-2"
          key={section.name}
        >
          <p className="text-gray-300 font-bold">
            {section.name} {section.disabled && "(not available)"}
          </p>
          {/* 
          <select
            className="w-fit max-w-[80vw] md:w-[20vw] rounded-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] text-white placeholder-gray-100/[.5] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent px-2 py-1  outline-none"
            value={section.get}
            onChange={(e) => {
              section.set(e.target.value);
            }}
          >
            {section.array.map((x: any) => (
              <option key={x.name} value={x.value} disabled={x.disabled}>
                {x.name} {x.developer && `(${x.developer})`}{" "}
                {x.disabled && "(not available)"}
              </option>
            ))}
          </select>
          */}
          <Selector
            options={section.array}
            value={section.get}
            setValue={section.set}
          />
        </div>
      ))}
    </>
  );
}

const searchEngines: any = [
  {
    name: "None",
    value: "none",
    disabled: false,
  },
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
    name: "Wikipedia",
    value: "wikipedia",
    disabled: true,
  },
];
const models = [
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
const imageReaders = [
  {
    name: "Blip-2",
    value: "blip-2",
    developer: "Salesforce",
    disabled: false,
  },
];
const imageGenerators = [
  {
    name: "None",
    value: "none",
    disabled: false,
  },
  {
    name: "Stable diffusion",
    value: "stable-diffusion",
    developer: "StabilityAI",
    disabled: false,
  },
  {
    name: "Kandinsky 2.1",
    value: "kandinsky",
    developer: "AI Forever",
    disabled: false,
  },
  {
    name: "Dall-e 2",
    value: "dall-e-2",
    developer: "OpenAI",
    disabled: false,
  },
];
const imageModificators = [
  {
    name: "None",
    value: "none",
    disabled: false,
  },
  {
    name: "ControlNet Normal",
    value: "controlnet",
    developer: "jagilley",
    disabled: false,
  },
  {
    name: "ControlNet Scribble",
    value: "controlnet-scribble",
    developer: "jagilley",
    disabled: false,
  },
  {
    name: "ControlNet Canny",
    value: "controlnet-canny",
    developer: "jagilley",
    disabled: false,
  },
  {
    name: "ControlNet Hed",
    value: "controlnet-hed",
    developer: "jagilley",
    disabled: false,
  },
  {
    name: "ControlNet depth2img",
    value: "controlnet-depth2img",
    developer: "jagilley",
    disabled: false,
  },
  {
    name: "ControlNet pose",
    value: "controlnet-pose",
    developer: "jagilley",
    disabled: false,
  },
  {
    name: "ControlNet seg",
    value: "controlnet-seg",
    developer: "jagilley",
    disabled: false,
  },
  {
    name: "Stable diffusion img2img",
    value: "stable-diffusion-img2img",
    developer: "StabilityAI",
    disabled: true,
  },
];
const videoGenerators = [
  {
    name: "None",
    value: "none",
    disabled: false,
  },
  {
    name: "damo-text-to-video",
    value: "damo-text-to-video",
    developer: "cjwbw",
    disabled: false,
  },
  {
    name: "GEN-1",
    value: "gen-1",
    developer: "RunwayML",
    disabled: true,
  },
];
const audioGenerators = [
  {
    name: "None",
    value: "none",
    disabled: false,
  },
  {
    name: "Riffusion",
    value: "riffusion",
    developer: "Riffusion",
    disabled: false,
  },
  {
    name: "Mubert",
    value: "mubert",
    developer: "Mubert",
    disabled: true,
  },
];
const codeRunners = [
  {
    name: "Turing Machines",
    value: "turing-machines",
    developer: "TuringAI",
    disabled: true,
  },
];
const allowNsfwOptions = [
  {
    name: "Yes",
    value: true,
    disabled: false,
  },
  {
    name: "No",
    value: false,
    disabled: false,
  },
];

const speechToTextModels = [
  {
    name: "Whisper",
    value: "whisper",
    developer: "OpenAI",
    disabled: false,
  },
  {
    name: "Gladia",
    value: "gladia",
    developer: "Gladia",
    disabled: true,
  },
];
let autoHearMessages = [
  {
    name: "Yes with voice input",
    value: "voice",
    disabled: false,
  },
  {
    name: "Yes with text input",
    value: "text",
    disabled: false,
  },
  {
    name: "No",
    value: false,
    disabled: false,
  },
];

let textToAudio = [
  {
    name: "Google",
    value: "google",
    disabled: false,
  },
  {
    name: "Elevenlabs",
    value: "elevenlabs",
    disabled: true,
  },
];
