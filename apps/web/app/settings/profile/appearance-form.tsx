"use client";

import React, { startTransition } from "react";
import { FormElement } from "@/my-components/FormElement";
import { SubmitButton } from "@/my-components/SubmitButton";
import { Input } from "ui/components/input";
import { RadioGroup, RadioGroupItem } from "@/components/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";
import { updatePreferences } from "../actions";

type Props = {
  data: any;
};

export default function AppearanceForm({ data }: Props) {
  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    const formData = new FormData(formRef.current);
    const obj = Object.fromEntries(formData.entries());

    if (!formData.get("theme")) {
      obj.theme = data.preferences?.theme || "light";
    }

    updatePreferences({ id: data.id, inputs: obj });
  };

  const errors = [{}];
  return (
    <form className="space-y-8" ref={formRef}>
      <FormElement title="Language" name="locale" subtitle="">
        <Select
          defaultValue={data?.preferences?.locale}
          onValueChange={(v) => startTransition(handleSubmit)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ar">العربيه</SelectItem>
          </SelectContent>
        </Select>
      </FormElement>

      <FormElement
        name="theme"
        title="Theme"
        subtitle="Select a theme for your dashboard."
        errors={errors}
      >
        <RadioGroup
          defaultValue={data.preferences?.theme || "light"}
          className="grid max-w-md grid-cols-2 gap-8 pt-2"
          onValueChange={(v) => startTransition(handleSubmit)}
        >
          <label
            htmlFor="light"
            className="[&:has([data-state=checked])>div]:border-primary"
          >
            <RadioGroupItem value="light" className="sr-only" id="light" />
            <LightDashboard />
            <span className="block w-full p-2 font-normal text-center">
              Light
            </span>
          </label>
          <label
            htmlFor="dark"
            className="[&:has([data-state=checked])>div]:border-primary"
          >
            <RadioGroupItem value="dark" className="sr-only" id="dark" />
            <DarkDashboard />
            <span className="block w-full p-2 font-normal text-center">
              Dark
            </span>
          </label>
        </RadioGroup>
      </FormElement>
    </form>
  );
}

const LightDashboard = () => {
  return (
    <div className="items-center p-1 border-2 rounded-md border-muted hover:border-accent">
      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
        <div className="p-2 space-y-2 bg-white rounded-md shadow-sm">
          <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
        </div>
        <div className="flex items-center p-2 space-x-2 bg-white rounded-md shadow-sm">
          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
        </div>
        <div className="flex items-center p-2 space-x-2 bg-white rounded-md shadow-sm">
          <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
          <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
        </div>
      </div>
    </div>
  );
};

const DarkDashboard = () => {
  return (
    <div className="items-center p-1 border-2 rounded-md border-muted bg-popover hover:bg-accent hover:text-accent-foreground">
      <div className="p-2 space-y-2 rounded-sm bg-slate-950">
        <div className="p-2 space-y-2 rounded-md shadow-sm bg-slate-800">
          <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
        </div>
        <div className="flex items-center p-2 space-x-2 rounded-md shadow-sm bg-slate-800">
          <div className="w-4 h-4 rounded-full bg-slate-400" />
          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
        </div>
        <div className="flex items-center p-2 space-x-2 rounded-md shadow-sm bg-slate-800">
          <div className="w-4 h-4 rounded-full bg-slate-400" />
          <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
        </div>
      </div>
    </div>
  );
};
