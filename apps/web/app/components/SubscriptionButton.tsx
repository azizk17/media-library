"use client";

import Link from "next/link";
import { BellRing, CheckCircle, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/button";

export const SubscriptionButton = () => {
  const { data: session } = useSession();

  if (session === undefined) {
    return (
      <Button className="w-full" disabled>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      </Button>
    );
  }

  return (
    <Link href={session ? "#" : "/auth"} className="w-full">
      <Button className="w-full" disabled={!!session}>
        {session ? (
          <>
            <CheckCircle className="w-4 h-4 mr-2" />
            <span>I have you on the list!</span>
          </>
        ) : (
          <>
            <BellRing className="w-4 h-4 mr-2" />
            <span>Subscribe to updates</span>
          </>
        )}
      </Button>
    </Link>
  );
};
