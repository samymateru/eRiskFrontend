import {Calendar} from "@/components/ui/calendar";
import {useState} from "react";

export const DailyFilter = () => {
    const [date, setDate] = useState<Date>()

    return(
        <section className={"overflow-y-auto"}>
            <Calendar className={"w-full"} mode="single" selected={date} onSelect={setDate} />
        </section>
    )
}