"use client";

import { cn } from "@/shared/lib/utils";
import { PropsWithChildren, ReactNode, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";

type Props = PropsWithChildren<{
  triggerIcon: ReactNode;
  triggerClassName: string;
}>;

const SideBar = ({ triggerIcon, triggerClassName, children }: Props) => {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref as React.RefObject<HTMLElement>, () => setShow(false));

  return (
    <>
      <button
        className={triggerClassName}
        onClick={() => setShow((prev) => !prev)}
      >
        {triggerIcon}
      </button>
      <div
        ref={ref}
        className={cn(
          "fixed pt-6 top-2 shadow-2xl z-50 min-h-screen w-60 rounded-r-2xl transition-all duration-300 bg-slate-100",
          {
            "-left-full": !show,
            "left-0": show,
          }
        )}
      >
        {children}
      </div>
    </>
  );
};

export default SideBar;
