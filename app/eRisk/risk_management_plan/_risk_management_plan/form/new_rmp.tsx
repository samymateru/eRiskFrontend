"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RMPForm } from "./rmp_form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { APIRequestBuilder } from "@/components/forms/base-api-client";
import { ReactNode, useState } from "react";
import { NewRMPSchema, NewRMPType } from "@/lib/schemas/rmp_schemas";
import { useLocalStorage } from "@/lib/hooks/use-localstorage";

interface NewRMPProps {
  children: ReactNode;
}
export const NewRMP = ({ children }: NewRMPProps) => {
  const moduleId = useLocalStorage("module_id");
  const userId = useLocalStorage("user_id");
  const [open, onOpenChange] = useState<boolean>(false);
  const methods = useForm<NewRMPType>({
    resolver: zodResolver(NewRMPSchema),
  });

  const mutationFn = async (data: NewRMPType) => {
    return APIRequestBuilder.to<NewRMPType, unknown>(`/rmp/${moduleId}?user_id=${userId}`)
      .withMethod("POST")
      .withToken()
      .withBody(data)
      .fetch();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader className="flex flex-col mt-3">
          <SheetTitle className="font-bold text-[18px]">
            RMP Roll Forward
          </SheetTitle>
          <SheetDescription>
            Takes all your current activities and add them to brand new RMP
          </SheetDescription>
          <section className="mt-4">
            <RMPForm
              onSuccess={() => onOpenChange(false)}
              primaryButtonText="Roll"
              methods={methods}
              mutationFn={mutationFn}
            />
          </section>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
