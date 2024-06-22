import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { Session } from "@supabase/supabase-js";

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting session:", error.message);
      } else {
        setSession(data.session);
      }
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      setSession(null);
    }
  };

  return { session, signOut };
};

// session: 인증 토큰, 사용자 정보, 세션 만료 시간 등 사용자 세션에 대한 정보를 담고 있다.
// user: 객체는 현재 인증된 사용자에 대한 정보를 담고 있다
