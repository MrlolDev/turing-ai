"use client";
import { useRef, useState } from "react";

export default function ContextMenu({
  sections,
  show,
  setShow,
  position,
}: {
  sections: Array<{
    items: Array<{
      content: string;
      onClick: () => void;
    }>;
  }>;
  show: boolean;
  setShow: (show: boolean) => void;
  position: { x: number; y: number };
}) {
  let ref = useRef<HTMLDivElement>(null);
  let elWidth = ref.current?.offsetWidth;
  let elHeight = ref.current?.offsetHeight;

  document.addEventListener("click", (e) => {
    // if click outside of context menu
    if (!ref.current?.contains(e.target as Node)) {
      setShow(false);
    }
  });
  let { x, y } = position;
  // if context menu is out of screen
  if (x + elWidth! > window.innerWidth) {
    x = x - elWidth!;
  }
  y = y - elHeight!;
  if (show) {
    return (
      <div
        className={`absolute w-52 rounded-md h-fit py-2 flex flex-col items-center justify-center bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-100/[.2] z-[200]`}
        style={{
          // @ts-ignore
          top: y,
          // @ts-ignore
          left: x,
        }}
        ref={ref}
      >
        {sections.map((section, j) => (
          <div className="flex flex-col gap-2 w-full" key={j}>
            {section.items.map((item, i) => (
              <div
                key={i}
                className="flex flex-row gap-2 w-[95%] px-2 ml-1 items-center py-1 rounded-md hover:bg-gradient-to-br hover:from-turing-blue hover:to-turing-purple hover:bg-opacity-10 text-white cursor-pointer select-none"
                onClick={(e) => {
                  e.stopPropagation();
                  item.onClick();
                  setShow(false);
                }}
              >
                <p className="">{item.content}</p>
              </div>
            ))}
            {/* add row if is not the last*/}
            {sections.indexOf(section) !== sections.length - 1 && (
              <div className="w-full h-px bg-gray-300" />
            )}
          </div>
        ))}
      </div>
    );
  } else {
    return <></>;
  }
}
