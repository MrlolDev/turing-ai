import Image from "next/image";
export default function Loading({ message = "Loading" }: { message: string }) {
  // in the center, neon.png logo with a animation of increasing size and decreasing opacity
  // and a text saying "Loading..."
  return (
    <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center">
      <Image
        src="/icons/neon.png"
        alt="Alan AI Logo"
        width={150}
        height={150}
        className="rounded-full animate-pulse"
        draggable={false}
      />
      <h3 className="text-gray-300">{message}...</h3>
    </div>
  );
}
