import {Calendar} from "@/components/ui/calendar";
import {Cell} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/cell";


export const WeeklyFilter = () => {
    return(
        <section className={"flex items-start justify-center w-fit gap-5"}>
            <section className="grid grid-cols-10 gap-1">
                {Array.from({ length: 52 }, (_, i) => (
                    <Cell onClick={() => console.log(i + 1)} key={i} value={i + 1} />
                ))}
            </section>
            <section className={""}>
                <Calendar className={"w-full"} mode="single"/>
            </section>
        </section>
    )
}
