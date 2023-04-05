"use client";
import Voice from "./voice";
import Text from "./text";

export default function Chatbar({
  addMessage,
  mode,
  speechToTextModel,
  isProcessing,
  setIsProcessing,
}: {
  addMessage: (text: string, photo?: any) => void;
  mode: any;
  speechToTextModel: any;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
}) {
  function getres(text: string, photo?: any) {
    addMessage(text, photo);
  }

  if (mode == "text") {
    return (
      <Text
        sendMsg={getres}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
      />
    );
  } else if (mode == "voice") {
    return (
      <Voice
        sendMsg={getres}
        speechToTextModel={speechToTextModel}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
      />
    );
  } else {
    return <div>Invalid mode</div>;
  }
}
