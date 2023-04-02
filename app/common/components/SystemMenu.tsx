"use client";
import { useLocalStorage } from "react-use";

export default function SystemMenu({
  mode,
  setMode,
}: {
  mode: any;
  setMode: any;
}) {
  // get selected mode
  let options = [
    {
      name: "Text",
      selected: mode === "text",
      disabled: false,
    },
    {
      name: "Voice",
      selected: mode === "voice",
      disabled: true,
    },
  ];
  return (
    <div className="flex flex-row items-center p-2 bg-gray-500 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 gap-2">
      {options.map((option) => (
        <div
          className={`${
            option.selected
              ? "bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 hover:bg-opacity-50"
              : " hover:bg-clip-padding hover:backdrop-filter hover:backdrop-blur-xl hover:bg-opacity-30"
          } ${
            option.disabled
              ? "cursor-not-allowed text-gray-500"
              : "cursor-pointer"
          } px-4 rounded-md transition duration-200 border border-gray-100/[.2]`}
          key={option.name}
          onClick={() => {
            if (!option.disabled) {
              setMode(option.name.toLowerCase());
            }
          }}
        >
          {option.name}
        </div>
      ))}
    </div>
  );
}
