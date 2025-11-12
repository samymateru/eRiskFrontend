import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import {ReactNode, useId} from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";


interface KRIReviewPrimaryFilterProps{
    children?: ReactNode;
}

export const KRIReviewPrimaryFilter = ({children}: KRIReviewPrimaryFilterProps) => {
    return(
        <Popover>
            <PopoverTrigger asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent align={"end"} alignOffset={0} className={"m-0 px-0 py-2 flex flex-col gap-2"}>
                <section>
                    <Label className={"font-bold text-[18px] pl-2"}>Frequency Filters</Label>
                </section>
                <section>
                    <CheckBoxFilterItem title={"Daily"}/>
                    <CheckBoxFilterItem title={"Weekly"}/>
                    <CheckBoxFilterItem title={"Bi Weekly"}/>
                    <CheckBoxFilterItem title={"Monthly"}/>
                    <CheckBoxFilterItem title={"Quarterly"}/>
                    <CheckBoxFilterItem title={"Semi Annually"}/>
                    <CheckBoxFilterItem title={"Annually"}/>
                    <CheckBoxFilterItem title={"Specific Date"}/>
                </section>
            </PopoverContent>
        </Popover>
    )
}


interface CheckBoxFilterItemProps{
    onValueChange?: (value: boolean) => void;
    title?: string
}

const CheckBoxFilterItem = ({
    onValueChange,
    title
    }: CheckBoxFilterItemProps) => {
    const id = useId()

    return(
        <section  className={"flex cursor-pointer items-center gap-2 hover:bg-neutral-300 px-2 h-[32px]"}>
            <Checkbox onCheckedChange={onValueChange} id={id} className={"border-neutral-400 cursor-pointer w-[17px] data-[state=checked]:bg-green-700 h-[17px] rounded-full"}/>
            <Label htmlFor={id} className={"text-black font-normal cursor-pointer text-sm flex-1 h-full"}>{title}</Label>
        </section>
    )
}