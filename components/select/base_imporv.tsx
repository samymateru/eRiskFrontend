"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";
import { FormError } from "../shared/form-error";
import {
  FieldErrors,
  FieldValues,
  Path,
  UseFormSetValue,
} from "react-hook-form";
import { ReactNode } from "react";

interface Option {
  label: string;
  value: string;
  icon?: ReactNode;
}

interface SelectInputFieldProps<
  T extends FieldValues,
  TError extends FieldErrors
> {
  id: Path<T>;
  label: string;
  options: Option[];
  value?: string;
  setValue: UseFormSetValue<T>;
  error?: TError;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export function BaseSelectField<
  T extends FieldValues,
  TError extends FieldErrors
>({
  id,
  label,
  options,
  setValue,
  error,
  value,
  placeholder = "Select an option",
  className = "",
  onChange,
}: SelectInputFieldProps<T, TError>) {
  const reactId = useId();
  const [open, setOpen] = useState(false);

  const selected = options.find((opt) => opt.value === value);
  console.log(value);

  return (
    <div className="flex-col flex w-full gap-2">
      <Label htmlFor={reactId}>{label}</Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={reactId}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between px-3 font-normal text-left",
              !value && "text-muted-foreground",
              className
            )}>
            <span className="truncate flex items-center gap-2">
              {selected?.icon}
              {selected?.label || placeholder}
            </span>
            <ChevronDownIcon
              size={16}
              className="text-muted-foreground/80 shrink-0"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          className="w-full p-0 min-w-[var(--radix-popper-anchor-width)]">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={(value) => {
                      console.log("helo");
                      setValue(
                        id,
                        value as import("react-hook-form").PathValue<
                          T,
                          typeof id
                        >,
                        {
                          shouldValidate: true,
                        }
                      );
                      onChange?.(value);
                      setOpen(false);
                    }}
                    className="flex items-center gap-2">
                    {option.icon}
                    {option.label}
                    {value === option.value && (
                      <CheckIcon className="ml-auto" size={16} />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <FormError error={error ? error[id] : undefined} />
    </div>
  );
}
