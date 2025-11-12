import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {Badge} from "@/components/ui/badge";
import {abbreviate} from "@/lib/utils";
import {ReactNode} from "react";
import {WeeklyFilter} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/weekly_filter";
import {DailyFilter} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/daily_filter";
import {BiWeeklyFilter} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/bi_weekly_filter";
import {MonthlyFilter} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/monthly_filter";
import {Label} from "@/components/ui/label";
import {QuarterlyFilter} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/quarterly_filter";
import {SemiAnnuallyFilter} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/semi_annually_filter";


interface FrequencyFilterV2Props{
    children?: ReactNode
}


export const FrequencyFilterV2 = ({children}: FrequencyFilterV2Props) => {

    return(
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent side={"bottom"} align={"end"} className={"transition-all ease-linear w-fit min-w-[300px]  p-0"}>
                <section className={"w-full h-full flex flex-col"}>
                    <FrequencyFilterContent alignOffset={0} value={""} title={"Daily"} component={<DailyFilter/>}>
                        <FrequencyTrigger value="daily" title={ "Daily"}/>
                    </FrequencyFilterContent>
                    <FrequencyFilterContent value={""} alignOffset={-32} title={"Weekly"} component={<WeeklyFilter/>}>
                        <FrequencyTrigger value="weekly" title={ "Weekly"}/>
                    </FrequencyFilterContent>

                    <FrequencyFilterContent value={""} alignOffset={-64} title={"Bi Weekly"} component={<BiWeeklyFilter/>}>
                        <FrequencyTrigger value="bi_weekly" title={"Bi Weekly"}/>
                    </FrequencyFilterContent>
                    <FrequencyFilterContent value={""} alignOffset={-96} title={"Monthly"} component={<MonthlyFilter/>}>
                        <FrequencyTrigger value="monthly" title={"Monthly"}/>
                    </FrequencyFilterContent>
                    <FrequencyFilterContent value={""} alignOffset={-128} title={"Quarterly"} component={<QuarterlyFilter/>}>
                        <FrequencyTrigger value="quarterly" title={"Quarterly"}/>
                    </FrequencyFilterContent>
                    <FrequencyFilterContent value={""} alignOffset={-160} title={"Semi Annually"} component={<SemiAnnuallyFilter/>}>
                        <FrequencyTrigger value="semi_annually" title={"Semi Annually"}/>
                    </FrequencyFilterContent>
                    <FrequencyTrigger value="annually" title={"Annually"}/>
                    <FrequencyFilterContent value={""} alignOffset={-224} title={"Specific Date"} component={<DailyFilter/>}>
                        <FrequencyTrigger value="specific_date" title={"Specific Date"}/>
                    </FrequencyFilterContent>
                </section>
            </PopoverContent>
        </Popover>
    )
}


interface FrequencyTriggerProps{
    title?: string;
    value: string
}

const FrequencyTrigger = ({title}: FrequencyTriggerProps) => {
    return(
        <div role={"botton"} className={"flex gap-2 text-sm py-[6px] m-0 hover:bg-neutral-300 cursor-pointer bg-transparent  items-center justify-start w-full px-4 font-normal shadow-none rounded-none"}>
            <Badge className={"rounded-full text-[10px] font-normal w-5 h-5 p-2"}>{abbreviate(title ?? "")}</Badge>
            {title}
        </div>
    )
}

interface FrequencyFilterContentProps{
    onValueChange?: (value: string) => void
    value: string
    title?: string
    component?: ReactNode
    children?: ReactNode
    alignOffset?: number
}

const FrequencyFilterContent = ({
        component,
        children,
        title,
        alignOffset = 0
    }: FrequencyFilterContentProps) => {

    return(
        <Popover>
            <PopoverTrigger>{children}</PopoverTrigger>
            <PopoverContent align={"start"} alignOffset={alignOffset} side={"left"}  sideOffset={4} className={"transition-all ease-linear w-fit min-w-[300px] p-0"}>
                <section className={"flex flex-col gap-4 mt-0 p-4"}>
                    <section>
                        <FrequencyHeader frequency={title}/>
                    </section>
                    <section>
                        {component}
                    </section>
                </section>
            </PopoverContent>
        </Popover>
    )
}


interface FrequencyHeaderProps{
    frequency?: string
}
const FrequencyHeader = ({
         frequency,
    }: FrequencyHeaderProps) => {
    return(
        <section>
            <Label className={"font-semibold text-[18px]"}>{frequency}</Label>
        </section>
    )
}