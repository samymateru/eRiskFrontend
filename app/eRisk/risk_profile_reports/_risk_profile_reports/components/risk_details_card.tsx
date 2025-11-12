import {
    Building,
    Calendar,
    Clock,
    ShieldAlert
} from "lucide-react";
import {Label} from "@/components/ui/label";

interface RiskDetailsCardPros {
    name?: string;
    description?: string;
    reference?: string;
    department?: string;
    category?: string;
}

export const RiskDetailsCard = ({
    name,
    description,
    reference,
    department,
    category
    }: RiskDetailsCardPros) => {
    return(
        <section className={"bg-card flex flex-col justify-between gap-4 h-full p-3 rounded-lg"}>
            <section id={"top-header"} className={"flex flex-col gap-1"}>
                <section id={"icon"}>
                    <span className={"w-[32px] h-[32px] text-card-foreground p-2 rounded-full border-primary border flex"}>
                        <ShieldAlert size={16} className={"text-primary"}/>
                    </span>
                </section>
                <section id={"actions"} className={"flex items-center justify-between"}>
                    <section>
                        <Label className={"font-bold text-base text-card-foreground"}>Risk Profile</Label>
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
                    <section className={"mt-[2px]"}>
                        <Clock size={16}/>
                    </section>
                    <Label className={"font-medium text-sm text-card-foreground"}>{reference}</Label>
                </section>
                <section className={"flex items-center gap-1"}>
                    <section className={"mt-[2px]"}>
                        <Building size={16}/>
                    </section>
                    <Label className={"font-normal text-sm text-card-foreground"}>{department}</Label>
                </section>
                <section className={"flex items-center gap-1"}>
                    <section className={"mt-[2px]"}>
                        <Calendar size={16}/>
                    </section>
                    <Label className={"font-normal text-sm text-card-foreground"}>{category}</Label>
                </section>
            </section>
        </section>
    )
}