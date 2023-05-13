export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
      <h1 className="text-4xl font-bold">Thank you for your purchase!</h1>
      <p className="text-lg">
        You will receive an email with your receipt shortly.
      </p>
    </div>
  );
}
