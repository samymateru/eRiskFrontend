"use client";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { BaseForm } from "@/components/forms/base-form";
import { BaseInputField } from "@/components/inputs/base-input-field";

interface RiskRegisterFormProps<TData extends FieldValues, TResponse> {
  onError?: (error: Error) => void;
  onSuccess?: (data: TResponse) => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  methods: UseFormReturn<TData>;
  mutationFn: (data: TData) => Promise<TResponse>;
  mode?: "update" | "create";
}

export const RiskRegisterForm = <TData extends FieldValues, TResponse>({
  onError,
  onSuccess,
  primaryButtonText,
  secondaryButtonText,
  methods,
  mutationFn,
}: RiskRegisterFormProps<TData, TResponse>) => {
  const handleSuccess = (data: TResponse) => {
    onSuccess?.(data);
  };

  const handleError = (error: Error) => {
    onError?.(error);
  };

  return (
    <BaseForm<TData, TResponse, unknown>
      methods={methods}
      primaryButtonText={primaryButtonText}
      secondaryButtonText={secondaryButtonText}
      mutationFn={mutationFn}
      mutationKey={["createUser"]}
      handleSuccess={handleSuccess}
      handleError={handleError}
      isNext={false}>
      <BaseInputField
        id={"name" as import("react-hook-form").Path<TData>}
        label="Register Name"
        register={methods.register}
        error={methods.formState.errors}
      />
    </BaseForm>
  );
};
