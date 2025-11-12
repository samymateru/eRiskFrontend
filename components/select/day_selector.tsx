import {Cell} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/cell";
import {useState} from "react";


interface DateSelectorProps{
    onValueChange?: (value?: number) => void;
}
export const DateSelector = ({
      onValueChange
    }: DateSelectorProps) => {

    return(
        <section>
            <DateSelectorItem onValueChange={onValueChange}/>
        </section>
    )
}

interface DateSelectorItemProps{
    onValueChange?: (value?: number) => void;
}

const DateSelectorItem = ({
       onValueChange,
    }: DateSelectorItemProps) => {

    const [selectedIndex, setSelectedIndex] = useState<number | undefined>()

    const handleClick = (index?: number) => {
        setSelectedIndex(index)
        onValueChange?.(index)
    }

    return(
        <section>
            <section className="grid grid-cols-13 gap-2">
                {Array.from({ length: 31 }, (_, index) => (
                    <Cell
                        onClick={() => handleClick(index  + 1)}
                        key={index + 1}
                        value={index + 1}
                        label={String(index + 1)}
                        width={40}
                        isSelected={selectedIndex === index + 1}
                        height={40}
                    />
                ))}
            </section>
        </section>
    )
}