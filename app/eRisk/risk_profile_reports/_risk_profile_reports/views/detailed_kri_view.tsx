import {ReactNode} from "react";
import {KRIDescriptionCard} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/kri_details_card";
import {RiskDetailsCard} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/risk_details_card";
import {RiskResponsesTable} from "@/app/eRisk/risk_identification_assessment/_risk_identification_assessment/tables/responses_table";
import {useFetchRiskResponses} from "@/lib/api/risk_responses_api";
import {Label} from "@/components/ui/label";
import {KRIMetricsCard} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/kri_metrics_card";
import {useSearchParams} from "next/navigation";
import {useFetchRisk} from "@/lib/api/risks_api";
import {useFetchKRI} from "@/lib/api/risk_kri_api";


interface DetailedKRIViewProps {
    children?: ReactNode
}
export const DetailedKRIView = ({}: DetailedKRIViewProps) => {
    const params = useSearchParams()
    const { data: responses } = useFetchRiskResponses(params.get("riskId"));
    const { data: risk } = useFetchRisk(params.get("riskId"));
    const { data: kri } = useFetchKRI(params.get("kriId"));

    return(
        <section className={'flex flex-col h-[calc(100svh-195px)] overflow-y-auto  gap-5 px-4'}>
            <section className={"flex h-[300px] items-center gap-4"} id={"upper"}>
                <section className={"flex-1 h-full"}>
                    <KRIDescriptionCard
                        name={kri?.name}
                        description={kri?.description}
                        frequency={kri?.frequency}
                        next_at={kri?.next_at}
                        type={kri?.type}
                    />
                </section>
                {
                    kri?.type === "Quantitative" && (
                        <section className={"flex-1 h-full"}>
                            <KRIMetricsCard
                                thresholds={
                                {
                                    low: kri?.low,
                                    medium: kri?.medium,
                                    high: kri?.high,
                                    very_high: kri?.very_high
                                }
                            }/>
                        </section>
                    )
                }
                <section className={"flex-1 h-full"}>
                    <RiskDetailsCard
                        name={risk?.name}
                        description={risk?.description}
                        reference={risk?.reference}
                        department={risk?.department}
                        category={risk?.category}

                    />
                </section>
            </section>
            <section id={"lower"} className={"flex flex-col gap-2"}>
                <section>
                    <Label className={"font-bold text-base"}>Risk Controls</Label>
                </section>
                <RiskResponsesTable data={responses} />
            </section>
        </section>


    )
}