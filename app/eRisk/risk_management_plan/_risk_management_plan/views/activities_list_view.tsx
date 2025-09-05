"use client";
import { useLocalStorage } from "@/lib/hooks/use-localstorage";
import { RmpHeader } from "../components/rmp-header";
import { ActivitiesTable } from "../tables/activities-table";

export const ActivitiesListView = () => {
  const moduleId = useLocalStorage("module_id");
  return (
    <div className="w-full flex flex-col gap-3">
      <RmpHeader />
      <section className="bg-neutral-100 mx-2 rounded-md">
        <ActivitiesTable moduleId={moduleId} />
      </section>
    </div>
  );
};
