import {
    Activity,
    Calendar,
    Clock
} from "lucide-react";
import {Label} from "@/components/ui/label";
import {formatDate} from "@/lib/utils/datetime-formater";

interface KRIDescriptionCard{
    name?: string;
    description?: string;
    frequency?: string;
    type?: string;
    next_at?: Date;
}

export const KRIDescriptionCard = ({
    name,
    description,
    frequency,
    type,
    next_at
   }: KRIDescriptionCard) => {
    return(
        <section className={"bg-card flex flex-col gap-4 justify-between h-full p-3 rounded-lg"}>
            <section id={"top-header"} className={"flex flex-col gap-1"}>
                <section id={"icon"}>
                    <span className={"w-[32px] h-[32px] text-card-foreground p-2 rounded-full border-primary border flex"}>
                        <Activity size={16} className={"text-card-foreground"}/>
                    </span>
                </section>
                <section id={"actions"} className={"flex items-center justify-between"}>
                    <section>
                        <Label className={"font-bold text-base text-card-foreground"}>KRI Profile</Label>
                    </section>
                    <section></section>
                </section>
            </section>
            <section id={"middle"} className={"flex flex-col gap-1.5"}>
                <section id={'kri_name'} className={"flex gap-1 items-center"}>
                    <span className={"flex w-[6px] h-[6px] bg-card-foreground rounded-full"}/>
                    <Label className={"font-medium text-sm text-card-foreground"}>{name}</Label>
                </section>
                <section id={'kri_description'} className={"flex gap-1 items-start"}>
                    <span className={"flex w-[7px] h-4 bg-card-foreground mt-[6px]"}/>
                    <Label className={"font-[400] text-[14px] text-card-foreground"}>
                        {description}
                    </Label>
                </section>
            </section>
            <section id={"bottom"} className={"flex gap-5 items-center"}>
                <section className={"flex items-center gap-1"}>
                    <section className={"mt-[2px] text-card-foreground"}>
                        <Clock size={16}/>
                    </section>
                    <Label className={"font-normal  text-card-foreground text-sm"}>{frequency}</Label>
                </section>
                <section className={"flex items-center gap-1"}>
                    <section className={"mt-[2px]"}>
                        <Clock size={16}/>
                    </section>
                    <Label className={"font-normal text-sm text-card-foreground"}>{type}</Label>
                </section>
                <section className={"flex items-center gap-1"}>
                    <section className={"mt-[2px]"}>
                        <Calendar size={16}/>
                    </section>
                    <Label className={"font-normal text-sm text-card-foreground"}>{formatDate(next_at)}</Label>
                </section>
            </section>
        </section>
    )
}