import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import {Badge} from "@/components/ui/badge";
import {abbreviate} from "@/lib/utils";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {ReactNode, useState} from "react";
import {WeeklyFilter} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/weekly_filter";
import {DailyFilter} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/daily_filter";
import {BiWeeklyFilter} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/bi_weekly_filter";
import {MonthlyFilter} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/monthly_filter";

export const FrequencyFilter = () => {
    const [value, onValueChange] = useState("menu")

    return(
        <Popover>
            <PopoverTrigger>Open</PopoverTrigger>
            <PopoverContent side={"bottom"} className={"relative transition-all ease-linear w-fit min-w-[300px] -left-[50px]  p-0"}>
                <Tabs value={value} onValueChange={onValueChange} defaultValue="menu" className="w-full">
                    <TabsContent value="menu" className={"m-0 h-full w-full"}>
                        <TabsList className={"w-full h-full flex flex-col"}>
                            <FrequencyTrigger value="daily" title={ "Daily"}/>
                            <FrequencyTrigger value="weekly" title={ "Weekly"}/>
                            <FrequencyTrigger value="bi_weekly" title={"Bi Weekly"}/>
                            <FrequencyTrigger value="monthly" title={"Monthly"}/>
                            <FrequencyTrigger value="quarterly" title={"Quarterly"}/>
                            <FrequencyTrigger value="semi_annually" title={"Semi Annually"}/>
                            <FrequencyTrigger value="annually" title={"Annually"}/>
                            <FrequencyTrigger value="specific_date" title={"Specific Date"}/>
                        </TabsList>
                    </TabsContent>
                    <FrequencyFilterContent
                        onValueChange={onValueChange}
                        value={"daily"}
                        title={"Daily"}
                        component={<DailyFilter/>}
                    />
                    <FrequencyFilterContent
                        onValueChange={onValueChange}
                        value={"weekly"}
                        title={"Weekly"}
                        component={<WeeklyFilter/>}
                    />
                    <FrequencyFilterContent
                        onValueChange={onValueChange}
                        value={"bi_weekly"}
                        title={"Bi Weekly"}
                        component={<BiWeeklyFilter/>}
                    />
                    <FrequencyFilterContent
                        onValueChange={onValueChange}
                        value={"monthly"}
                        title={"Monthly"}
                        component={<MonthlyFilter/>}

                    />
                    <FrequencyFilterContent onValueChange={onValueChange} value={"quarterly"} title={"Quarterly"}/>
                    <FrequencyFilterContent onValueChange={onValueChange} value={"semi_annually"} title={"Semi Annually"}/>
                    <FrequencyFilterContent onValueChange={onValueChange} value={"annually"} title={"Annually"}/>
                    <FrequencyFilterContent onValueChange={onValueChange} value={"specific_date"} title={"Specific Date"}/>
                </Tabs>
            </PopoverContent>
        </Popover>
    )
}


interface FrequencyHeaderProps{
    frequency?: string
    onValueChange?: (value: string) => void
}
const FrequencyHeader = ({
    frequency,
    onValueChange
    }: FrequencyHeaderProps) => {
    return(
        <section className={"px-2 pt-2 flex flex-col gap-2"}>
            <section>
                <Label className={"font-semibold text-[18px]"}>{frequency}</Label>
            </section>
            <section className={"flex items-center justify-between"}>
                <Button onClick={() => onValueChange?.("menu")} className={"w-7 h-7 border-primary"} variant={"outline"}>
                    <ArrowLeft size={16}/>
                </Button>
                <section></section>
            </section>
        </section>
    )
}

interface FrequencyTriggerProps{
    title?: string;
    value: string
}

const FrequencyTrigger = ({title, value}: FrequencyTriggerProps) => {
    return(
        <TabsTrigger value={value} className={"flex gap-2 py-[6px] m-0 hover:bg-neutral-300 cursor-pointer  items-center justify-start w-full px-4 font-normal"}>
            <Badge className={"rounded-full text-[10px] font-normal w-5 h-5 p-2"}>{abbreviate(title ?? "")}</Badge>
            {title}
        </TabsTrigger>
    )
}

interface FrequencyFilterContentProps{
    onValueChange?: (value: string) => void
    value: string
    title?: string
    component?: ReactNode
}

const FrequencyFilterContent = ({
    onValueChange,
    value,
    title,
    component
}: FrequencyFilterContentProps) => {

    return(
        <TabsContent value={value} className={"flex flex-col gap-4 mt-0 p-5"}>
            <section>
                <FrequencyHeader onValueChange={onValueChange} frequency={title}/>
            </section>
            <section>
                {component}
            </section>
        </TabsContent>
    )
}


