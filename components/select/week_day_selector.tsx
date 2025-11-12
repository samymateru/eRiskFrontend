import { Cell } from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/cell"
import {useState} from "react";

const weeks = ["MON", "TUE", "WED", "THU", "FRD", "SAT", "SUN"]

interface WeekDaySelectorProps{
    onValueChange?: (value?: number) => void;
}

export const WeekDaySelector = ({
    onValueChange
    }: WeekDaySelectorProps) => {

    const [selectedIndex, setSelectedIndex] = useState<number | undefined>()

    const handleClick = (index?: number) => {
        setSelectedIndex(index)
        onValueChange?.(index)
    }

    return (
        <section className="grid grid-cols-7 gap-2">
            {weeks.map((week, index) => (
                <Cell
                    onClick={() => handleClick?.(index)}
                    key={index}
                    value={index}
                    label={week}
                    isSelected={selectedIndex === index}
                    width={70}
                    height={65}
                />
            ))}
        </section>
    )
}
