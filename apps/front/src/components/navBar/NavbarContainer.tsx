import { PropsWithChildren } from "react";
import DesktopNavbar from "@/components/navBar/desktopNavbar";
import MobileNavbar from "@/components/navBar/mobileNavbar";

type Props = PropsWithChildren;

const NavbarContainer = (props: Props) => {
  return (
    <div className="relative">
      <DesktopNavbar>{props.children}</DesktopNavbar>
      <MobileNavbar>{props.children}</MobileNavbar>
    </div>
  );
};

export default NavbarContainer;
