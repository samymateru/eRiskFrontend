import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { FormError } from "../shared/form-error";
import { Path } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface BaseTextAreaFieldProps<
  TRegister extends FieldValues,
  TError extends FieldErrors
> {
  id: Path<TRegister>;
  label: string;
  placeholder?: string;
  register: UseFormRegister<TRegister>;
  error?: TError;
  className?: string;
}

export function BaseTextAreaField<
  TRegister extends FieldValues,
  TError extends FieldErrors
>({
  label,
  placeholder,
  register,
  error,
  id,
  className = "",
}: BaseTextAreaFieldProps<TRegister, TError>) {
  return (
    <div className="flex-col flex">
      <section className="flex-col flex gap-2">
        <Label htmlFor={id} className="ml-[2px] font-helvetica-13">
          {label}
        </Label>
        <Textarea
          id={id}
          placeholder={placeholder}
          {...register(id)}
          className={`font-helvetica-input-13 border-neutral-400 placeholder:font-helvetica-13 ${className}`}
        />
      </section>
      <section className="h-3">
        <FormError error={error ? error[id] : undefined} />
      </section>
    </div>
  );
}
