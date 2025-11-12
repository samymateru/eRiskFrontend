"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { RiskListView } from "./risk_list_view";
import { useSearchParams } from "next/navigation";
import { Details } from "./details";
import { ControlListView } from "./control_list_view";
import {KRIListView} from "@/app/eRisk/risk_identification_assessment/_risk_identification_assessment/views/kri_list_view";

export const RiskAssessmentViewController = () => {
  const params = useSearchParams();

  return (
    <Tabs value={params.get("action") ?? "risk_list"} className="h-full">
      <TabsContent value="risk_list" className="mt-0 h-full">
        <RiskListView />
      </TabsContent>
      <TabsContent value="control_list" className="mt-0 h-full">
        <ControlListView />
      </TabsContent>
      <TabsContent value="kri_list" className="mt-0 h-full">
        <KRIListView />
      </TabsContent>
      <TabsContent value="risk_details" className="mt-0 h-full">
        <Details />
      </TabsContent>
    </Tabs>
  );
};
