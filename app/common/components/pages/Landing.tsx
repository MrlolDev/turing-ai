"use client";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import supabase from "@/utils/supabase";
import genImage from "@/utils/lexica";
import Image from "next/image";
import tippy from "tippy.js";
import { useEffect, useState } from "react";
import "tippy.js/dist/tippy.css";

export default function Landing() {
  const user = useUser();
  const router = useRouter();
  async function login() {
    if (!user) {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
      });
    }
    router.push("/app");
  }
  var [image, setImage] = useState(genImage());

  useEffect(() => {
    tippy(`image-landing-ai`, {
      content: `Generated with stable diffusion`,
    });
    setInterval(() => {
      setImage(genImage());
    }, 30000);
  }, [image]);
  return (
    <>
      <main className="relative top-[14vh] w-[95%] left-[2.5%]">
        <section className="flex flex-row items-stretch justify-center mt-12">
          <div className="flex flex-col items-start sm:w-[40%]">
            <h1 className="text-6xl  font-bold">
              Turing AI is the best way to use AIs
            </h1>
            <p className=" w-[90%] text-left">
              Turing AI - our mission is to bring the most powerfull AIs to the
              mass public for free.
            </p>
            <div className="flex flex-row items-center gap-2">
              <button
                className="px-12 mt-2 py-1 text-lg bg-turing-primary/[.88] text-turing-white rounded-md hover:bg-turing-primary transition duration-300"
                onClick={() => login()}
              >
                {user ? "Open Turing AI" : "Log in"}
              </button>
              <button
                className="px-12 mt-2 flex flex-row items-center gap-2 w-fit py-1 text-lg bg-neutral-600/[.88] text-turing-white rounded-md hover:bg-neutral-500 transition duration-300"
                onClick={() => window.open("/discord")}
              >
                <i className="fa-brands fa-discord"></i>Join our discord
              </button>
            </div>
          </div>
          <div className="w-fit h-fit">
            <Image
              src={image.url}
              alt={image.prompt}
              width={image.width / 2}
              height={image.height / 2}
              id={`image-landing-ai`}
              draggable="false"
              className="rounded-lg border border-turing-primary"
            />
          </div>
        </section>
      </main>
    </>
  );
}
