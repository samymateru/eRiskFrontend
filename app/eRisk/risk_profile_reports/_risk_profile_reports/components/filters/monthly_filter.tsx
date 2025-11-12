import {Cell} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/cell";

const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

export const MonthlyFilter = () => {
    return(
        <section className={"flex items-start justify-center w-fit gap-5"}>
            <section className="grid grid-cols-6 gap-2">
                {months.map((month, index) => (
                    <Cell
                        key={index}
                        value={index}
                        width={70}
                        height={65}
                    />
                ))}
            </section>
        </section>
    )
}
