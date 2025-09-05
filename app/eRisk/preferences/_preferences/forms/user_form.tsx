import { BaseForm } from "@/components/forms/base-form";
import { BaseInputField } from "@/components/inputs/base-input-field";
import { BaseSelectField } from "@/components/select/base-select-field";
import { useState } from "react";
import {FieldValues, UseFormReturn } from "react-hook-form";
import {
    user_roles,
    user_type
} from "@/lib/utils/constants";
interface UserFormProps<TData extends FieldValues, TResponse, TPayload> {
  optionalPayLoad?: TPayload;
  onError?: (error: Error) => void;
  onSuccess?: (data: TResponse) => void;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  methods: UseFormReturn<TData>;
  mutationFn: (data: TData) => Promise<TResponse>;
  mode?: "update" | "create";
}
export const UserForm = <TData extends FieldValues, TResponse, TPayload>({
  optionalPayLoad,
  onError,
  onSuccess,
  primaryButtonText,
  secondaryButtonText,
  methods,
  mutationFn,
}: UserFormProps<TData, TResponse, TPayload>) => {
  const [openSelect, setOpenSelect] = useState<null | "role" | "type">(null);

  
  const handleSuccess = (data: TResponse) => {
    onSuccess?.(data);
  };

  const handleError = (error: Error) => {
    onError?.(error);
  };

  const handleToggle = (select: "role" | "type") => {
    setOpenSelect((prev) => (prev === select ? null : select));
  };

  return (
    <section>
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
          label="Full Name"
          register={methods.register}
          error={methods.formState.errors}
        />
        <BaseInputField
          id={"email" as import("react-hook-form").Path<TData>}
          label="Email"
          register={methods.register}
          error={methods.formState.errors}
        />
        <BaseSelectField
          className="flex-1"
          id={"role" as import("react-hook-form").Path<TData>}
          label="Role"
          options={user_roles}
          setValue={methods.setValue}
          error={methods.formState.errors}
          open={openSelect === "role"}
          onOpenChange={() => handleToggle("role")}
          placeholder="Choose one"
          onChange={(value) => console.log(value)}
        />
        <BaseSelectField
          className="flex-1"
          id={"type" as import("react-hook-form").Path<TData>}
          label="Type"
          options={user_type}
          setValue={methods.setValue}
          error={methods.formState.errors}
          open={openSelect === "type"}
          onOpenChange={() => handleToggle("type")}
          placeholder="Choose one"
          onChange={(value) => console.log(value)}
        />

      </BaseForm>
    </section>
  );
};
