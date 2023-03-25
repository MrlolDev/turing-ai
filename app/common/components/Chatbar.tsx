"use client";
import { useLocalStorage } from "react-use";
import Voice from "./chatbars/voice";
import Text from "./chatbars/text";

export default function Chatbar({
  addMessage,
}: {
  addMessage: (text: string) => void;
}) {
  function getres(text: string) {
    addMessage(text);
  }
  const [mode, setMode] = useLocalStorage("mode", "text");
  if (mode == "text") {
    return <Text sendMsg={getres} />;
  } else if (mode == "voice") {
    return <Voice />;
  } else {
    return <div>Invalid mode</div>;
  }
}
