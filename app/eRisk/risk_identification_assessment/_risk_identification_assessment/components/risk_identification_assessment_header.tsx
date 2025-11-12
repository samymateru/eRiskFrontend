"use client";
import {Label} from "@/components/ui/label";
import SearchInput from "@/components/inputs/search-input";
import {Button} from "@/components/ui/button";
import {
    Activity,
    Funnel,
    Menu,
    MessageCircleMore,
    ShieldAlert
} from "lucide-react";
import {RegisterActions} from "@/app/eRisk/risk_identification_assessment/_risk_identification_assessment/components/actions/risk_register_actions";
import {ReactNode} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {AssignBusinessOwners} from "@/app/eRisk/risk_identification_assessment/_risk_identification_assessment/components/assign_business_owner";

interface RiskIdentificationAssessmentHeaderProps {
    children?: ReactNode;
    riskIds?: string[]
}

export const RiskIdentificationAssessmentHeader = ({riskIds}: RiskIdentificationAssessmentHeaderProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const handleClick = (action: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("action", action);
        router.push(`?${params.toString()}`);
    };

    return(
        <section className="flex items-end justify-between px-2">
            {/* ------------------------------------------------- */}
            <section className="flex flex-col gap-1">
                <section>
                    <Label className="font-semibold text-[15px]">
                        All Responses Registered
                    </Label>
                </section>
                <section className="flex items-center gap-2 w-[450px]">
                    <section className="flex-1">
                        <SearchInput />
                    </section>
                    <section>
                        <Button>
                            <Funnel />
                        </Button>
                    </section>
                </section>
            </section>

            {/* ------------------------------------------------------- */}
            <section className="flex-1 flex items-center justify-between pl-5">
                <section id="view"></section>
                <section className="actions">
                    <section className="flex items-center gap-2">
                        {
                            (riskIds?.length ?? 0) > 0 && (
                                <AssignBusinessOwners riskIds={riskIds}>
                                    <Button className={"h-8 flex items-center gap-3 w-fit px-3 font-normal text-sm"}>
                                        Send
                                        <Label className={"bg-white text-black px-2 text-xs font-semibold rounded-full"}>{riskIds?.length}</Label>
                                    </Button>
                                </AssignBusinessOwners>
                            )
                        }
                        <section className="flex items-center gap-1">
                            <Button onClick={() => handleClick("risk_list")} variant={ `${searchParams.get("action") === "risk_list" ? "default" : "outline"}`} className="h-8 border-neutral-400 w-[100px] font-normal">
                                <ShieldAlert size={16}/>
                                Risks
                            </Button>
                            <Button onClick={() => handleClick("control_list")} variant={ `${searchParams.get("action") === "control_list" ? "default" : "outline"}`} className="h-8 border-neutral-400 w-[100px]">
                                <MessageCircleMore size={16}/>
                                Controls
                            </Button>
                            <Button onClick={() => handleClick("kri_list")} variant={ `${searchParams.get("action") === "kri_list" ? "default" : "outline"}`} className="h-8 border-neutral-400 w-[120px] px-2">
                                <Activity size={16}/>
                                KRIs
                            </Button>
                        </section>
                        <RegisterActions>
                            <Button>
                                <Menu size={16} />
                            </Button>
                        </RegisterActions>
                    </section>
                </section>
            </section>
        </section>

    )
}