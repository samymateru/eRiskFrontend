import {RiskKRIBlock} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/risk_kri_block";
import {useFetchRiskKRIProfile} from "@/lib/api/risk_profile_report_api";
import {useLocalStorage} from "@/lib/hooks/use-localstorage";
import {Separator} from "@/components/ui/separator";

export const RiskProfileView = () => {
    const moduleId = useLocalStorage("module_id")
    const {data} = useFetchRiskKRIProfile(moduleId)
    return(
        <section id="content" className="flex-1 rounded-md overflow-y-auto">
            <Separator className={"bg-neutral-400"}/>
            {
                data?.map((risk,index) => (
                    <section key={index}>
                        <section key={index} className={`${ index % 2 ? "bg-lime-400" : "bg-white"} px-3 rounded-lg`}>
                            <RiskKRIBlock data={risk}/>
                        </section>
                        <Separator className={"bg-neutral-400"}/>
                    </section>

                ))
            }

        </section>

    )
}