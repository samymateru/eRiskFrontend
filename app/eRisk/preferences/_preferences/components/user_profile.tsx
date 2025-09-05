"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/utils/datetime-formater";
import { Calendar, EllipsisVertical, Phone, Shield } from "lucide-react";
import {useFetchModuleUser} from "@/lib/api/users_api";
import {useLocalStorage} from "@/lib/hooks/use-localstorage";
import {UserProfileActions} from "@/app/eRisk/preferences/_preferences/components/actions/user_profile_actions";

export const UserProfile = () => {
  const moduleId = useLocalStorage("module_id")
  const userId = useLocalStorage("user_id")
  const {data} = useFetchModuleUser(moduleId, userId);

  return (
    <section className="h-full p-2 rounded-md flex flex-col gap-2">
      <section id="header" className="flex items-start justify-between">
        <section>
          <Label className="font-bold text-[18px]">User Profile</Label>
        </section>
        <section className="flex items-center gap-1.5">
          <section id="status">
            <Label className="w-fit bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center px-3 py-0.5 rounded-full">
                {data?.status}
            </Label>
          </section>
          <section id="actions">
              <UserProfileActions>
                  <Button className="flex h-6 w-6 rounded-full">
                      <EllipsisVertical size={16} />
                  </Button>
              </UserProfileActions>
          </section>
        </section>
      </section>
      {/* ------------------------------------- */}
      <section className="flex items-center gap-2">
        <section id="logo">
          <Avatar className="w-10 h-10">
            <AvatarImage src={data?.image ?? "https://github.com/shadcn.png"} />
            <AvatarFallback>SA</AvatarFallback>
          </Avatar>
        </section>
        <section id="name" className="flex flex-col gap-3 justify-center">
          <Label className="font-[500] text-[14px] leading-0.5">
              {data?.name}
          </Label>
          <Label className="font-[400] text-[14px] leading-0.5">
              {data?.email}
          </Label>
        </section>
      </section>
      {/* ------------------------ */}
      <section className="flex flex-col gap-1.5 mt-4">
        <section className="flex items-center justify-between">
          <section className="flex items-end gap-1">
            <Shield size={16} />
            <Label className="font-normal tex-sm">{data?.role}</Label>
          </section>
          <section>
            <Label className="w-fit text-xs font-semibold flex items-center justify-center px-3 py-0.5 bg-primary text-primary-foreground rounded-full">
                {data?.type}
            </Label>
          </section>
        </section>

        <section className="flex items-center gap-5">
          <section className="flex items-end gap-1">
            <Phone size={16} />
            <Label className="font-normal tex-sm">{data?.telephone ?? "xxxxxxxxxx"}</Label>
          </section>

          <section className="flex items-end gap-1">
            <Calendar size={16} />
            <Label className="font-normal tex-sm">
              {formatDate(data?.created_at)}
            </Label>
          </section>
        </section>
      </section>
    </section>
  );
};
