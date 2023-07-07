"use client";

import GitHub from "@/icons/GitHub";
import Google from "@/icons/Google";
import { signIn } from "next-auth/react";
import { Button } from "@/components/button";

const Login = () => (
  <div className="flex flex-col items-center justify-center space-x-3 sm:flex-row">
    <Button
      onClick={() => {
        signIn("google");
      }}
    >
      <Google className="w-5 h-5 mr-2" />
      <p>Google</p>
    </Button>
    <Button
      onClick={() => {
        signIn("github");
      }}
    >
      <GitHub className="w-4 h-4 mr-2" />
      <p>Github</p>
    </Button>
  </div>
);

export default Login;
