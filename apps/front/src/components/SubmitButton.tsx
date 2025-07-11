"use client";
import { Button, ButtonProps } from "@/shared/ui/button";
import { useFormStatus } from "react-dom";

const SubmitButton = ({ children, ...props }: ButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending} {...props}>
      {pending ? <span className="animate-pulse">Submitting</span> : children}
    </Button>
  );
};

export default SubmitButton;
