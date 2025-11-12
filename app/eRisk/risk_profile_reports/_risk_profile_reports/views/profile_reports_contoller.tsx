"use client";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {
    Activity,
    ArrowLeft,
    ChartBar,
    Funnel,
    ShieldCheck
} from "lucide-react";
import {Tabs, TabsContent} from "@/components/ui/tabs";
import {DetailedKRIView} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/views/detailed_kri_view";
import {useRouter, useSearchParams} from "next/navigation";
import {FrequencyFilterV2} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/components/filters/frequency_filter_v2";
import {KRIReportListView} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/views/kri_report_list_view";
import {KRIReview} from "@/app/eRisk/risk_profile_reports/_risk_profile_reports/views/kri_review";


export const ProfileReportController = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const handleClick = (action: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("action", action);
        router.push(`?${params.toString()}`);
    };

    return(
        <section className={"flex flex-col gap-5"}>
            <section id="header" className={"px-4"}>
                <section className="">
                    <section className="flex flex-col gap-5">
                        <section className="flex items-center justify-between">
                            <Label className="font-bold text-[18px]">
                                Risk Profile & Reports
                            </Label>
                            <section className="flex flex-col gap-1">
                                <section>
                                    <Label>RG-001-2025</Label>
                                </section>
                                <section className="self-end">
                                    <Label className="text-[13px] bg-emerald-800 w-fit px-3 h-5 flex items-center justify-center rounded-full text-neutral-200">
                                        Active
                                    </Label>
                                </section>
                            </section>
                        </section>
                        <section className="flex items-center justify-between">
                          {
                            searchParams.get("action") !== "kri_details" ? (
                                <section className=" flex items-center gap-1">
                                    <Button onClick={() => handleClick("profile")} variant={`${searchParams.get("action") === "profile" ? "default": "outline"}`} className="w-[100px] h-8 border-neutral-400 font-normal">
                                        <Activity size={16}/>
                                        Profiles
                                    </Button>
                                    <Button onClick={() => handleClick("reports")} variant={`${searchParams.get("action") === "reports" ? "default": "outline"}`} className="h-8 border-neutral-400 w-[100px]">
                                        <ChartBar size={16}/>
                                        Reports
                                    </Button>
                                    <Button onClick={() => handleClick("kri_review")} variant={`${searchParams.get("action") === "kri_review" || searchParams.get("action") === "kri_details" ? "default": "outline"}`} className="h-8 border-neutral-400 w-[120px] px-2">
                                        <ShieldCheck size={16}/>
                                        KRI Reviews
                                    </Button>
                                </section>
                            ): (
                                <section className={"flex items-center gap-3"}>
                                    <section className={""}>
                                        <Button onClick={() => router.back()} variant={"outline"} className={"h-8 w-8 border border-neutral-400"}>
                                            <ArrowLeft size={16}/>
                                        </Button>
                                    </section>
                                    <section>
                                        <Label className={"font-bold text-base"}>KRI Details</Label>
                                    </section>
                                </section>
                            )
                          }
                          {
                            searchParams.get("action") !== "kri_review" && searchParams.get("action") !== "kri_details" && (
                                <FrequencyFilterV2>
                                    <Button className="h-8 min-w-[120px]">
                                        <Funnel size={16}/>
                                        Filter
                                    </Button>
                                </FrequencyFilterV2>
                              )
                          }
                        </section>
                    </section>
                </section>
            </section>
            <section id={"main"} className={"w-full"}>
                <Tabs value={searchParams.get("action") ?? "kri_review"}>
                    <TabsContent className={"m-0 p-0 w-full h-full "} value={"kri_review"}>
                        <KRIReview/>
                    </TabsContent>
                    <TabsContent className={"m-0 p-0 w-full h-full "} value={"kri_details"}>
                        <DetailedKRIView/>
                    </TabsContent>
                    <TabsContent className={"m-0 p-0 w-full h-full"} value={"profile"}>
                        Profiles
                    </TabsContent>
                    <TabsContent className={"m-0 p-0 w-full h-full "} value={"reports"}>
                        <KRIReportListView/>
                    </TabsContent>
                </Tabs>
            </section>
        </section>
    )
}