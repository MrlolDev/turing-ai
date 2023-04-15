import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

export default function Selector({
  options,
  value,
  setValue,
}: {
  options: {
    name: string;
    value: string;
    developer: string;
    disabled: boolean;
  }[];
  value: string;
  setValue: (value: string) => void;
}) {
  const [query, setQuery] = useState("");

  return (
    <Listbox value={value} onChange={setValue}>
      <div className="relative z-40 w-[85vw] md:w-[22vw]">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg text-left sm:text-sm z-40">
          <Listbox.Button className="w-full border-none z-40 flex flex-row items-center justify-between py-2 px-3 text-sm leading-5  bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] outline-none">
            <p>{options.find((x) => x.value == value)?.name}</p>
            <i
              className=" text-gray-400 fas fa-chevron-down"
              aria-hidden="true"
            />
          </Listbox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Listbox.Options className=" z-[100] mt-2 max-h-60 w-full overflow-auto rounded-md py-1 text-base focus:outline-none sm:text-sm bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 border border-gray-100/[.2] items-center flex flex-col">
            {options.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-white">
                Nothing found.
              </div>
            ) : (
              options.map((option, i) => (
                <Listbox.Option
                  key={i}
                  className={({ active }) =>
                    `relative cursor-default w-[95%] px-2 rounded-md flex flex-row items-center gap-2 select-none py-2 text-left ${
                      active
                        ? " bg-gradient-to-br from-turing-blue to-turing-purple bg-opacity-30 text-white cursor-pointer"
                        : "text-white"
                    }`
                  }
                  value={option.value}
                >
                  {({ selected, active }) => (
                    <>
                      {selected ? (
                        <span
                          className={` left-0 flex items-center ${
                            active ? "text-white" : "text-turing-blue"
                          }`}
                        >
                          <i className=" fas fa-check" aria-hidden="true" />
                        </span>
                      ) : null}
                      <span
                        className={`block truncate ${
                          selected
                            ? active
                              ? "font-medium text-white"
                              : "font-medium text-turing-blue"
                            : "font-normal"
                        }`}
                      >
                        {option.name}
                        {option.developer ? `(${option.developer})` : ""}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))
            )}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
