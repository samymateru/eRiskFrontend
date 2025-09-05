"use client";
import { FieldValues, useForm, UseFormReturn, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseForm } from "@/components/forms/base-form";
import { APIRequestBuilder } from "@/components/forms/base-api-client";
import { BaseTextAreaField } from "@/components/inputs/base-textarea-field";
import { useState } from "react";
import {
  NewActivitySchema,
  NewActivityType,
} from "@/lib/schemas/activity-schemas";
import { activityTypes, category, frequency } from "@/lib/utils/constants";
import { BaseSelectField } from "@/components/select/base-select-field";

interface ActivityFormProps<TData extends FieldValues, TResponse> {
  onError?: (error: Error) => void;
  onSuccess?: (data: TResponse) => void;
  primaryButtonText?: string;
  methods: UseFormReturn<TData>;
  mutationFn: (data: TData) => Promise<TResponse>;
}

export const ActivityForm = <TData extends FieldValues, TResponse>({
  onError,
  onSuccess,
  primaryButtonText,
  methods,
  mutationFn,
}: ActivityFormProps<TData, TResponse>) => {
  const [openSelect, setOpenSelect] = useState<
    null | "category" | "type" | "frequency"
  >(null);

  const handleToggle = (select: "category" | "type" | "frequency") => {
    setOpenSelect((prev) => (prev === select ? null : select));
  };

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
      mutationFn={mutationFn}
      mutationKey={["createUser"]}
      handleSuccess={handleSuccess}
      handleError={handleError}
      isNext={false}>
      <BaseTextAreaField
        id={"title" as import("react-hook-form").Path<TData>}
        label="Activity Title"
        register={methods.register}
        error={methods.formState.errors}
      />

      <section className="flex items-center gap-2">
        <BaseSelectField
          className=""
          id={"category" as import("react-hook-form").Path<TData>}
          label="Category"
          options={category ?? []}
          setValue={methods.setValue}
          error={methods.formState.errors}
          open={openSelect === "category"}
          onOpenChange={() => handleToggle("category")}
          placeholder="Choose one"
          onChange={(value) => {
            console.log(value);
            methods.setValue(
              "category" as import("react-hook-form").Path<TData>,
              value as import("react-hook-form").PathValue<TData, Path<TData>>
            );
          }}
        />
        <BaseSelectField
          className="w-full"
          id={"type" as import("react-hook-form").Path<TData>}
          label="Type"
          options={activityTypes ?? []}
          setValue={methods.setValue}
          error={methods.formState.errors}
          placeholder="Choose one"
          open={openSelect === "type"}
          onOpenChange={() => handleToggle("type")}
          onChange={(value) => {
            methods.setValue(
              "type" as import("react-hook-form").Path<TData>,
              value as import("react-hook-form").PathValue<TData, Path<TData>>
            );
          }}
        />
      </section>

      <section className="flex items-center gap-2">
        <BaseSelectField
          className="flex-1"
          id={"frequency" as import("react-hook-form").Path<TData>}
          label="Frequency"
          options={frequency}
          setValue={methods.setValue}
          error={methods.formState.errors}
          open={openSelect === "frequency"}
          onOpenChange={() => handleToggle("frequency")}
          placeholder="Choose one"
          onChange={(value) => console.log(value)}
        />
      </section>
    </BaseForm>
  );
};

export const Tester = () => {
  const methods = useForm<NewActivityType>({
    resolver: zodResolver(NewActivitySchema),
    defaultValues: {
      frequency: "",
      type: "",
      category: "",
    },
  });

  const mutationFn = async (data: NewActivityType) => {
    return APIRequestBuilder.to<NewActivityType, string>("/activities/120")
      .withMethod("POST")
      .withToken()
      .withBody(data)
      .fetch();
  };

  return <ActivityForm methods={methods} mutationFn={mutationFn} />;
};
