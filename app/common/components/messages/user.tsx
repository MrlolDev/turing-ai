export default function UserMessage({
  message,
}: {
  message: {
    text: string;
    sender: "User" | "AI";
    time: string;
  };
}) {
  return (
    <div className="flex flex-row items-center gap-2 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 py-1 px-2 pl-10 border border-gray-100/[.25]">
      <div className="flex flex-col items-end">
        <p className="text-white text-sm">{message.text}</p>
        <p className="text-gray-100/[.5] text-xs">{message.time}</p>
      </div>
    </div>
  );
}
