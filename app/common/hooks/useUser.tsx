"use client";

import supabase from "../lib/supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const useUser = (
  required?: boolean
): {
  status: "authenticated" | "unauthenticated" | "loading";
  profile: any | null | undefined;
} => {
  const [status, setStatus] = useState<
    "authenticated" | "unauthenticated" | "loading"
  >("loading");
  const [profile, setProfile] = useState<any>({ id: "loading" });
  const router = useRouter();

  async function getCurrentUser() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }
    if (!session || !session.user) {
      setStatus("unauthenticated");
      return false;
    }
    setStatus("authenticated");

    return session;
  }

  async function getProfile() {
    try {
      setStatus("loading");
      const user = await getCurrentUser();
      if (user == false) return;
      let { data, error } = await supabase.auth.getUser(user.access_token);
      if (error) {
        throw error;
      }
      if (data && data.user) {
        setProfile({ ...data.user, ...user });
      }
    } catch (error) {
      setProfile({
        error: error,
      });
    }
  }
  useEffect(() => {
    if (status == "loading") {
      getProfile();
    }
    if (required && status == "unauthenticated") {
      router.push("/");
    }
    if (required && !profile.id) {
      supabase.auth.signOut().then(() => {
        router.push("/");
      });
    }
  });
  return { status, profile };
};
export default useUser;
