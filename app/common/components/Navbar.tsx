import Image from "next/image";
import SystemMenu from "./SystemMenu";

export default function Navbar({ mode, setMode }: { mode: any; setMode: any }) {
  let socials = [
    {
      name: "Twitter",
      icon: "fab fa-twitter",
      link: "https://twitter.com/alan_ai",
    },
    {
      name: "GitHub",
      icon: "fab fa-github",
      link: "",
    },
    {
      name: "Discord",
      icon: "fab fa-discord",
      link: "https://discord.gg/alanai",
    },
  ];
  return (
    <nav className="flex flex-row items-center justify-between w-[80vw] absolute top-[4vh] left-[50%] translate-x-[-50%]">
      <Image
        src="/neon.png"
        alt="Alan AI Logo"
        width={50}
        height={50}
        className="rounded-full"
      />
      <SystemMenu mode={mode} setMode={setMode} />
      <ul className="flex flex-row items-center gap-2 ">
        {socials.map((social) => (
          <li
            key={social.name}
            className="text-gray-300 hover:text-white transition duration-300 text-xl"
          >
            <a href={social.link} target="_blank" rel="noreferrer">
              <i className={social.icon} aria-hidden="true"></i>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
