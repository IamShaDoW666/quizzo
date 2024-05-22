"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SocialLogin = () => {
  const handleOnclick = (provider: "google" | "github") => {
    signIn(provider, {
        callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        onClick={() => handleOnclick("google")}
        size="lg"
        variant="outline"
        type="button"
        className="w-full flex gap-x-2"
      >
        <FcGoogle className="h-5  w-5" />
      </Button>
      <Button
        onClick={() => handleOnclick("github")}
        size="lg"
        variant="outline"
        type="button"
        className="w-full flex gap-x-2"
      >
        <FaGithub className="h-5  w-5" />
      </Button>
    </div>
  );
};

export default SocialLogin;
