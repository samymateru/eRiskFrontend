import {
    FieldValues,
    Path,
    UseFormSetValue
} from "react-hook-form";
import {useEffect, useState} from "react";
import { Label } from "../ui/label";
import {KRISetter} from "@/app/eRisk/risk_identification_assessment/_risk_identification_assessment/components/kri-threshold-setter";
import { Input } from "../ui/input";

interface ThresholdProps<T extends FieldValues> {
    id: Path<T>;
    threshold: string;
    setThreshold: (threshold: string) => void;
    label: string;
    setValue: UseFormSetValue<T>;
}

export const Threshold = <T extends FieldValues>({threshold, setThreshold, label, setValue, id}: ThresholdProps<T>) => {
    const [min, setMin] = useState<number>(0)
    const [max, setMax] = useState<number>(0)
    const [value_, setValue_] = useState<number>(0)


    useEffect(() => {
        if (threshold === "between_inclusive") {
            setValue(id, `${min}<=N<=${max}` as import("react-hook-form").PathValue<T, typeof id>, {
                shouldValidate: true,
            });
        } else if (threshold === "between_exclusive") {
            setValue(id, `${min}<N<${max}` as import("react-hook-form").PathValue<T, typeof id>, {
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
                <span
                    className={`flex w-3 h-3 rounded-full ${
                        id === "low" ? "bg-green-500" :
                            id === "medium" ? "bg-yellow-500" :
                                id === "high" ? "bg-amber-500" :
                                    id === "very_high" ? "bg-red-500" : "bg-black"
                    }`}
                ></span>
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
                                   type="number"/>
                        </div>
                        <div className="group relative flex-1">
                            <label
                                className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50">
                                Max
                            </label>
                            <Input onChange={(e) => {
                                setMax(Number(e.target.value))
                            }} className="h-10" placeholder="Value of N" type="number"/>
                        </div>
                    </section>
                ) : (
                    <section>
                        <div className="group relative flex-1">
                            <label
                                className="bg-background text-foreground absolute start-1 top-0 z-10 block -translate-y-1/2 px-2 text-xs font-medium group-has-disabled:opacity-50">
                                Value
                            </label>
                            <Input
                                onChange={(e) => {
                                    setValue_(Number(e.target.value))
                                }}
                                className="h-10"
                                placeholder="Value of N"
                                type="number"
                            />
                        </div>
                    </section>
                )}
            </section>
        </section>
    );
};
