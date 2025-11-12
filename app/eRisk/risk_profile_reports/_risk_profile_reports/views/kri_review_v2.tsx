"use client";
import {useLocalStorage} from "@/lib/hooks/use-localstorage";
import {useFetchAllRiskKRI} from "@/lib/api/risk_kri_api";
import {KRITable} from "@/app/eRisk/risk_identification_assessment/_risk_identification_assessment/tables/kri_table";
import {useMemo} from "react";

export const KRIReviewV2 = () => {
    const moduleId = useLocalStorage("module_id")
    const {data} = useFetchAllRiskKRI(moduleId)

    const sortedData = useMemo(() => {
        if (!Array.isArray(data)) return [];
        return [...data].sort((a, b) => a.frequency.localeCompare(b.frequency));
    }, [data]);

    return(
        <section className={"w-full flex h-[calc(100svh-185px)]  overflow-y-auto px-4"}>
            <KRITable type={"full"}  groupColumn={"frequency"} height={"185"} data={sortedData ?? []}/>
        </section>

    )
}
