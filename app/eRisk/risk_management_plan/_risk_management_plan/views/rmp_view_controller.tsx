"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ActivitiesListView } from "./activities_list_view";
import { ActivityDetailsView } from "./activity_details_view";
import { useSearchParams } from "next/navigation";

export const RMPViewController = () => {
  const params = useSearchParams();
  return (
    <Tabs value={params.get("action") ?? "rmp_list"}>
      <TabsContent value="rmp_list" className="mt-0 h-full bg-white">
        <ActivitiesListView />
      </TabsContent>
      <TabsContent value="activity_details" className="mt-0 h-full bg-white">
        <ActivityDetailsView />
      </TabsContent>
    </Tabs>
  );
};
