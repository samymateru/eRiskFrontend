import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { RiskRegisterForm } from "./risk_register_form";
import { useForm } from "react-hook-form";
import {
  NewRiskRegisterSchema,
  NewRiskRegisterType,
} from "@/lib/schemas/risk_register_schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { APIRequestBuilder } from "@/components/forms/base-api-client";
import { ReactNode, useState } from "react";
import { useLocalStorage } from "@/lib/hooks/use-localstorage";

interface NewRiskRegisterProps {
  children: ReactNode;
}
export const NewRiskRegister = ({ children }: NewRiskRegisterProps) => {
  const moduleId = useLocalStorage("module_id");
  const userId = useLocalStorage("user_id");
  const [open, onOpenChange] = useState<boolean>();
  const methods = useForm<NewRiskRegisterType>({
    resolver: zodResolver(NewRiskRegisterSchema),
  });

  const mutationFn = async (data: NewRiskRegisterType) => {
    return APIRequestBuilder.to<NewRiskRegisterType, unknown>(
      `/risk_registers/${moduleId}?user_id=${userId}`,
    )
      .withMethod("POST")
      .withToken()
      .withBody(data)
      .fetch();
  };


  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="rounded-lg top-0">
        <SheetHeader className="flex flex-col mt-3">
          <SheetTitle className="font-bold text-[18px]">
            Roll Register Forward
          </SheetTitle>
          <SheetDescription>
            Rolling forward a register take all all risk in current and create a
            new register for them
          </SheetDescription>
          <section className="mt-4">
            <RiskRegisterForm
              onSuccess={() => {
                onOpenChange(false);
              }}
              methods={methods}
              mutationFn={mutationFn}
            />
          </section>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
