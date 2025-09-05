import { Separator } from "@/components/ui/separator";
import { RiskOnboardingHeader } from "../components/risk-onboarding-header";
import { RiskRatingInput } from "../components/risk-rating-input";
import { useState } from "react";
import { RiskResponsesForm } from "../forms/risk-responses-form";
import { MessageCircleReply } from "lucide-react";
import { UpdateResidualRiskRatingType } from "@/lib/schemas/risk_ratings_schemas";
import {
  NewRiskResponseSchema,
  NewRiskResponseType,
} from "@/lib/schemas/risk-responses-schemas";
import { APIRequestBuilder } from "@/components/forms/base-api-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface NewRiskResponseProps<TResponse> {
  onSuccess?: (data: TResponse) => void;
  onError?: (error: Error) => void;
  riskId: string;
  isOnBoard?: boolean;
}

export const NewRiskResponse = <TResponse,>({
  onSuccess,
  onError,
  riskId,
  isOnBoard,
}: NewRiskResponseProps<TResponse>) => {
  const [impact, setImpact] = useState<number>(0);
  const [likelihood, setLikelihood] = useState<number>(0);

  const methods = useForm<NewRiskResponseType>({
    resolver: zodResolver(NewRiskResponseSchema),
    defaultValues: {
      type: "",
      frequency: "",
    },
  });

  const mutationFn = async (data: NewRiskResponseType) => {
    return APIRequestBuilder.to<NewRiskResponseType, TResponse>(
      `/risk_responses/${riskId}`
    )
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
      <section className={`${isOnBoard ? "w-[0]" : ""} overflow-x-hidden`}>
        <RiskOnboardingHeader
          topIcon={<MessageCircleReply size={18} />}
          title="Risk Responses Creator"
          description="After successfully create your risk in this section you need to provie the neccessary controls, 
        then sum up with the overal residual risk"
        />
      </section>

      <Separator orientation="vertical" className="my-1 bg-neutral-300" />
      <section id="drawer-main" className="h-full flex-1 flex p-4 gap-2">
        <section
          className={`${
            !isOnBoard ? "flex-1/3" : "w-[500px] mx-auto"
          }  p-2 rounded-md`}>
          <RiskResponsesForm<
            NewRiskResponseType,
            UpdateResidualRiskRatingType,
            TResponse
          >
            methods={methods}
            mutationFn={mutationFn}
            primaryButtonText="Save Responses"
            riskId={riskId}
            isOnBoard={isOnBoard}
            secondaryButtonText="Submit Rating"
            optionalPayLoad={{
              residual_impact: impact,
              residual_likelihood: likelihood,
            }}
            onError={handleError}
            onSuccess={handleSuccess}
          />
        </section>
        {!isOnBoard ? (
          <>
            <Separator orientation="vertical" className="my-1 bg-neutral-300" />
            <RiskRatingInput
              title="Residual Risk Rating"
              impact={impact}
              likelihood={likelihood}
              setImpact={setImpact}
              setLikelihood={setLikelihood}
            />
          </>
        ) : null}
      </section>
    </section>
  );
};
