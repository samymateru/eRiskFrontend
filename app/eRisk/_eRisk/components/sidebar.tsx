"use client";
import { BasicTooltip } from "@/components/tooltips/basic-tooltip";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  BadgeCheck,
  ChartColumn,
  Euro,
  Handshake,
  Home,
  ListTodo,
  Menu,
  Radar,
  Shield,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

export const BasicSideBar = () => {
  const [open, setOpen] = useState(true);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        if (!open) setOpen(true);
      }
    }

    if (!open) {
      document.addEventListener("pointerdown", handleClickOutside);
    }

    return () => {
      document.addEventListener("pointerdown", handleClickOutside);
    };
  }, [open, setOpen]);

  return (
    <section
      ref={sidebarRef}
      className={`pt-1 flex flex-col  gap-3 transition-[width] bg-white duration-500 ease-[cubic-bezier(.68,-0.55,.27,1.55)] rounded-e-md shadow-neutral-500 shadow-md ${
        open ? "w-[56px]" : "w-[285px]"
      } overflow-hidden z-[100] h-full bg-white absolute top-0 left-0`}>
      <Button
        className={`relative  text-sidebar-foreground cursor-pointer hover:bg-neutral-300 bg-white w-[calc(40px-0px)] h-9 transition-all duration-500 ml-2`}
        onClick={() => setOpen((prev) => !prev)}>
        <X
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            open ? "opacity-0 scale-75" : "opacity-100 scale-100"
          }`}
        />
        <Menu
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            open ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        />
      </Button>
      <section className="flex flex-col gap-0.5 justify-start items-center bg-white h-[100%] px-1 w-full">
        <SideBarItem
          icon={<Home className="mx-[4px]" />}
          show={open}
          open={open}
          setOpen={setOpen}
          pathname="/eRisk"
          text="Home"></SideBarItem>
        <SideBarItem
          icon={<ListTodo className="mx-[4px]" />}
          pathname="/eRisk/risk_management_plan"
          show={open}
          open={open}
          setOpen={setOpen}
          text="Risk Management Plan"></SideBarItem>
        <SideBarItem
          icon={<Radar className="mx-[4px]" />}
          show={open}
          open={open}
          pathname="/eRisk/risk_identification_assessment"
          setOpen={setOpen}
          text="Identification & Assessments"></SideBarItem>
        <SideBarItem
          icon={<ChartColumn className="mx-[4px]" />}
          show={open}
          open={open}
          pathname="/eRisk/risk_profile_reports"
          setOpen={setOpen}
          text="Risk Profile & Reports"></SideBarItem>
        <SideBarItem
          icon={<Shield className="mx-[4px]" />}
          show={open}
          open={open}
          setOpen={setOpen}
          text="Risk Registers"></SideBarItem>
        <SideBarItem
          icon={<BadgeCheck className="mx-[4px]" />}
          show={open}
          open={open}
          setOpen={setOpen}
          text="Risk Monitoring"></SideBarItem>
        <SideBarItem
          icon={<Handshake className="mx-[4px]" />}
          show={open}
          open={open}
          setOpen={setOpen}
          text="Reporting Operations"></SideBarItem>
        <SideBarItem
          icon={<Euro className="mx-[4px]" />}
          show={open}
          open={open}
          setOpen={setOpen}
          text="Anti-Money Laundering"></SideBarItem>
      </section>
    </section>
  );
};

interface SideBarItemProps {
  icon: ReactNode;
  show: boolean;
  text: string;
  pathname?: string;
  open?: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const SideBarItem = ({
  show,
  icon,
  text,
  pathname,
  open,
  setOpen,
}: SideBarItemProps) => {
  const path = usePathname();
  const router = useRouter();

  const handleNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const link = (e.target as HTMLButtonElement).id;
    if (link === path) {
      if (!open) setOpen(true);
    }

    if (pathname === "/eRisk/risk_identification_assessment") {
      router.push(pathname + `?action=${"risk_list"}`);
      return;
    }
    if (pathname === "/eRisk/risk_profile_reports") {
          router.push(pathname + `?action=${"kri_review"}`);
          return;
    }
    router.push(pathname ?? "#");
  };

  useEffect(() => {
    setTimeout(() => {
      if (!open) setOpen(true);
    }, 400);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return (
    <BasicTooltip text={text} show={show}>
      <Button
        id={pathname}
        onClick={handleNavigation}
        className={`
          cursor-pointer shadow-none bg-white hover:bg-neutral-300 
          p-2 relative text-sidebar-foreground justify-start 
          h-10 w-full
          ${
            pathname === path
              ? "before:absolute bg-blue-200 before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-[4px] before:h-4 before:bg-primary before:rounded"
              : ""
          }
        `}>
        {icon}
        <Label
          className={` relative font-normal text-[14px] cursor-pointer pointer-events-none font-helvetica-13 overflow-hidden transition-all duration-300 ${
            show ? "w-o" : "w-full"
          }`}>
          {text}
        </Label>
      </Button>
    </BasicTooltip>
  );
};
