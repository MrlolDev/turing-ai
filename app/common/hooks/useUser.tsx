"use client";

import { useState, useEffect } from "react";
import supabase from "@/utils/supabase";

const useUser = () => {
  const [user, setUser] = useState<any>("loading");
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async () =>
      checkUser()
    );
    checkUser();

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);
  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  }
  return user;
};

export default useUser;
