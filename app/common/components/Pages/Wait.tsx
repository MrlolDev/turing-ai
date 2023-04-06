"use client";
export default function WaitPage() {
  return (
    <>
      <div className="flex flex-col items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <h1 className="text-2xl font-bold">You are in the waitlist</h1>
        <p>
          Since we are a small project we limit the amount of users to save
          resources, please wait until we approve you. While you wait, you can
          check out our{" "}
          <a
            href="https://twitter.com/Turing_AI_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Twitter
          </a>{" "}
          and{" "}
          <a
            href="https://discord.gg/turing-ai-899761438996963349"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            Discord
          </a>
        </p>
      </div>
    </>
  );
}
