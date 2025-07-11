import { PropsWithChildren } from "react";
import SideBar from "@/components/navBar/SideBar";
import { Bars3Icon } from "@heroicons/react/16/solid";

type Props = PropsWithChildren;

const mobileNavbar = (props: Props) => {
  return (
    <div className="md:hidden">
      <SideBar
        triggerIcon={<Bars3Icon className="w-6" />}
        triggerClassName="fixed top-4 left-2 z-[60]"
      >
        {props.children}
      </SideBar>
    </div>
  );
};

export default mobileNavbar;
