import {KRITable} from "@/app/eRisk/risk_identification_assessment/_risk_identification_assessment/tables/kri_table";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Eye} from "lucide-react";
import {ReadRiskKRIProfileType} from "@/lib/schemas/risk_profiles_schemas";

interface RiskKRIBlockProps{
    data: ReadRiskKRIProfileType
}

export const RiskKRIBlock = ({data}: RiskKRIBlockProps) => {
    return(
        <section className="py-5 flex flex-col">
            <section className={"flex flex-col gap-2"}>
                <section id="upper_risk_details">
                    <section id="risk_name" className={"flex items-center gap-1"}>
                        <span className={"flex items-center justify-center bg-black text-[11px] text-white w-fit h-fit rounded-full px-1"}>12999</span>
                        <Label className="font-semibold text-base">{data?.name}</Label>
                    </section>
                    <section id="risk_description" className="w-1/2">
                        <Label className={"text-sm font-medium"}>
                            {data?.description}
                        </Label>
                    </section>
                </section>
                <section id="lower_risk_details" className={"flex items-center justify-between"}>
                    <section id="secondary_risk_details" className={"flex items-center gap-2"}>
                        <Label className={"font-normal text-sm"}>{data?.reference ? data?.reference : "Ref-xxx"}</Label>
                        <span className={"flex w-1 h-1 rounded-full bg-black"}/>
                        <Label className={"font-normal text-sm"}>{data?.category}</Label>
                        <span className={"flex w-1 h-1 rounded-full bg-black"}/>
                        <Label className={"font-normal text-sm"}>{data?.department}</Label>
                    </section>
                    <section id="risk_actions" className={"flex-1 flex items-center justify-end"}>
                        <Button className={"font-normal h-7 w-fit px-2 rounded-full"}>
                            <Eye size={16}/>
                            View Risk
                        </Button>
                    </section>
                </section>
            </section>
            <section>
                <KRITable data={data?.kri}/>
            </section>
        </section>
    )
}

