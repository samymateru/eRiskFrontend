"use client";
import {useLocalStorage} from "@/lib/hooks/use-localstorage";
import {useFetchOverRiskKRI} from "@/lib/api/risk_kri_api";
import {Label} from "@/components/ui/label";
import {KRITable} from "@/app/eRisk/risk_identification_assessment/_risk_identification_assessment/tables/kri_table";
import {Button} from "@/components/ui/button";
import {
    Activity,
    CalendarClock,
    ChartBar
} from "lucide-react";

const frequencies = [
    "Daily",
    "Weekly",
    "Bi Weekly",
    "Monthly",
    "Quarterly",
    "Semi Annually",
    "Annually",
    "Specific Date"
]

export const KRIReview = () => {

    return(
        <section tabIndex={0} className={"w-full flex h-[calc(100svh-184px)] overflow-y-auto flex-col gap-11 py-2"}>
            {frequencies.map((frequency) => (
                <section
                    key={frequency}
                    data-frequency={frequency}
                    className="bg-white px-4"
                >
                    <KRIBlock
                        frequency={frequency}
                    />
                </section>
            ))}
        </section>

    )
}

interface KRIBlockProps {
    frequency: string
}

const KRIBlock = ({frequency}: KRIBlockProps) => {
    const moduleId = useLocalStorage("module_id")
    const {data} = useFetchOverRiskKRI(moduleId, frequency)

    return (
        <section id={"body"} className={"flex flex-col gap-1"}>
            <section id={"header"} className={"flex items-end justify-between px-2"}>
                <section className={"flex item-center gap-2"}>
                    <CalendarClock size={18} className={"mt-[2px]"}/>
                    <Label className={"font-bold text-base "}>{frequency} KRIs</Label>
                </section>
                <section className={"flex items-center"}>
                    <section className={"flex items gap-2"}>
                        <Button variant={"outline"} className={"h-7 w-[104px] flex items-center justify-between font-normal"}>
                            <Activity size={16}/>
                            Profiles
                        </Button>
                        <Button variant={"outline"} className={"h-7 w-[104px] flex items-center justify-between font-normal"}>
                            <ChartBar size={16}/>
                            Reports
                        </Button>
                    </section>
                </section>
            </section>
            <section id={"main"}>
                <KRITable
                  emptyTable={
                      <Label>No Results On {frequency} KRIs</Label>
                   }
                   type={"review"} data={data}/>
            </section>
        </section>
    )
}