import { Tooltip } from "react-tooltip";

export default function Message({ message }: { message: any }) {
  return (
    <div
      key={message.id}
      className={`flex flex-row ${
        message.sender == "User" ? "justify-end " : "justify-start"
      } items-center gap-2 `}
      onContextMenu={(e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("right click");
        const menu = document.getElementById("context-menu");
        if (menu) {
          menu.style.top = `${e.clientY}px`;
          menu.style.left = `${e.clientX}px`;
          menu.style.display = "flex";
        }
      }}
    >
      <div
        className={`${
          message.sender == "Error"
            ? "border-red-500/[.25] bg-red-500 "
            : "border-gray-100/[.25] bg-gray-500 "
        }rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 py-1 px-2 border max-w-[70vw] sm:max-w-[40vw]`}
      >
        <Tooltip id={`${message.id}-photo`} />
        <Tooltip id={`${message.id}-video`} />
        <Tooltip id={`${message.id}-audio`} />
        {message.data.photo && message.sender == "User" && (
          <img
            className="w-20 h-20 rounded object-fill"
            src={message.data.photo}
            alt="message photo"
            width={80}
            height={80}
            data-tooltip-id={`${message.id}-photo`}
            data-tooltip-content={
              message.data.photoDescription
                ? message.data.photoDescription
                : "No description"
            }
            onClick={
              message.data.photo
                ? () => {
                    window.open(message.data.photo, "_blank");
                  }
                : undefined
            }
          />
        )}
        <div
          className="markdown prose w-full break-words dark:prose-invert light"
          dangerouslySetInnerHTML={{ __html: message.text }}
        ></div>{" "}
        {message.data.photo && message.sender == "AI" && (
          <img
            className=" w-40 h-40 rounded object-fill cursor-pointer"
            src={message.data.photo}
            alt="message photo"
            width={160}
            height={160}
            data-tooltip-id={`${message.id}-photo`}
            data-tooltip-content={
              message.data.photoDescription
                ? message.data.photoDescription
                : "No description"
            }
            onClick={
              message.data.photo
                ? () => {
                    window.open(message.data.photo, "_blank");
                  }
                : undefined
            }
          />
        )}
        {message.data.video && (
          <video
            className="w-40 h-40 rounded object-fill cursor-pointer"
            src={message.data.video}
            width={160}
            height={160}
            data-tooltip-id={`${message.id}-video`}
            data-tooltip-content={
              message.data.videoDescription
                ? message.data.videoDescription
                : "No description"
            }
            controls
          />
        )}
        {message.data.audio && (
          <audio
            className=" rounded object-fill cursor-pointer"
            src={message.data.audio}
            data-tooltip-id={`${message.id}-audio`}
            data-tooltip-content={
              message.data.audioDescription
                ? message.data.audioDescription
                : "No description"
            }
            controls
          />
        )}
      </div>
    </div>
  );
}
