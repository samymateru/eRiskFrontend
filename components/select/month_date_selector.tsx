import {Cell} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/cell";
import {useState} from "react";


const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];


interface MonthDateSelectorProps{
    onValueChange?: (value?: number) => void;
}
export const MonthDateSelector = ({
    onValueChange
    }: MonthDateSelectorProps) => {


    return(
        <section>
            <MonthSelectorItem onValueChange={onValueChange}/>
        </section>
    )
}

interface MonthSelectorItemProps{
    onValueChange?: (value?: number) => void;
}

const MonthSelectorItem = ({
    onValueChange,
    }: MonthSelectorItemProps) => {

    const [selectedIndex, setSelectedIndex] = useState<number | undefined>()

    const handleClick = (index?: number) => {
        setSelectedIndex(index)
        onValueChange?.(index)
    }

    return(
        <section>
            <section className="grid grid-cols-13 gap-2">
                {months.map((month, index) => (
                    <Cell
                        onClick={() => handleClick(index  + 1)}
                        key={index + 1}
                        value={index + 1}
                        label={month}
                        width={40}
                        isSelected={selectedIndex === index + 1}
                        height={40}
                    />
                ))}
            </section>
        </section>
    )
}