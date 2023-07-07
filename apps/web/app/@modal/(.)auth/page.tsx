"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GitHub from "@/icons/GitHub";
import Google from "@/icons/Google";
import { signIn } from "next-auth/react";
import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";

const LoginDialog = () => {
  const [signInClicked, setSignInClicked] = useState(false);
  const router = useRouter();

  return (
    <Dialog
      defaultOpen
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          router.back();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subscribe to updates</DialogTitle>
          <DialogDescription>
            <div className="py-4">
              Get early access to new feature updates. I also share my knowledge
              as a both software developer and solopreneur.
            </div>
          </DialogDescription>
        </DialogHeader>
        <Button
          onClick={async () => {
            setSignInClicked(true);
            await signIn("google");
          }}
          disabled={signInClicked}
        >
          <Google className="w-5 h-5 mr-2" />
          <p>Sign in with Google</p>
        </Button>
        <Button
          onClick={async () => {
            setSignInClicked(true);
            await signIn("github");
          }}
          disabled={signInClicked}
        >
          <GitHub className="w-5 h-5 mr-2" />
          <p>Sign in with Github</p>
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
