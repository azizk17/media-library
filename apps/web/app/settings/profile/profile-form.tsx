"use client";

import React from "react";
import AvatarUploader3 from "@/my-components/AvatarUploader3";
import { FormElement } from "@/my-components/FormElement";
import { SubmitButton } from "@/my-components/SubmitButton";
import { Input } from "ui/components/input";
import { updateUserProfile } from "../actions";

type Props = {
  data: any;
};

export default function ProfileForm({ data }: Props) {
  const formRef = React.useRef<HTMLFormElement>(null);
  const handleSubmit = () => {
    const formData = new FormData(formRef.current);
    const obj = Object.fromEntries(formData.entries());

    if (!formData.get("theme")) {
      obj.theme = data.preferences?.theme || "light";
    }

    updateUserProfile({ id: data.id, inputs: obj });
  };
  return (
    <form action={handleSubmit} className="space-y-8" ref={formRef}>
      <FormElement name="avatar" title="Avatar">
        <AvatarUploader3 />
      </FormElement>
      <FormElement name="name" title="Name" placeholder="Name">
        <Input type="text" defaultValue={data?.name} />
      </FormElement>
      <SubmitButton />
    </form>
  );
}
