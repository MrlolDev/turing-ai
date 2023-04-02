"use client";
import Loading from "../common/components/Pages/Loading";
import supabase from "../common/lib/supabase";
import delay from "delay";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  async function out() {
    await delay(1000);
    supabase.auth.signOut().then(() => {
      router.push("/");
    });
  }
  out();
  return <Loading message="Logging out" />;
}
