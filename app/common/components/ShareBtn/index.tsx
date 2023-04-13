import { v4 as uuidv4 } from "uuid";
import supabase from "@/app/common/lib/supabase";
export default function ShareBtn({
  messages,
  userId,
}: {
  messages: any;
  userId: string;
}) {
  async function share() {
    if (messages.length == 0) {
      alert("You have no messages to share");
      return;
    }
    if (!navigator.share) {
      alert("Your browser does not support sharing");
      return;
    }
    // encode array into base64
    // create url
    let id = uuidv4();
    // save to db
    await supabase
      .from("saved_conversations")
      .insert([{ id: id, messages: messages, userId: userId }]);
    let url = `${window.location.origin}/share/${id}`;
    // activate share
    navigator.share({
      title: "Turing Chat",
      text: "Check out this chat",
      url: url,
    });
  }
  return (
    <button
      className="relative h-[5vh] w-[5vh] rounded-full bg-gradient-to-br from-turing-blue to-turing-purple shadow-lg flex items-center justify-center cursor-pointer text-sm transition duration-200 outline-none hover:from-turing-purple hover:to-turing-blue"
      onClick={() => {
        share();
      }}
    >
      <i className="fas fa-share text-white"></i>
    </button>
  );
}
