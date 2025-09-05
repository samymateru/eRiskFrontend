"use client";
import { BasicTooltip } from "@/components/tooltips/basic-tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ReactNode } from "react";
import { LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserDetails } from "@/components/shared/user-details";
import { useRouter } from "next/navigation";
import {
    useLocalStorage
} from "@/lib/hooks/use-localstorage";
import {
    useFetchModuleUser
} from "@/lib/api/users_api";

interface ProfileProps {
  children: ReactNode;
}

export const Profile = ({ children }: ProfileProps) => {
  const router = useRouter();
  const moduleId = useLocalStorage("module_id")
  const userId = useLocalStorage("user_id")
  const {data} = useFetchModuleUser(moduleId, userId);

  return (
    <Popover>
      <BasicTooltip show={true} text="Your Profile" side="bottom">
        <PopoverTrigger asChild>{children}</PopoverTrigger>
      </BasicTooltip>
      <PopoverContent
        style={{
          boxShadow: "0 0 10px 2px rgba(59, 130, 246, 0.4)", // blue shadow all around
        }}
        className="w-[400px] relative left-[-20px] bg-white border-[1px] border-neutral-400 shadow-md shadow-blue-200">
        <section className="flex flex-col gap-5">
          <UserDetails
              name={data?.name}
              email={data?.email}
              status={data?.status}
              role={data?.role}
              date={data?.created_at}
          />
          <section id="account-actions">
            <section className="flex items-center gap-2">
              <Button className="flex-1 rounded-full border-[1px] border-neutral-300 hover:bg-neutral-400 cursor-pointer bg-secondary text-secondary-foreground">
                <LogOut
                  size={16}
                  rotate={180}
                  className="transform rotate-180"
                />
                Logout
              </Button>
              <Button
                onClick={() => router.push("/eRisk/preferences")}
                className="flex-1 rounded-full cursor-pointer hover:bg-blue-800">
                <Settings size={16} />
                Preferences
              </Button>
            </section>
          </section>
        </section>
      </PopoverContent>
    </Popover>
  );
};
