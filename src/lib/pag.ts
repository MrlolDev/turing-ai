import { atom } from "nanostores";
const page = atom("discord");

export default page;
setInterval(() => {
  if (page.get() === "discord") {
    page.set("whatsapp");
  } else {
    page.set("discord");
  }
}, 20000);
