import {Cell} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/cell";

export const SemiAnnuallyFilter = () => {
    return(
        <section className={"flex items-start justify-center w-fit gap-5"}>
            <section className="grid grid-cols-2 gap-1">
                {Array.from({ length: 2 }, (_, i) => (
                    <Cell height={100} width={130} key={i} value={i + 1} />
                ))}
            </section>
        </section>
    )
}
