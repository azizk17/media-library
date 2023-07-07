"use client";

import { cloneElement, useRef, useTransition } from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { Label } from "@/components/label";

type FormItemProps = React.HTMLAttributes<any> & {
  name: string;
  title: string;
  subtitle?: string;
  description?: string;
  errors?: Array<{ path: string; message: string }>;
  children: React.JSXElementConstructor<any> | React.ReactNode;
};

// updated version of MyFormItem
export function FormElement({
  name,
  title,
  subtitle,
  errors,
  children,
  className,
  description,
  placeholder,
  ...props
}: FormItemProps) {
  const { pending } = useFormStatus();
  const hasError = () => {
    // Filter the errors array based on the input name
    const matchingErrors = errors?.filter((error) => error.path === name);
    return matchingErrors.length > 0; // Return true if there are matching errors, false otherwise
  };
  const hasErrors = () => errors?.some((v) => v.path === name);
  const getErrors = () =>
    errors?.filter((error) => error.path === name).map((v) => v.message);
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label className={cn({ hasErrors: "border-red-600" })} htmlFor={name}>
        {title}
      </Label>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      <div>
        {cloneElement(children, { name, placeholder, disabled: pending })}
      </div>
      {hasErrors() && <p className="text-sm text-red-600">{getErrors()}</p>}
    </div>
  );
}
