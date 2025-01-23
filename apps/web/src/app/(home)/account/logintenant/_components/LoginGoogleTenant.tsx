import { axiosInstance } from "@/libs/axios";
import { createCookie, navigate } from "@/libs/server";
import { loginAction } from "@/Redux/slices/userSlice";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

const LoginGoogleTenant = () => {
  const dispatch = useDispatch();
  const onLogin = async () => {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      console.error("Error signing out:", signOutError);
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_WEB}/account/registertenant`,
      },
    });

    if (error) {
      console.error("Google login error:", error);
    }
  };

  const handleSession = useCallback(
    async (session: any) => {
      if (session) {
        const { user } = session;

        try {
          const response = await axiosInstance.post(
            "/api/auth/google-t",
            {
              email: user.email,
              avatar: user.user_metadata.avatar_url || null,
              username: user.user_metadata.full_name || "",
            },
            {
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
                Expires: "0",
              },
            },
          );

          const { token, userData } = response.data;

          createCookie("token", token);
          dispatch(
            loginAction({
              id: userData.id,
              email: userData.email,
              username: userData.username,
              phone: userData.phone,
              role: userData.role,
              token: token,
              avatar: userData.avatar,
              createdAt: userData.createdAt,
              isVerify: userData.isVerify,
              provider: userData.provider,
            }),
          );
          navigate("/dashboard");
        } catch (err) {
          console.error("Error saving user to database:", err);
        }
      } else {
        console.log("No session data found.");
      }
    },
    [dispatch],
  );

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        await handleSession(session);
      }
    };
    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          await handleSession(session);
        }
      },
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [handleSession]);

  return (
    <section>
      <button
        onClick={onLogin}
        type="button"
        className="flex w-full justify-center rounded-md border border-btn py-2"
      >
        <Image
          src={"/google.svg"}
          alt="google"
          width={50}
          height={50}
          className="h-8 w-8"
        />
      </button>
    </section>
  );
};

export default LoginGoogleTenant;
