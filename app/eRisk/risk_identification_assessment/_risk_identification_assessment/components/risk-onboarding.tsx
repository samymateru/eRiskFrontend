"use client";
import {Tabs, TabsContent} from "@/components/ui/tabs";
import {NewRisk} from "./new-risk";
import {NewRiskResponse} from "./new-risk-response";
import {useState} from "react";
import {NewKRI} from "./new-kri";
import {useLocalStorage} from "@/lib/hooks/use-localstorage";

export const RiskOnboarding = () => {
    const moduleId = useLocalStorage("module_id");
    const [value, setValue] = useState("new-risk");
    const [riskId, setRiskId] = useState<string | null>(null);

    const handleSuccess = (data: { risk_id: string }) => {
        setRiskId(data.risk_id);
        setValue("responses");
    };
    return (
        <Tabs value={value} className="w-full">
            <TabsContent value="new-risk">
                <NewRisk moduleId={moduleId} onSuccess={handleSuccess}/>
            </TabsContent>
            <TabsContent value="responses">
                <NewRiskResponse
                    riskId={riskId ?? ""}
                    onSuccess={() => setValue("kri")}
                />
            </TabsContent>
            <TabsContent value="kri">
                <NewKRI showHeader={false} risk_id={riskId ?? ""}/>
            </TabsContent>
        </Tabs>
    );
};
