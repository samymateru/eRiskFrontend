import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {ReactNode, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {APIRequestBuilder} from "@/components/forms/base-api-client";
import {NewRiskProfileSchema, NewRiskProfileType} from "@/lib/schemas/risk_profiles_schemas";
import {RiskKRIProfileForm} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/forms/risk_kri_profile_form";
import {KRIMetricThreshold} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/kri_metrics_card";
import {ThresholdType} from "@/lib/schemas/kir-schemas";
import {describeInequality} from "@/lib/utils";

interface NewRiskProfileProps {
    children: ReactNode
    kriId?: string
    riskId?: string,
    description?: string;
    type?: string | "Qualitative" | "Quantitative";
    thresholds?: ThresholdType
}

export const NewRiskProfile = ({
    children,
    riskId,
    kriId,
    description,
    thresholds,
    type
}: NewRiskProfileProps) => {
    const [open, onOpenChange] = useState<boolean>();

    const methods = useForm<NewRiskProfileType>({
        resolver: zodResolver(NewRiskProfileSchema),
    });

    const mutationFn = async (data: NewRiskProfileType) => {
        return APIRequestBuilder.to<NewRiskProfileType, unknown>(
            `/profiles_reports/${kriId}?risk_id=${riskId}`,
        )
            .withMethod("POST")
            .withToken()
            .withBody(data)
            .fetch();
    };

    return(
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="rounded-lg top-0">
                <SheetHeader className="flex flex-col mt-3">
                    <SheetTitle className="font-bold text-[18px]">
                        Risk KRI Profiling
                    </SheetTitle>
                    <SheetDescription>
                        {description}
                    </SheetDescription>
                    <section className="mt-4 flex flex-col gap-7">
                        {
                          type === "Quantitative" && (
                            <section id={"middle"} className={"flex flex-col gap-2"}>
                                <KRIMetricThreshold color={"bg-green-400"} value={describeInequality(thresholds?.low ?? "")}/>
                                <KRIMetricThreshold color={"bg-yellow-400"} value={describeInequality(thresholds?.medium ?? "")}/>
                                <KRIMetricThreshold color={"bg-amber-400"} value={describeInequality(thresholds?.high ?? "")}/>
                                <KRIMetricThreshold color={"bg-red-400"} value={describeInequality(thresholds?.very_high ?? "")}/>
                            </section>
                          )
                        }

                        <RiskKRIProfileForm
                            kriId={kriId}
                            type={type ?? "Qualitative"}
                            onSuccess={() => {
                                onOpenChange(false);
                            }}
                            methods={methods}
                            mutationFn={mutationFn}
                        />
                    </section>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}