"use client";
import { cn } from "@/shared/lib/utils";
import { usePathname } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";

type Props = PropsWithChildren;

const DesktopNavbar = (props: Props) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    setScrollPosition(window.scrollY);
  };

  const pathname = usePathname();

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const isScrollDown = scrollPosition > 10;
  const isHome = pathname === "/";
  return (
    <nav
      className={cn("hidden fixed w-full z-50 text-white top-0 md:block", {
        "bg-white transition-colors text-gray-700 shadow-md":
          isScrollDown || !isHome,
      })}
    >
      <div className="flex items-center px-4 py-4 container ">
        {props.children}
      </div>
      <hr className="border-b border-gray-100 opacity-25" />
    </nav>
  );
};

export default DesktopNavbar;
