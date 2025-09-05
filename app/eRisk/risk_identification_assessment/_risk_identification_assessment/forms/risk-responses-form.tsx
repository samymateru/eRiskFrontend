"use client";
import { ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { APIRequestBuilder } from "@/components/forms/base-api-client";
import { Home } from "lucide-react";
import { BaseForm } from "@/components/forms/base-form";
import { BaseInputField } from "@/components/inputs/base-input-field";
import { BaseSelectField } from "@/components/select/base-select-field";
import { BaseTextAreaField } from "@/components/inputs/base-textarea-field";
import { UpdateResidualRiskRatingType } from "@/lib/schemas/risk_ratings_schemas";
import { useMutation } from "@tanstack/react-query";

interface RiskResponsesFormProps<
  TData extends FieldValues,
  TPayload,
  TResponse
> {
  children?: ReactNode;
  optionalPayLoad?: TPayload;
  onError?: (error: Error) => void;
  onSuccess?: (data: TResponse) => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  riskId?: string | null;
  methods: UseFormReturn<TData>;
  mutationFn: (data: TData) => Promise<TResponse>;
  isOnBoard?: boolean;
}

export const RiskResponsesForm = <
  TData extends FieldValues,
  TPayload,
  TResponse
>({
  optionalPayLoad,
  onSuccess,
  onError,
  primaryButtonText,
  secondaryButtonText,
  riskId,
  methods,
  mutationFn,
  isOnBoard = false,
}: RiskResponsesFormProps<TData, TPayload, TResponse>) => {
  const residualRiskMutationFn = async (data: UpdateResidualRiskRatingType) => {
    return APIRequestBuilder.to<UpdateResidualRiskRatingType, TResponse>(
      `/risk_ratings/residual/${riskId}`
    )
      .withMethod("PUT")
      .withToken()
      .withBody(data)
      .fetch();
  };

  const { mutate } = useMutation({
    mutationKey: ["add_risk_response", riskId],
    mutationFn: residualRiskMutationFn,
  });

  const handleSuccess = () => {
    methods.reset();
  };

  const handleError = (error: Error) => {
    onError?.(error);
  };

  const type = methods.watch("type" as import("react-hook-form").Path<TData>);

  const frequency = methods.watch(
    "frequency" as import("react-hook-form").Path<TData>
  );

  const handleSkip = () => {
    const payload: UpdateResidualRiskRatingType =
      (optionalPayLoad as UpdateResidualRiskRatingType) ?? {
        residual_impact: 0,
        residual_likelihood: 0,
      };

    mutate(payload, {
      onSuccess: (data) => {
        onSuccess?.(data);
      },
      onError: (error) => {
        onError?.(error);
      },
    });
  };

  const options = [
    {
      value: "react",
      label: "React",
      icon: (
        <section className="w-2 h-2 bg-red-700 flex rounded-full"></section>
      ),
    },
    {
      value: "next",
      label: "Next.js",
      icon: <Home color="black" size={16} />,
    },
    {
      value: "gatsby",
      label: "Gatsby",
      icon: <Home color="black" size={16} />,
    },
  ];
  return (
    <BaseForm
      primaryButtonText={primaryButtonText}
      secondaryButtonText={secondaryButtonText}
      methods={methods}
      mutationFn={mutationFn}
      mutationKey={["createUser"]}
      optionalPayLoad={optionalPayLoad}
      handleSuccess={handleSuccess}
      handleError={handleError}
      isNext={!isOnBoard}
      onSkip={handleSkip}>
      <BaseInputField
        id={"control" as import("react-hook-form").Path<TData>}
        label="Control"
        register={methods.register}
        error={methods.formState.errors}
      />
      <BaseTextAreaField
        id={"objective" as import("react-hook-form").Path<TData>}
        label="Control Objective"
        register={methods.register}
        error={methods.formState.errors}
      />
      <BaseTextAreaField
        id={"action_plan" as import("react-hook-form").Path<TData>}
        label="Action Plan"
        register={methods.register}
        error={methods.formState.errors}
      />
      <section className="flex items-center gap-2">
        <BaseSelectField
          className="flex-1"
          id={"type" as import("react-hook-form").Path<TData>}
          label="Control Type"
          value={type}
          options={options}
          setValue={methods.setValue}
          error={methods.formState.errors}
          placeholder="Choose one"
          onChange={(value) => console.log(value)}
        />
        <BaseSelectField
          className="flex-1"
          id={"frequency" as import("react-hook-form").Path<TData>}
          label="Frequency"
          value={frequency}
          options={options}
          setValue={methods.setValue}
          error={methods.formState.errors}
          placeholder="Choose one"
          onChange={(value) => console.log(value)}
        />
      </section>
    </BaseForm>
  );
};
