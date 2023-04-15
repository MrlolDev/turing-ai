import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

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

  const filteredOptions =
    query === ""
      ? options.filter((option) => !option.disabled)
      : options.filter(
          (option) =>
            option.name
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, "")) &&
            !option.disabled
        );

  return (
    <Combobox value={value} onChange={setValue}>
      <div className="relative z-40 w-[85vw] md:w-[22vw]">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100/[.2] text-left sm:text-sm z-40">
          <Combobox.Input
            className="w-full border-none z-40 py-2 pl-3 pr-10 text-sm leading-5  bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 border border-gray-100/[.2] outline-none"
            displayValue={(value: any) =>
              options.find((x) => x.value == value) !== undefined
                ? // @ts-ignore
                  options.find((x) => x.value == value).name
                : ""
            }
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <i
              className="h-5 w-5 text-gray-400 fas fa-chevron-down"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options className=" z-[100] mt-2 max-h-60 w-full overflow-auto rounded-md py-1 text-base focus:outline-none sm:text-sm bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-60 border border-gray-100/[.2] items-center flex flex-col">
            {filteredOptions.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-4 text-white">
                Nothing found.
              </div>
            ) : (
              filteredOptions.map((option, i) => (
                <Combobox.Option
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
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
}
