"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { Button } from "@/components/button";

function Submit() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      className={pending ? "button-pending" : "button-normal"}
      disabled={pending}
    >
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}

export { Submit as SubmitButton };
