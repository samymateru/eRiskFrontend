"use client";
import {FieldValues, Path, UseFormReturn, UseFormSetValue} from "react-hook-form";
import {BaseForm} from "@/components/forms/base-form";
import {BaseInputField} from "@/components/inputs/base-input-field";
import {BaseSelectField} from "@/components/select/base-select-field";
import {frequency, kriTypes} from "@/lib/utils/constants";
import {BaseTextAreaField} from "@/components/inputs/base-textarea-field";
import {KRISetter} from "../components/kri-threshold-setter";
import {useEffect, useState} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {BaseDatePicker} from "@/components/datepickers/base_datepicker";

interface KRIFormFormProps<TData extends FieldValues, TPayload, TResponse> {
    optionalPayLoad?: TPayload;
    onError?: (error: Error) => void;
    onSuccess?: (data: TResponse) => void;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    methods: UseFormReturn<TData>;
    mutationFn: (data: TData) => Promise<TResponse>;
}

export const KRIForm = <TData extends FieldValues, TPayload, TResponse>({
                                                                            onError,
                                                                            onSuccess,
                                                                            primaryButtonText,
                                                                            secondaryButtonText,
                                                                            methods,
                                                                            mutationFn,
                                                                        }: KRIFormFormProps<TData, TPayload, TResponse>) => {
    const [low, setLow] = useState("equals");
    const [medium, setMedium] = useState("equals");
    const [high, setHigh] = useState("equals");
    const [very_high, setVeryHigh] = useState("equals");

    const handleSuccess = (data: TResponse) => {
        onSuccess?.(data);
    };

    const handleError = (error: Error) => {
        onError?.(error);
    };

    const handleSkip = () => {
        alert("Skipped the form!");
    };

    const type = methods.watch(
        "type" as import("react-hook-form").PathValue<TData, Path<TData>>
    );

    console.log(methods.formState.errors);

    return (
        <BaseForm<TData, TResponse, unknown>
            methods={methods}
            primaryButtonText={primaryButtonText}
            secondaryButtonText={secondaryButtonText}
            mutationFn={mutationFn}
            mutationKey={["createUser"]}
            handleSuccess={handleSuccess}
            handleError={handleError}
            isNext={false}
            onSkip={handleSkip}>
            <section
                className={`flex  ${
                    type ===
                    ("Qualitative" as import("react-hook-form").PathValue<
                        TData,
                        Path<TData>
                    >)
                        ? "justify-center"
                        : "items-start"
                } gap-12 px-5`}>
                <section
                    id="left"
                    className={` ${
                        type ===
                        ("Qualitative" as import("react-hook-form").PathValue<
                            TData,
                            Path<TData>
                        >)
                            ? "w-[500px]"
                            : "flex-1/3"
                    }  flex flex-col gap-3`}>
                    <BaseInputField
                        id={"name" as import("react-hook-form").Path<TData>}
                        label="KRI Name"
                        register={methods.register}
                        error={methods.formState.errors}
                    />
                    <section className="flex items-center gap-2">
                        <BaseSelectField
                            className="flex-1"
                            id={"frequency" as import("react-hook-form").Path<TData>}
                            label="KRI Frequency"
                            options={frequency}
                            setValue={methods.setValue}
                            error={methods.formState.errors}
                            placeholder="Choose one"
                            onChange={(value) => console.log(value)}
                        />
                        <BaseSelectField
                            className="flex-1"
                            id={"type" as import("react-hook-form").Path<TData>}
                            defaultValue="Quantitative"
                            label="Type"
                            options={kriTypes}
                            setValue={methods.setValue}
                            error={methods.formState.errors}
                            placeholder="Choose one"
                            onChange={(value) => console.log(value)}
                        />
                    </section>

                    <BaseDatePicker label="Specified Date"/>

                    {type ===
                    ("Qualitative" as import("react-hook-form").PathValue<
                        TData,
                        Path<TData>
                    >) ? (
                        <section>
                            <BaseTextAreaField
                                id={"description" as import("react-hook-form").Path<TData>}
                                label="Description"
                                register={methods.register}
                                error={methods.formState.errors}
                            />
                        </section>
                    ) : null}
                    {type ===
                    ("Quantitative" as import("react-hook-form").PathValue<
                        TData,
                        Path<TData>
                    >) ? (
                        <section>
                            <BaseTextAreaField
                                id={"description" as import("react-hook-form").Path<TData>}
                                label="Quantity Description"
                                placeholder="Provide description of N"
                                register={methods.register}
                                error={methods.formState.errors}
                            />
                        </section>
                    ) : null}
                </section>
                {type ===
                ("Qualitative" as import("react-hook-form").PathValue<
                    TData,
                    Path<TData>
                >) ? null : (
                    <section className="flex-1/4 flex flex-col gap-4">
                        <section>
                            <Label className="font-semibold text-[18px] mt-2">
                                KRI Thresholds
                            </Label>
                        </section>
                        <section id="right" className="w-full flex flex-col gap-3 pl-1">
                            <Threshold setValue={methods.setValue} id={"low" as import("react-hook-form").Path<TData>}
                                       label="Low" threshold={low} setThreshold={setLow}/>
                            <Threshold
                                id={"medium" as import("react-hook-form").Path<TData>}
                                setValue={methods.setValue}
                                label="Medium"
                                threshold={medium}
                                setThreshold={setMedium}
                            />
                            <Threshold setValue={methods.setValue} id={"high" as import("react-hook-form").Path<TData>}
                                       label="High" threshold={high} setThreshold={setHigh}/>
                            <Threshold
                                id={"very_high" as import("react-hook-form").Path<TData>}
                                setValue={methods.setValue}
                                label="Very High"
                                threshold={very_high}
                                setThreshold={setVeryHigh}
                            />
                        </section>
                    </section>
                )}
            </section>
        </BaseForm>
    );
};

interface ThresholdProps<T extends FieldValues> {
    id: Path<T>;
    threshold: string;
    setThreshold: (threshold: string) => void;
    label: string;
    setValue: UseFormSetValue<T>;
}

const Threshold = <T extends FieldValues>({threshold, setThreshold, label, setValue, id}: ThresholdProps<T>) => {
    const [min, setMin] = useState<number>(0)
    const [max, setMax] = useState<number>(0)
    const [value_, setValue_] = useState<number>(0)

    console.log(threshold)
    useEffect(() => {
        if (threshold === "between_inclusive") {
            setValue(id, `${min}<=N>=${max}` as import("react-hook-form").PathValue<T, typeof id>, {
                shouldValidate: true,
            });
        } else if (threshold === "between_exclusive") {
            setValue(id, `${min}${'<'}N${'>'}${max}` as import("react-hook-form").PathValue<T, typeof id>, {
                shouldValidate: true,
            })
        } else if (threshold === "equals") {
            setValue(id, `N=${value_}` as import("react-hook-form").PathValue<T, typeof id>, {
                shouldValidate: true,
            })
        } else if (threshold === "greater_than") {
            setValue(id, `N>${value_}` as import("react-hook-form").PathValue<T, typeof id>, {
                shouldValidate: true,
            })

        } else if (threshold === "less_than") {
            setValue(id, `N<${value_}` as import("react-hook-form").PathValue<T, typeof id>, {
                shouldValidate: true,
            })
        } else if (threshold === "greater_equal_to") {
            setValue(id, `N>=${value_}` as import("react-hook-form").PathValue<T, typeof id>, {
                shouldValidate: true,
            })
        } else if (threshold === "less_than_eqal") {
            setValue(id, `N<=${value_}` as import("react-hook-form").PathValue<T, typeof id>, {
                shouldValidate: true,
            })

        }

    }, [min, max, value_, threshold, setValue, id])

    return (
        <section className="flex flex-col">
            <section className="flex items-center gap-1">
                <span className="flex w-3 h-3 bg-black"></span>
                <Label className="text-[14px] mb-[2px]">{label}</Label>
            </section>
            <section className="flex items-center gap-5">
                <KRISetter value={threshold} onChange={setThreshold}/>
                {threshold === "between_inclusive" ||
                threshold === "between_exclusive" ? (
                    <section className="flex items-center gap-2">
                        <div className="group relative flex-1">
                            <label
                                className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50">
                                Min
                            </label>
                            <Input onChange={(e) => {
                                setMin(Number(e.target.value))
                            }} className="h-10"
                                   placeholder="Value of N"
                                   type="text"/>
                        </div>
                        <div className="group relative flex-1">
                            <label
                                className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50">
                                Max
                            </label>
                            <Input onChange={(e) => {
                                setMax(Number(e.target.value))
                            }} className="h-10" placeholder="Value of N" type="text"/>
                        </div>
                    </section>
                ) : (
                    <section>
                        <div className="group relative flex-1">
                            <label
                                className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50">
                                Value
                            </label>
                            <Input onChange={(e) => {
                                setValue_(Number(e.target.value))
                            }} className="h-10" placeholder="Value of N" type="text"/>
                        </div>
                    </section>
                )}
            </section>
        </section>
    );
};
