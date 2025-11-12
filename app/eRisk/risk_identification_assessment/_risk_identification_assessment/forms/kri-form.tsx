"use client";
import {FieldValues, Path, UseFormReturn} from "react-hook-form";
import {BaseForm} from "@/components/forms/base-form";
import {BaseInputField} from "@/components/inputs/base-input-field";
import {BaseSelectField} from "@/components/select/base-select-field";
import {frequencyOptions, kriTypes} from "@/lib/utils/constants";
import {BaseTextAreaField} from "@/components/inputs/base-textarea-field";
import {useState} from "react";
import {Label} from "@/components/ui/label";
import {MonthDateSelector} from "@/components/select/month_date_selector";
import {WeekDaySelector} from "@/components/select/week_day_selector";
import {Threshold} from "@/components/shared/threshold";
import {BaseDatePicker} from "@/components/datepickers/base_datepicker";
import {DateSelector} from "@/components/select/day_selector";

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
    const [next_reference, setNextReference] = useState<Date | undefined>(undefined);
    const [frequency_value, setFrequencyValue] = useState<number | undefined>(undefined)

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

    const frequency = methods.watch(
        "frequency" as import("react-hook-form").PathValue<TData, Path<TData>>
    );

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
            optionalPayLoad={{
                frequency_value: frequency_value,
                next_reference: next_reference
            }}
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
                    className={`transition-all duration-150 ease-in-out ${
                        type ===
                        ("Qualitative" as import("react-hook-form").PathValue<
                            TData,
                            Path<TData>
                        >)
                            ? "w-[600px]"
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
                            options={frequencyOptions}
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

                    {["Weekly", "Bi Weekly"].includes(String(frequency)) && (
                        <section className="flex flex-col gap-2 mb-1">
                            <Label>
                                Specify Week Day
                            </Label>
                            <WeekDaySelector onValueChange={(data) => setFrequencyValue(data)} />
                        </section>
                    )}

                    {["Monthly"].includes(String(frequency)) && (
                        <section className={"flex flex-col gap-2 mb-1"}>
                            <Label>
                                Specify Date
                            </Label>
                            <DateSelector onValueChange={(data) => setFrequencyValue(data)}/>
                        </section>
                    )}

                    {["Annually", "Semi Annually", "Quarterly"].includes(String(frequency)) && (
                        <section className={"flex flex-col gap-2 mb-1"}>
                            <Label>
                                Start Of The Year
                            </Label>
                            <MonthDateSelector onValueChange={(data) => setFrequencyValue(data)}/>
                        </section>
                    )}

                    {["Specific Date"].includes(String(frequency)) && (
                        <section className={"flex flex-col gap-2 mb-1"}>
                            <Label>
                                Specify Date
                            </Label>
                            <BaseDatePicker onDateChange={(date) => setNextReference(date)}/>
                        </section>
                    )}

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
                    <section className="flex-1/3 flex flex-col gap-4">
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

