"use client";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { BaseForm } from "@/components/forms/base-form";
import { BaseInputField } from "@/components/inputs/base-input-field";
import { BaseSelectField } from "@/components/select/base-select-field";
import { BaseTextAreaField } from "@/components/inputs/base-textarea-field";
import { useEffect, useState } from "react";
import {useLocalStorage} from "@/lib/hooks/use-localstorage";
import {
    useFetchEntityProcesses,
    useFetchEntityRiskCategory
} from "@/lib/api/constants_api";
import {departments} from "@/lib/utils/constants";


interface NewRiskFormProps<TData extends FieldValues, TPayload, TResponse> {
  optionalPayLoad?: TPayload;
  onError?: (error: Error) => void;
  onSuccess?: (data: TResponse) => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  methods: UseFormReturn<TData>;
  mutationFn: (data: TData) => Promise<TResponse>;
  mode?: "update" | "create";
}

export const NewRiskForm = <TData extends FieldValues, TPayload, TResponse>({
  optionalPayLoad,
  onError,
  onSuccess,
  primaryButtonText,
  secondaryButtonText,
  methods,
  mutationFn,
}: NewRiskFormProps<TData, TPayload, TResponse>) => {
  const entityId = useLocalStorage("entity_id");

  const {data: process} = useFetchEntityProcesses(entityId)
  const {data: riskCategory} = useFetchEntityRiskCategory(entityId)

  const [openSelect, setOpenSelect] = useState<
    null | "process" | "sub_process" | "department" | "category"
  >(null);

  const handleToggle = (
    select: "process" | "sub_process" | "department" | "category"
  ) => {
    setOpenSelect((prev) => (prev === select ? null : select));
  };


  const [selectedProcessId, setSelectedProcessId] = useState<string | null>(
    null
  );

  const [subProcessOptions, setSubProcessOptions] = useState<
    { value: string; label: string }[]
  >([]);

  useEffect(() => {
    if (!selectedProcessId) {
      setSubProcessOptions([]);
      return;
    }

    const selectedProcess = process?.find((p) => p.id === selectedProcessId);
    if (selectedProcess?.sub_process_name) {
      const options = selectedProcess.sub_process_name.map(
        (subProcess: string) => ({
          value: subProcess,
          label: subProcess,
        })
      );
      setSubProcessOptions(options);
    } else {
      setSubProcessOptions([]);
    }
  }, [selectedProcessId, process]);

  const processOptions = process?.map(({ id, process_name }) => ({
    value: id,
    label: process_name,
  }));

  const riskCategoryOptions = riskCategory?.map(({ risk_category }) => ({
    value: risk_category,
    label: risk_category,
  }));

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
      optionalPayLoad={optionalPayLoad}
      isNext={false}>
      <BaseInputField
        id={"name" as import("react-hook-form").Path<TData>}
        label="Risk Name"
        register={methods.register}
        error={methods.formState.errors}
      />
      <section className="flex items-center gap-2">
        <BaseSelectField
          className="flex-1"
          id={"process" as import("react-hook-form").Path<TData>}
          label="Process"
          options={processOptions ?? []}
          setValue={methods.setValue}
          error={methods.formState.errors}
          open={openSelect === "process"}
          onOpenChange={() => handleToggle("process")}
          placeholder="Choose one"
          onChange={(value) => {
            setSelectedProcessId(value);
            methods.setValue(
              "process" as import("react-hook-form").Path<TData>,
              value as import("react-hook-form").PathValue<TData, Path<TData>>
            );
            methods.setValue(
              "sub_process" as import("react-hook-form").Path<TData>,
              "" as import("react-hook-form").PathValue<TData, Path<TData>>
            );
          }}
        />
        <BaseSelectField
          className="flex-1"
          id={"sub_process" as import("react-hook-form").Path<TData>}
          label="Sub Process"
          options={subProcessOptions ?? []}
          setValue={methods.setValue}
          error={methods.formState.errors}
          placeholder="Choose one"
          open={openSelect === "sub_process"}
          onOpenChange={() => handleToggle("sub_process")}
          onChange={(value) => {
            methods.setValue(
              "sub_process" as import("react-hook-form").Path<TData>,
              value as import("react-hook-form").PathValue<TData, Path<TData>>
            );
          }}
        />
      </section>
      <BaseTextAreaField
        id={"description" as import("react-hook-form").Path<TData>}
        label="Description"
        register={methods.register}
        error={methods.formState.errors}
      />
      <section className="flex items-center gap-2">
        <BaseSelectField
          className="flex-1"
          id={"department" as import("react-hook-form").Path<TData>}
          label="Department"
          options={departments}
          setValue={methods.setValue}
          error={methods.formState.errors}
          open={openSelect === "department"}
          onOpenChange={() => handleToggle("department")}
          placeholder="Choose one"
          onChange={(value) => console.log(value)}
        />
        <BaseSelectField
          className="flex-1"
          id={"category" as import("react-hook-form").Path<TData>}
          label="Category"
          options={riskCategoryOptions ?? []}
          setValue={methods.setValue}
          open={openSelect === "category"}
          onOpenChange={() => handleToggle("category")}
          error={methods.formState.errors}
          placeholder="Choose one"
          onChange={(value) => console.log(value)}
        />
      </section>
    </BaseForm>
  );
};
