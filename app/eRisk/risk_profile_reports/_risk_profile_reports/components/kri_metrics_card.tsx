import {ChartNoAxesGantt} from "lucide-react";
import {Label} from "@/components/ui/label";
import {describeInequality} from "@/lib/utils";
import {ThresholdType} from "@/lib/schemas/kir-schemas";

interface KRIMetricsCardPros {
    thresholds?: ThresholdType
}

export const KRIMetricsCard = ({thresholds}: KRIMetricsCardPros) => {
    return(
        <section className={"bg-card flex flex-col gap-4 h-full p-3 rounded-lg"}>
            <section id={"top-header"} className={"flex flex-col gap-1"}>
                <section id={"icon"}>
                    <span className={"w-[32px] h-[32px] p-2 rounded-full border-primary border flex"}>
                        <ChartNoAxesGantt size={16} className={"text-card-foreground"}/>
                    </span>
                </section>
                <section id={"actions"} className={"flex items-center justify-between"}>
                    <section>
                        <Label className={"font-bold text-base text-card-foreground"}>KRI Metrics</Label>
                    </section>
                    <section></section>
                </section>
            </section>
            <section id={"middle"} className={"flex flex-col gap-2"}>
                <KRIMetricThreshold color={"bg-green-400"} value={describeInequality(thresholds?.low ?? "")}/>
                <KRIMetricThreshold color={"bg-yellow-400"} value={describeInequality(thresholds?.medium ?? "")}/>
                <KRIMetricThreshold color={"bg-amber-400"} value={describeInequality(thresholds?.high ?? "")}/>
                <KRIMetricThreshold color={"bg-red-400"} value={describeInequality(thresholds?.very_high ?? "")}/>
            </section>
        </section>
    )
}


interface KRIMetricThresholdProps {
    color?: string
    value?: string
}

export const KRIMetricThreshold = ({color, value}: KRIMetricThresholdProps) => {
    return(
        <section className={"flex items-center gap-2"}>
            <span className={`w-5 flex h-5 ${color} rounded-full`}/>
            <Label className={"font-normal text-sm text-card-foreground"}>{value}</Label>
        </section>
    )
}