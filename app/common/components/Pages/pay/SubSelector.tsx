export default function SubSelector({
  sub,
  setSub,
}: {
  sub: string;
  setSub: (sub: string) => void;
}) {
  let availableSubs = [
    {
      name: "User",
      selected: sub === "user",
    },
    {
      name: "Server",
      selected: sub === "server",
    },
  ];
  return (
    <div className="flex flex-row w-[300px] justify-center md:w-fit items-center gap-2 mt-4 mb-2 bg-gray-100/[.2] p-2 rounded-md border-white/[.5] border">
      {availableSubs.map((sub) => (
        <button
          key={sub.name}
          className={`${
            sub.selected
              ? "bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 hover:bg-opacity-50"
              : "bg-gray-100/[.2] hover:bg-opacity-50"
          } px-4 sm:px-10 md:px-4 w-full text-center rounded-md transition duration-200 border border-gray-100/[.2] flex flex-row items-center gap-2 outline-none`}
          onClick={() => setSub(sub.name.toLowerCase())}
        >
          {sub.name}
        </button>
      ))}
    </div>
  );
}
