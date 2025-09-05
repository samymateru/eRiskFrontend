import {Label} from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {FormError} from "../shared/form-error";
import {FieldErrors, FieldValues, UseFormSetValue} from "react-hook-form";

interface Option {
    label: string;
    value: string;
    icon?: ReactNode;
}

import {Path} from "react-hook-form";
import {ReactNode, useEffect, useMemo, useRef, useState} from "react";
// import SearchInput from "@/components/inputs/search-input";
import RefSearchInput from "./ref-select-field";

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
    defaultValue?: string;
    className?: string;
    onChange?: (value: string) => void;
    search?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
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
      defaultValue,
      className = "",
      search = false,
      onChange,
      open,
      onOpenChange,
  }: SelectInputFieldProps<T, TError>) {
    const [searchTerm, setSearchTerm] = useState("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const filteredOptions = useMemo(() => {
        if (!searchTerm) return options;
        return options.filter((option) =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, options]);

    useEffect(() => {
        if (open && search) {
            const timer = setTimeout(() => {
                if (inputRef === null || inputRef === undefined) return;
                inputRef.current?.focus();
            }, 10);

            return () => clearTimeout(timer);
        }
    }, [open, search, searchTerm]);

    return (
        <div className="flex-col flex w-full">
            <section className="flex-col flex gap-1.5 w-full">
                <Label htmlFor={id}>{label}</Label>
                <Select
                    open={open}
                    value={value}
                    onOpenChange={onOpenChange}
                    defaultValue={defaultValue}
                    onValueChange={(value: string) => {
                        setValue(
                            id,
                            value as import("react-hook-form").PathValue<T, typeof id>,
                            {
                                shouldValidate: true,
                            }
                        );
                        onChange?.(value);
                    }}>
                    <SelectTrigger
                        id={id}
                        className={`w-full border-neutral-400 [&>span_svg]:text-muted-foreground/80 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0 ${className}`}>
                        <SelectValue placeholder={placeholder}/>
                    </SelectTrigger>

                    <SelectContent
                        id={id}
                        className="bg-secondary w-full pt-2 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]>span>svg]:shrink-0">
                        <section>
                            {/* ---------------------------------------- */}
                            <section>
                                {search ? (
                                    <section className="px-2 pb-2">
                                        <RefSearchInput
                                            ref={inputRef}
                                            value={searchTerm}
                                            onChange={setSearchTerm}
                                        />
                                    </section>
                                ) : null}
                            </section>

                            {/* --------------------------------------------- */}
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map(({value, label, icon: Icon}) => (
                                    <SelectItem
                                        key={value}
                                        value={value}
                                        className="text-black data-[highlighted]:bg-blue-300 cursor-pointer focus:bg-transparent focus:outline-none data-[state=focused]:bg-transparent">
                                        {Icon}
                                        <span className="truncate">{label}</span>
                                    </SelectItem>
                                ))
                            ) : (
                                <p className="px-4 py-2 text-sm text-muted-foreground">
                                    No results found.
                                </p>
                            )}
                        </section>
                    </SelectContent>
                </Select>
            </section>
            <section className="h-3">
                <FormError error={error ? error[id] : undefined}/>
            </section>
        </div>
    );
}
