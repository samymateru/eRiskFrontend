import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormError } from "../shared/form-error";

import { Path } from "react-hook-form";

interface TextInputFieldProps<
  TRegister extends FieldValues,
  TError extends FieldErrors
> {
  id: Path<TRegister>;
  label: string;
  placeholder?: string;
  register: UseFormRegister<TRegister>;
  error?: TError;
  type?: React.HTMLInputTypeAttribute;
  className?: string;
}

export function BaseInputField<
  TRegister extends FieldValues,
  TError extends FieldErrors
>({
  label,
  placeholder,
  register,
  error,
  type = "text",
  id,
  className = "",
}: TextInputFieldProps<TRegister, TError>) {
  return (
    <div className="flex flex-col w-full">
      <section className="flex flex-col gap-2">
        <Label htmlFor={id} className="ml-[2px] font-helvetica-13">
          {label}
        </Label>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(id)}
          className={`font-helvetica-input-13 placeholder:font-helvetica-13 border-neutral-400 ${className}`}
        />
      </section>
      <section className="h-3">
        <FormError error={error ? error[id] : undefined} />
      </section>
    </div>
  );
}
