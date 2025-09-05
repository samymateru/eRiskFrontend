import { Separator } from "@/components/ui/separator";
import { RiskOnboardingHeader } from "../components/risk-onboarding-header";
import { KRIForm } from "../forms/kri-form";
import { NewKRISchema, NewKRIType } from "@/lib/schemas/kir-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { APIRequestBuilder } from "@/components/forms/base-api-client";

interface NewKRIProps<TResponse> {
  onSuccess?: (data: TResponse) => void;
  onError?: (error: Error) => void;
  risk_id?: string;
  showHeader?: boolean;
}

export const NewKRI = <TResponse,>({
  onSuccess,
  onError,
  risk_id,
  showHeader = true,
}: NewKRIProps<TResponse>) => {
  const methods = useForm<NewKRIType>({
    resolver: zodResolver(NewKRISchema),
    defaultValues: {
      name: "",
      frequency: "",
      type: "Quantitative",
    },
  });

  const mutationFn = async (data: NewKRIType) => {
    return APIRequestBuilder.to<NewKRIType, TResponse>(`/risk_kri/${risk_id}`)
      .withMethod("POST")
      .withToken()
      .withBody(data)
      .fetch();
  };

  const handleError = (error: Error) => {
    onError?.(error);
  };

  const handleSuccess = (data: TResponse) => {
    onSuccess?.(data);
  };

  return (
    <section className="flex h-full">
      <section className={`${!showHeader ? "w-0" : ""} overflow-x-hidden`}>
        <RiskOnboardingHeader
          title="Key Risk Indicators Creator"
          description="KRI are the measure of the severity of the risk, provide neccessary information then set the KRI threshold"
        />
      </section>

      {showHeader ? (
        <Separator orientation="vertical" className="my-1 bg-neutral-300" />
      ) : null}

      <section id="drawer-main" className="h-full flex-1 flex p-4 gap-2">
        <section className="flex-1/3 p-2 rounded-md">
          <KRIForm<NewKRIType, unknown, TResponse>
            methods={methods}
            mutationFn={mutationFn}
            onError={handleError}
            onSuccess={handleSuccess}
          />
        </section>
        {showHeader ? (
          <Separator orientation="vertical" className="my-1 bg-neutral-300" />
        ) : null}{" "}
      </section>
    </section>
  );
};
