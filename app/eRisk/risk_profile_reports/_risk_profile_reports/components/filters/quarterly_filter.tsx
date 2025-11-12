import {Cell} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/cell";

export const QuarterlyFilter = () => {
    return(
        <section className={"flex items-start justify-center w-fit gap-5"}>
            <section className="grid grid-cols-4 gap-1">
                {Array.from({ length: 4 }, (_, i) => (
                    <Cell height={100} width={100} key={i} value={i + 1} />
                ))}
            </section>
        </section>
    )
}
