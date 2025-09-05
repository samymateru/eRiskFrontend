"use client";

import { UserDetails } from "@/components/shared/user-details";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/lib/utils/datetime-formater";
import {
  ArrowLeftCircle,
  Building,
  Calendar,
  CirclePlus,
  Menu,
  Shield,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { CreateKRIAction } from "../components/actions/kri_actions";
import { KRITable } from "../tables/kri_table";
import { CreateRiskResponseAction } from "../components/risk_response-actions";
import { RiskResponsesTable } from "../tables/responses_table";
import { useFetchRiskResponses } from "@/lib/api/risk_responses_api";
import {useFetchRisk, useFetchRiskOwners} from "@/lib/api/risks_api";
import {
    AssignRiskOwners
} from "@/app/eRisk/risk_identification_assessment/_risk_identification_assessment/components/assign_risk_owners";

export const Details = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { data } = useFetchRisk(params.get("risk_id"))
  const {data: riskOwners} = useFetchRiskOwners(params.get("risk_id"))
  const { data: responses } = useFetchRiskResponses(params.get("risk_id"));
  console.log(riskOwners)

  return (
    <section>
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
      <section className="overflow-y-auto h-[calc(100svh-156px)] flex flex-col gap-10">
        <section id="main" className="flex h-[calc(100svh-156px)] gap-4 mx-2">
          <section
            id="left"
            className="bg-white flex-1 flex flex-col justify-between px-4 py-3 rounded-lg">
            {/* -------------------Risk General Details---------------------- */}
            <section className="">
              <RiskGeneralDetails
                name={data?.name}
                description={data?.description}
                process={data?.process_name}
                sub_process={data?.sub_process}
                reference={data?.reference}
                year={data?.year}
              />
            </section>

            {/* --------------------------------------------------------------------------------------- */}
            <section className="flex flex-col gap-3">
              {/* ----------Risk Rating and Departments---------------- */}
              <section className="flex items-center gap-2 h-fit w-full">
                <section className="h-[138px] flex-1">
                  <RiskDepartment
                    department={data?.department}
                    category={data?.category}
                    created_at={data?.created_at}
                  />
                </section>
                <section className="flex-1">
                  <RiskRating
                    title="Inherent Risk"
                    impact={data?.inherent_impact}
                    likelihood={data?.inherent_likelihood}
                  />
                </section>
                <section className="flex-1">
                  <RiskRating
                    title="Residual Risk"
                    impact={data?.residual_impact}
                    likelihood={data?.residual_likelihood}
                  />
                </section>
              </section>
              {/* --------------------------Risk Creator-------------------------- */}
              <section className="rounded-md flex flex-col">
                <section>
                  <Label className="">Creator</Label>
                </section>
                <section>
                  <section className="mt-2 bg-secondary p-2 rounded-md">
                    <UserDetails isAction={false} />
                  </section>
                </section>
              </section>
              {/* --------------------------------------------------- */}
            </section>
          </section>

          <section id="right" className=" flex-1 flex flex-col px-4 py-3 gap-2">
            <section id="header" className="flex items-center justify-between ">
              <section>
                <Label>Owners</Label>
              </section>
            </section>
            <section id="body" className="overflow-y-auto px-1 flex-1">
                {
                    riskOwners && riskOwners.length > 0 ? (
                        riskOwners.map((owner, index) => (
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
                              <AssignRiskOwners riskId={params.get("risk_id")}>
                                <Button className="mt-2 px-4 font-normal py-2 bg-primary text-primary-foreground hover:bg-blue-600 rounded-full">
                                    <CirclePlus size={16}/> Add Risk Owners
                                </Button>
                              </AssignRiskOwners>
                            </section>
                        </section>
                    )
                }
            </section>
          </section>
        </section>
        <section id="tables" className="flex flex-col gap-8">
          {/* ------------------------------KRI Review---------------------- */}
          <section id="KRI" className="px-2">
            <Tables
              title="KRI Review"
              actions={
                <section className="flex items-center gap-1.5">
                  <CreateKRIAction risk_id={params.get("risk_id")}>
                    <Button
                      variant={"outline"}
                      className="h-8 rounded-full border-neutral-400 border w-[120px] text-sm font-normal cursor-pointer">
                      <CirclePlus size={16} /> New KRI
                    </Button>
                  </CreateKRIAction>
                </section>
              }
              data={<KRITable risk_id={params.get("risk_id")} />}
            />
          </section>
          {/* --------------Risk Responses-------------------------------------- */}
          <section id="responses" className="px-2">
            <Tables
              title="Risk Responses"
              actions={
                <section className="flex items-center gap-1.5">
                  <CreateRiskResponseAction risk_id={params.get("risk_id")}>
                    <Button
                      variant={"outline"}
                      className="h-8 rounded-full border-neutral-400 border w-[120px] text-sm font-normal cursor-pointer">
                      <CirclePlus size={16} /> Response
                    </Button>
                  </CreateRiskResponseAction>
                </section>
              }
              data={<RiskResponsesTable data={responses} />}
            />
          </section>
        </section>
      </section>
    </section>
  );
};

interface TablesProps {
  title: string;
  actions?: ReactNode;
  data?: ReactNode;
}

const Tables = ({ title, actions, data }: TablesProps) => {
  return (
    <section className="w-full flex flex-col gap-4">
      <section className="flex items-center justify-between px-2">
        <section>
          <Label className="font-bold text-[20px]">{title}</Label>
        </section>
        <section>{actions}</section>
      </section>
      <section>{data}</section>
    </section>
  );
};

interface RiskDepartmentProps {
  department?: string;
  category?: string;
  created_at?: Date;
}
const RiskDepartment = ({
  department,
  category,
  created_at,
}: RiskDepartmentProps) => {
  return (
    <section className="flex flex-col gap-1 bg-secondary h-full w-[250px] p-2 rounded-md">
      <section className="flex items-center gap-1.5">
        <section className="drop-shadow-[4px_4px_3px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(0,0,0,0.2)] h-8 w-8 flex bg-secondary items-center justify-center rounded-md">
          <Building size={16} />
        </section>
        <section>
          <Label>{department}</Label>
        </section>
      </section>
      <section className="flex items-center gap-1.5">
        <section className="drop-shadow-[4px_4px_3px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(0,0,0,0.2)] h-8 w-8 flex bg-secondary items-center justify-center rounded-md">
          <Shield size={16} />
        </section>
        <section>
          <Label>{category}</Label>
        </section>
      </section>
      <section className="flex items-center gap-1.5">
        <section className="drop-shadow-[4px_4px_3px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(0,0,0,0.2)] h-8 w-8 flex bg-secondary items-center justify-center rounded-md">
          <Calendar size={16} />
        </section>
        <section>
          <Label>{formatDate(created_at)}</Label>
        </section>
      </section>
    </section>
  );
};

interface RiskRatingProps {
  title: string;
  impact?: number;
  likelihood?: number;
}
const RiskRating = ({ title, impact, likelihood }: RiskRatingProps) => {
  return (
    <section className="flex flex-col gap-1 bg-secondary w-[200px] p-2 rounded-md">
      <Label>{title}</Label>
      <section className="flex items-center gap-1.5">
        <section className="drop-shadow-[4px_4px_3px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(0,0,0,0.2)] h-8 w-8 flex bg-secondary items-center justify-center rounded-md">
          <Label className="font-bold text-base">{impact}</Label>
        </section>
        <section>
          <Label>Impact</Label>
        </section>
      </section>
      <section className="flex items-center gap-1.5">
        <section className="drop-shadow-[4px_4px_3px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(0,0,0,0.2)] h-8 w-8 flex bg-secondary items-center justify-center rounded-md">
          <Label className="font-bold text-base">{likelihood}</Label>
        </section>
        <section>
          <Label>Likelihood</Label>
        </section>
      </section>
      <section className="flex items-center gap-1.5">
        <section className="drop-shadow-[4px_4px_3px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(0,0,0,0.2)] h-8 w-8 flex bg-secondary items-center justify-center rounded-md">
          <Label className="font-bold text-base">
            {(impact ?? 0) * (likelihood ?? 0)}
          </Label>
        </section>
        <section>
          <Label>{"low"}</Label>
        </section>
      </section>
    </section>
  );
};

interface RiskGeneralDetailsProps {
  name?: string;
  reference?: string;
  year?: number;
  description?: string;
  process?: string;
  sub_process?: string;
}

export const RiskGeneralDetails = ({
  name,
  reference,
  year,
  description,
  process,
  sub_process,
}: RiskGeneralDetailsProps) => {
  return (
    <section className=" flex flex-col gap-2">
      <section className="flex items-center justify-between">
        <section>
          <Label className="font-semibold text-base">{name}</Label>
        </section>
        <section className="flex items-center gap-2 ">
          <section className="bg-secondary px-3 py-1 rounded-md">
            <Label className="font-medium text-sm">
              {reference ?? "un implemented"}
            </Label>
          </section>
          <section className="bg-secondary px-3 py-1 rounded-md">
            <Label className="font-medium text-sm">{year}</Label>
          </section>
        </section>
      </section>
      <section>
        <Label className="text-sm font-medium opacity-90">{description}</Label>
      </section>
      <section className="flex items-center h-5 py-1">
        <section>
          <Label className="font-semibold text-sm">{process}</Label>
        </section>
        <Separator orientation="vertical" className="mx-2 bg-neutral-700" />
        <section>
          <Label className="font-semibold text-sm">{sub_process}</Label>
        </section>
      </section>
    </section>
  );
};
