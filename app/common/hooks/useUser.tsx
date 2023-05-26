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
      console.log("err", error);
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
        console.log("err", error);
        throw error;
      }
      if (data && data.user) {
        let profile: any = { ...data.user, ...user };
        let premium = false;
        let response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/data/user/${profile.user_metadata.sub}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.access_token}`,
            },
          }
        );
        let userD = await response.json();
        console.log("userD", userD);
        let testerData: any = {};
        if (userD && !userD.error) {
          let { p, tD } = updateProfile(userD, profile, testerData);
          profile = p;
          testerData = tD;

          if (!userD.metadata?.email) {
            let res = await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/data/user/${profile.user_metadata.sub}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${user.access_token}`,
                },
                body: JSON.stringify({
                  metadata: { ...userD.metadata, email: profile.email },
                }),
              }
            );
            let data = await res.json();
          }
        } else {
          let res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/data/user/${profile.user_metadata.sub}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.access_token}`,
              },
              body: JSON.stringify({
                metadata: { email: profile.email },
                settings: {},
              }),
            }
          );
          let data = await res.json();
          let { p, tD } = updateProfile(data, profile, testerData);
          profile = p;
          testerData = tD;
        }
        setProfile({ ...profile, premium: premium, tester: testerData });
      }
    } catch (error) {
      setProfile({
        error: error,
      });
    }
  }
  function updateProfile(userD: any, profile: any, testerData: any) {
    profile = {
      ...profile,
      subscription: userD.subscription,
      plan: userD.plan,
      tester: userD.tester,
    };

    if (userD.tester > 0) {
      testerData.apply = true;
      testerData.approved = true;
      testerData.type = userD.tester;
    } else {
      testerData.apply = true;
      testerData.approved = false;
    }
    return { p: profile, tD: testerData };
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
        options: {
          redirectTo: window.location.href,
          scopes: "connections, guilds",
        },
      });
    }
  });
  return { status, profile };
};
export default useUser;
