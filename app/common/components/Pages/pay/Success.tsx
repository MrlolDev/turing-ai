export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <h1 className="text-4xl font-bold">Thank you for your purchase!</h1>
      <p className="text-lg">
        You will receive an email with your receipt shortly.
      </p>
      <a className="bg-purple-500 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 hover:bg-opacity-50 px-4 sm:px-10 md:px-4 rounded-md transition duration-200 border border-gray-100/[.2] flex flex-row items-center gap-2 text-lg  outline-none" href="https://discord.gg/turing" target="_blank">
        <i className="fab fa-discord"></i>
        Join our Discord (required for support)
      </a>
    </div>
  );
}
