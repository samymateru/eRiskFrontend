"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormError } from "../shared/form-error";
import { FieldErrors, FieldValues, Path } from "react-hook-form";

interface BaseDatePickerProps<
  TData extends FieldValues,
  TError extends FieldErrors
> {
  id?: Path<TData>;
  label?: string;
  error?: TError;
  onDateChange?: (date?: Date) => void
}

export function BaseDatePicker<
  TData extends FieldValues,
  TError extends FieldErrors
>({ label, id, error, onDateChange }: BaseDatePickerProps<TData, TError>) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <Label htmlFor="date" className="px-1">
        {label}
      </Label>
      <Popover open={open} onOpenChange={setOpen} modal>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-full justify-between font-normal">
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            className="w-full"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setDate(date);
              onDateChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
      <section className="h-3">
        <FormError error={error ? error[id ?? ""] : undefined} />
      </section>
    </div>
  );
}
