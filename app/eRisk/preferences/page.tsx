import { Button } from "@/components/ui/button";
import { ModuleProfile } from "./_preferences/components/module_profile";
import { UserProfile } from "./_preferences/components/user_profile";
import { UserTable } from "./_preferences/tables/users_table";
import { Label } from "@/components/ui/label";
import { PreferenceHeader } from "./_preferences/components/header";
import { UserStat } from "./_preferences/components/user_stat";
import { RoleStat } from "./_preferences/components/role_stat";
import { BinStat } from "./_preferences/components/bin_stat";
import { NotificationStat } from "./_preferences/components/notification_stat";
import {RoleTable} from "@/app/eRisk/preferences/_preferences/tables/roles_table";

export default function PreferencePage() {
  return (
    <section id="top" className="w-full flex flex-col py-1 gap-4">
      <section id="header" className="flex flex-col gap-4 px-3">
        <Label className="font-bold text-[20px]">Preferences</Label>
        <section>
          <section>
            <PreferenceHeader />
          </section>
        </section>
      </section>
      <section className="overflow-y-auto flex-1">
        <section className="flex items-center gap-4 h-fit px-3">
                <section className="h-[190px] flex-1 shadow-blue-200 rounded-lg shadow-md bg-neutral-100 p-1">
                    <UserProfile />
                </section>
                <section className="h-[190px] flex-1 shadow-blue-200 rounded-lg shadow-md bg-neutral-100 p-1">
                    <ModuleProfile />
                </section>
                <section className="h-[190px] flex flex-col gap-2 flex-1 shadow-blue-200 rounded-lg shadow-md bg-neutral-100 p-1">
                    <section className="flex items-center h-full gap-2">
                        <section className="flex-1 h-full">
                            <UserStat />
                        </section>
                        <section className="flex-1 h-full">
                            <RoleStat />
                        </section>
                    </section>
                    <section className="flex items-center h-full gap-2">
                        <section className="flex-1 h-full">
                            <NotificationStat />
                        </section>

                        <section className="flex-1 h-full">
                            <BinStat />
                        </section>
                    </section>
                </section>
            </section>
        <section className="flex gap-8 mt-8 px-3">
                <section className="flex-1 flex flex-col gap-2">
                    <section id="header" className="flex items-center justify-between">
                        <section>
                            <Label className="font-medium text-[20px]">Team</Label>
                        </section>
                        <section id="actions" className="flex items-center gap-1">
                            <Button
                                variant="default"
                                className="h-7 w-[80px] border rounded-full border-neutral-400">
                                Risk
                            </Button>
                            <Button
                                variant="outline"
                                className="h-7 w-[80px] rounded-full border border-neutral-400">
                                Client
                            </Button>
                        </section>
                    </section>
                    <section>
                        <UserTable />
                    </section>
                </section>
                <section className="flex-1 flex flex-col gap-2">
                    <section id="header" className="flex items-center justify-between">
                        <section>
                            <Label className="font-medium text-[20px]">Roles</Label>
                        </section>
                        <section id="actions" className="flex items-center gap-1">
                            <Button
                                variant="default"
                                className="h-7 w-[80px] rounded-full border border-neutral-400">
                                Risk
                            </Button>
                            <Button
                                variant="outline"
                                className="h-7 w-[80px] rounded-full border border-neutral-400">
                                Client
                            </Button>
                        </section>
                    </section>
                    <section>
                        <RoleTable/>
                    </section>
                </section>
            </section>
      </section>
    </section>
  );
}
