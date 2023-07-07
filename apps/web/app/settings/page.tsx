import React from "react";
import { AvatarUploader3 } from "@/my-components/AvatarUploader3";
import { FormElement } from "@/my-components/FormElement";
import { SubmitButton } from "@/my-components/SubmitButton";
import { Input } from "ui/components/input";
import { getCurrentUser } from "@/lib/auth";
import { Separator } from "@/components/separator";
import { updateUserProfile } from "./actions";
import AppearanceForm from "./profile/appearance-form";
import ProfileForm from "./profile/profile-form";

type Props = {};

// name
// email
// avatar
// appearance

// use profile as main page
export default async function Page() {
  const currentUser = await getCurrentUser();
  const data = {
    name: "name a",
    email: "email a",
    avatar: "avatar a",
    preferences: {
      theme: "light",
    },
  };
  return (
    <div className="space-y-8">
      <pre>{/* <code>{JSON.stringify(data, null, 2)}</code> */}</pre>
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          Update your account settings. Set your preferred language and
          timezone.
        </p>
      </div>
      <Separator />
      <ProfileForm data={currentUser} />
      <Separator />
      <h3 className="text-lg font-medium">Appearance</h3>
      <p className="text-sm text-muted-foreground">
        Select a theme for your dashboard.
      </p>
      <AppearanceForm data={currentUser} />
    </div>
  );
}
