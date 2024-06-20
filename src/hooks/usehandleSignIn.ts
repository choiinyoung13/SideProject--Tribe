import { supabase } from "../supabase/supabaseClient";
import { useState } from "react";
import { makeUserCart } from "../utill/makeUserCart";

export const useHandleSignIn = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignIn = async (email: string, password: string) => {
    setErrorMessage("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (data && data.user) makeUserCart(data.user.id);

      if (error) {
        console.error(error);
      }
    } catch (err) {
      console.error("Sign up error:", err);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    }
  };

  const SignInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "select_account",
        },
      },
    });

    if (error) {
      console.error(error);
      setErrorMessage("Error signing in with Google");
      return;
    }
  };

  const SignInWithKakao = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "select_account",
        },
      },
    });

    if (error) {
      console.error(error);
      setErrorMessage("Error signing in with Google");
    }
  };

  return { handleSignIn, SignInWithGoogle, SignInWithKakao, errorMessage };
};
