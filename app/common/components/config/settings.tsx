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
}) {
  const settingsSections = [
    {
      name: "Base model",
      array: models,
      set: setModel,
      get: model,
    },
    {
      name: "Search engines",
      array: searchEngines,
      set: setSearchEngine,
      get: searchEngine,
    },
    {
      name: "Image generators",
      array: imageGenerators,
      set: setImageGenerator,
      get: imageGenerator,
    },
    {
      name: "Audio generators",
      array: audioGenerators,
      set: setAudioGenerator,
      get: audioGenerator,
    },
    {
      name: "Video generators",
      array: videoGenerators,
      set: setVideoGenerator,
      get: videoGenerator,
    },
    {
      name: "Image modificators",
      array: imageModificators,
      set: setImageModificator,
      get: imageModificator,
    },
    {
      name: "Image readers",
      array: imageReaders,
      set: setImageReader,
      get: imageReader,
    },
    {
      name: "Code runners",
      array: codeRunners,
      set: setCodeRunner,
      get: codeRunner,
    },
  ];
  return (
    <>
      {settingsSections.map((section) => (
        <div
          className="flex flex-col items-start gap-2 mt-1"
          key={section.name}
        >
          <p className="text-gray-300 font-bold">{section.name}</p>
          <select
            className=" rounded-md bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] text-white placeholder-gray-100/[.5] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent px-2 py-1  outline-none"
            value={section.get}
            onChange={(e) => {
              section.set(e.target.value);
            }}
          >
            {section.array.map((x: any) => (
              <option key={x.name} value={x.value} disabled={x.disabled}>
                {x.name} {x.developer && `(${x.developer})`}
              </option>
            ))}
          </select>
        </div>
      ))}
    </>
  );
}

const searchEngines: any = [
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
    disabled: true,
  },
];
const imageGenerators = [
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
const imageModificators = [
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
const videoGenerators = [
  {
    name: "GEN-1",
    value: "gen-1",
    developer: "RunwayML",
    disabled: true,
  },
];
const audioGenerators = [
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
const codeRunners = [
  {
    name: "Turing Machines",
    value: "turing-machines",
    developer: "TuringAI",
    disabled: true,
  },
];

const audioToText = [
  {
    name: "Gladia",
    value: "gladia",
    developer: "Gladia",
    disabled: true,
  },
  {
    name: "Whisper",
    value: "whisper",
    developer: "OpenAI",
    disabled: true,
  },
];
