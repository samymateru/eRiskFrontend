"use client";
import {KRIReportsTable} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/tables/kri_reports_table";
import {useFetchKRIReports} from "@/lib/api/risk_profile_report_api";
import {useLocalStorage} from "@/lib/hooks/use-localstorage";
import {useMemo} from "react";

export const KRIReportListView = () => {
    const moduleId = useLocalStorage("module_id")
    const {data: reports} = useFetchKRIReports(moduleId)
    const memoizedReports = useMemo(() => {
        return Array.isArray(reports) ? reports : [];
    }, [reports]);

    return(
        <section className={"w-full flex h-[calc(100svh-185px)]  overflow-y-auto px-4"}>
            <KRIReportsTable data={memoizedReports} height={"185"}/>
        </section>
    )
}