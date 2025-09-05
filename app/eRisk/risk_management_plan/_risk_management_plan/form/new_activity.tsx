"use client";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ActivityForm } from "./activity-form";
import { useForm } from "react-hook-form";
import {
  NewActivitySchema,
  NewActivityType,
} from "@/lib/schemas/activity-schemas";
import { APIRequestBuilder } from "@/components/forms/base-api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import {
    useLocalStorage
} from "@/lib/hooks/use-localstorage";

interface NewActivityProps {
  children: ReactNode;
  moduleId?: string | null;
}

export const NewActivity = ({ moduleId, children }: NewActivityProps) => {
  const userId = useLocalStorage("user_id");
  const methods = useForm<NewActivityType>({
    resolver: zodResolver(NewActivitySchema),
    defaultValues: {
      frequency: "",
      category: "",
      type: "",
    },
  });

  const mutationFn = async (data: NewActivityType) => {
    return APIRequestBuilder.to<NewActivityType, unknown>(
      `/activities/${moduleId}?user_id=${userId}`
    )
      .withMethod("POST")
      .withToken()
      .withBody(data)
      .fetch();
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="ml-[56px] min-h-[calc(100svh-56px)] flex">
        <DrawerHeader>
          <DrawerTitle className="text-base font-medium">
            Adding New Activity
          </DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <section id="main" className="w-[600px]  mx-auto justify-center">
          <ActivityForm<NewActivityType, unknown>
            methods={methods}
            mutationFn={mutationFn}
          />
        </section>
      </DrawerContent>
    </Drawer>
  );
};
