"use client";
import Voice from "./chatbars/voice";
import Text from "./chatbars/text";

export default function Chatbar({
  addMessage,
  mode,
}: {
  addMessage: (text: string, photo?: any) => void;
  mode: any;
}) {
  function getres(text: string, photo?: any) {
    addMessage(text, photo);
  }

  if (mode == "text") {
    return <Text sendMsg={getres} />;
  } else if (mode == "voice") {
    return <Voice sendMsg={getres} />;
  } else {
    return <div>Invalid mode</div>;
  }
}
