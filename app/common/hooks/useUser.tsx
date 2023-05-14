"use client";

import supabase from "../lib/supabase";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const useUser = (
  required?: boolean,
  redirectTo: string = "/"
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
        let profile = { ...data.user, ...user };
        let premium = false;
        let ispremium = await supabase
          .from("premium")
          .select("*")
          .eq("id", profile.user_metadata?.sub)
          .single();
        if (ispremium.data) {
          var now = Date.now();
          if (now >= ispremium.data.expires_at) {
            await supabase
              .from("premium")
              .delete()
              .eq("id", profile.user_metadata?.sub);

            premium = false;
          } else {
            premium = true;
          }
        }
        let tester = await supabase
          .from("alan_testers")
          .select("*")
          .eq("id", profile.user_metadata?.sub)
          .single();
        let testerData: any = {};
        if (tester.data) {
          testerData.apply = true;
          testerData.approved = tester.data.isTester;
          testerData.type = tester.data.testerType;
        } else {
          testerData.apply = false;
        }
        setProfile({ ...profile, premium: premium, tester: testerData });
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
    if (
      (required && status == "unauthenticated") ||
      (required && !profile.id)
    ) {
      supabase.auth.signInWithOAuth({
        provider: "discord",
        options: { redirectTo: redirectTo, scopes: "connections, guilds" },
      });
    }
  });
  return { status, profile };
};
export default useUser;
