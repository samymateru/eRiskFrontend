import { Separator } from "@/components/ui/separator";
import { RiskOnboardingHeader } from "../components/risk-onboarding-header";
import { NewRiskForm } from "../forms/risk-form";
import { RiskRatingInput } from "../components/risk-rating-input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NewRiskSchema, NewRiskType } from "@/lib/schemas/risk-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { APIRequestBuilder } from "@/components/forms/base-api-client";

type Rating = {
  impact?: number;
  likelihood?: number;
  inherent_level?: number;
};

interface NewRiskProps<TResponse> {
  moduleId?: string | null;
  onSuccess?: (data: TResponse) => void;
  onError?: (error: Error) => void;
}

export const NewRisk = <TResponse,>({
  moduleId,
  onSuccess,
  onError,
}: NewRiskProps<TResponse>) => {
  const [impact, setImpact] = useState<number>(0);
  const [likelihood, setLikelihood] = useState<number>(0);

  const methods = useForm<NewRiskType>({
    resolver: zodResolver(NewRiskSchema),
    defaultValues: {
      process: "",
      sub_process: "",
      department: "",
      category: "",
    },
  });

  const mutationFn = async (data: NewRiskType) => {
    return APIRequestBuilder.to<NewRiskType, TResponse>(`/risks/${moduleId}`)
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
      <RiskOnboardingHeader />

      <section id="drawer-main" className="h-full flex-1 flex p-4 gap-2">
        <section>
          <Separator
            orientation="vertical"
            className="mx-2 w-px bg-neutral-300 h-full"
          />
        </section>
        <section className="flex-1/3 p-2 rounded-md">
          <NewRiskForm<NewRiskType, Rating, TResponse>
            optionalPayLoad={{
              impact: impact,
              likelihood: likelihood,
              inherent_level: impact * likelihood,
            }}
            methods={methods}
            mutationFn={mutationFn}
            onError={handleError}
            onSuccess={handleSuccess}
          />
        </section>
        <section>
          <Separator
            orientation="vertical"
            className="mx-2 w-px bg-neutral-300 h-full"
          />
        </section>

        <RiskRatingInput
          title="Inherent Risk Rating"
          impact={impact}
          likelihood={likelihood}
          setImpact={setImpact}
          setLikelihood={setLikelihood}
        />
      </section>
    </section>
  );
};
