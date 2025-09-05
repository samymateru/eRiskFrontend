"use client";
import { Label } from "@/components/ui/label";
import {
    ArrowLeftCircle,
    Calendar,
    CircleCheck, CirclePlus,
    Menu,
    Repeat2,
} from "lucide-react";
import { UserDetails } from "@/components/shared/user-details";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {useFetchActivityOwners, useFetchSingleActivity} from "@/lib/api/activities_api";
import { formatDate } from "@/lib/utils/datetime-formater";
import {ActivityReportsTable} from "@/app/eRisk/risk_management_plan/_risk_management_plan/tables/activity_reports_table";
import {useFetchModuleUser} from "@/lib/api/users_api";
import {useLocalStorage} from "@/lib/hooks/use-localstorage";
import {useEffect, useState} from "react";
import {AssignActivityOwners} from "@/app/eRisk/risk_management_plan/_risk_management_plan/components/assign_activity_owners";

export const ActivityDetailsView = () => {
  const router = useRouter();
  const moduleId = useLocalStorage("module_id")
  const [userId, setUserId] = useState<string | null>(null);
  const params = useSearchParams();

  const { data } = useFetchSingleActivity(params.get("activity_id"));
  const {data: activityOwners} = useFetchActivityOwners(params.get("activity_id"))
  const {data: user} = useFetchModuleUser(moduleId, userId)

  useEffect(() => {
    if(data){
      setUserId(data.creator)
    }
  }, [data]);




  return (
    <section id="top_level" className="flex flex-col">
      {/* -----------Header--------------------------------- */}
      <section id="header">
        <section
          id="risk-details-header"
          className="backdrop-blur-md shadow-sm py-1.5 flex items-center justify-between px-2 rounded-md">
          <section>
            <Button
              onClick={() => router.back()}
              className="h-8 w-8 cursor-pointer bg-blue-300 hover:bg-primary hover:text-primary-foreground text-secondary-foreground border-primary">
              <ArrowLeftCircle size={16} />
            </Button>
          </section>
          <section>
            <Button className="h-8 font-medium text-xs flex items-center justify-center w-[120px] cursor-pointer rounded-full">
              <Menu size={16} />
              Options
            </Button>
          </section>
        </section>
      </section>
      <section className="flex flex-col gap-5 h-[calc(100svh-174px)] bg-white overflow-y-auto px-2 pb-3 pt-2">
        <section id="main_body" className="flex items-center gap-5 h-[220px]">
          {/* --------------left----------------------------- */}
          <section id="left" className="flex-1">
            <GeneralActivityDetails
              name={user?.name ?? ""}
              email={user?.email ?? ""}
              image={user?.image}
              user_status={user?.status ?? ""}
              role={user?.role ?? ""}
              created_at={user?.created_at}
              category={data?.category}
              title={data?.title}
              frequency={data?.frequency}
              status={data?.status}
              type={data?.type}
              next_at={data?.next_at}
            />
          </section>
          {/* -----------------right------------------------- */}
          <section id="right" className="flex flex-col gap-1 flex-1">
            <section>
              <Label className="font-medium tex-[14px">Activity Leads</Label>
            </section>
            {/* ------------------Leads List------------------ */}
            <section className="flex flex-col gap-1 py-1.5 px-2 overflow-y-auto h-[200px]">
                {
                    activityOwners && activityOwners.length > 0 ? (
                        activityOwners.map((owner, index) => (
                            <section key={index} className="bg-neutral-100 p-2 rounded-md">
                                <UserDetails
                                    name={owner?.usr_name}
                                    email={owner?.email}
                                    image={owner?.image}
                                    status={owner?.status}
                                    isAction={false}
                                    showLowerSection={false}
                                />
                            </section>
                        ))
                    ) : (
                        <section className="bg-neutral-50 h-full flex items-center justify-center border border-dashed border-gray-300 p-4 rounded-md text-gray-500 text-sm text-center">
                            <section>
                              <p>No owners added yet.</p>
                              <AssignActivityOwners activityId={params.get("activity_id")}>
                                <Button className="mt-2 px-4 font-normal py-2 bg-primary text-primary-foreground hover:bg-blue-600 rounded-full">
                                  <CirclePlus size={16}/> Add Activity Leads
                                </Button>
                              </AssignActivityOwners>
                            </section>
                        </section>
                    )
                }
            </section>
          </section>
        </section>
        {/* ---------------tables------------------------ */}
        <section id="tables" className="flex flex-col gap-2">
          <section id="head">
            <Label className="font-bold text-[16px]">Activity Reports</Label>
          </section>
          <section id="body">
            <ActivityReportsTable activityId={data?.activity_id} />
          </section>
        </section>
      </section>
    </section>
  );
};

interface GeneralActivityDetailsProps {
  title?: string;
  category?: string;
  type?: string;
  status?: string;
  frequency?: string;
  next_at?: Date;
  name: string
  email: string
  user_status: string
  image?: string
  role: string
  created_at?: Date
}

const GeneralActivityDetails = ({
  title,
  category,
  type,
  status,
  frequency,
  next_at,
  name,
  email,
  image,
  user_status,
  role,
  created_at
}: GeneralActivityDetailsProps) => {
  return (
    <section className="flex flex-col justify-between gap-4">
      {/* -------------------------------------------------------------------------- */}
      <section className="flex flex-col gap-1.5 bg-neutral-100 p-2 rounded-md">
        <section className="flex flex-col">
          <section>
            <Label className=" text-sm">{category}</Label>
          </section>
          <section className="flex items-start gap-1">
            <section className="w-2 h-2 flex bg-primary rounded-full mt-[5px]"></section>

            <Label className="font-medium text-sm opacity-80 flex-1">
              {title}
            </Label>
          </section>
        </section>
        <section className="flex justify-end">
          <Label className="font-medium text-xs">{type}</Label>
        </section>
      </section>

      <section className="flex items-center gap-4 h-[80px]">
        {/* --------------------------Status and Frequency--------------------------- */}
        <section className="h-full flex-1 flex justify-between pt-3  flex-col gap-0.5 bg-neutral-100 p-2 rounded-md">
          <section className="flex items-center gap-1">
            <CircleCheck size={16} className="text-green-800" />
            <Label className="font-semibold text-[14px]">{status}</Label>
          </section>
          <section className="flex justify-between">
            <section className="flex items-center gap-1">
              <Repeat2 size={16} />
              <Label className="font-medium text-xs">{frequency}</Label>
            </section>
            <section className="flex items-center gap-1">
              <Calendar size={16} />
              <Label className="font-medium text-xs">
                {formatDate(next_at)}
              </Label>
            </section>
          </section>
        </section>
        {/* --------------------------Creator-------------------------------------------- */}
        <section className="flex-1 h-full">
          <section className="bg-neutral-100 p-2 rounded-md h-full">
            <UserDetails
              name={name}
              email={email}
              isAction={false}
              image={image}
              status={user_status}
              role={role}
              date={created_at}
            />
          </section>
        </section>
      </section>
    </section>
  );
};
