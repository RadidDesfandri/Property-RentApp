import { axiosInstance } from "@/libs/axios";
import { createCookie, navigate } from "@/libs/server";
import { loginAction } from "@/Redux/slices/userSlice";
import { supabase } from "@/utils/supabase/client";
import { useEffect, useCallback } from "react";
import { FaGithub } from "react-icons/fa";
import { useDispatch } from "react-redux";

const LoginGithubUser = () => {
  const dispatch = useDispatch();

  const onLogin = async () => {
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      console.error("Error signing out:", signOutError);
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_WEB}/account/register`,
      },
    });

    if (error) {
      console.error("GitHub login error:", error);
    }
  };
  const handleSession = useCallback(
    async (session: any) => {
      if (session) {
        const { user } = session;

        try {
          const response = await axiosInstance.post(
            "/api/auth/github",
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
          navigate("/");
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
        <FaGithub className="h-8 w-8 text-black" />
      </button>
    </section>
  );
};

export default LoginGithubUser;
