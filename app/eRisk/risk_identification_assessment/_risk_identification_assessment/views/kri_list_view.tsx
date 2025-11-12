import {RiskIdentificationAssessmentHeader} from "@/app/eRisk/risk_identification_assessment/_risk_identification_assessment/components/risk_identification_assessment_header";
import {KRITable} from "@/app/eRisk/risk_identification_assessment/_risk_identification_assessment/tables/kri_table";
import {
    useLocalStorage
} from "@/lib/hooks/use-localstorage";
import {
    useFetchAllRiskKRI
} from "@/lib/api/risk_kri_api";

export const KRIListView = () => {
    const moduleId = useLocalStorage("module_id")
    const {data} = useFetchAllRiskKRI(moduleId)

    return(
        <section className="flex flex-col gap-3">
            <section>
                <RiskIdentificationAssessmentHeader />
            </section>
            <section className="px-2">
                <KRITable data={data ?? []} height={"208"} type={"full"}/>
            </section>
        </section>
    )
}