import {FieldValues, UseFormReturn} from "react-hook-form";
import {BaseForm} from "@/components/forms/base-form";
import {BaseInputField} from "@/components/inputs/base-input-field";
import {BaseTextAreaField} from "@/components/inputs/base-textarea-field";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {
    Dispatch,
    SetStateAction, useEffect,
    useState
} from "react";
import {thresholdColors} from "@/lib/utils/constants";
import {useFetchKRI} from "@/lib/api/risk_kri_api";
import {safeEval} from "@/lib/utils/ki_eval";
import {
    showToast
} from "@/components/toast/base_toast";


function atLeastTwoTrue(...conditions: boolean[]): boolean {
    return conditions.filter(Boolean).length >= 2;
}


interface RiskKRIProfileFormProps <TData extends FieldValues, TPayload, TResponse>{
    onError?: (error: Error) => void;
    optionalPayLoad?: TPayload;
    onSuccess?: (data: TResponse) => void;
    primaryButtonText?: string;
    secondaryButtonText?: string;
    methods: UseFormReturn<TData>;
    mutationFn: (data: TData) => Promise<TResponse>;
    mode?: "update" | "create";
    type?: string
    kriId?: string
}

export const RiskKRIProfileForm = <TData extends FieldValues, TPayload, TResponse>(
    {
      onSuccess,
      onError,
      primaryButtonText,
      secondaryButtonText,
      methods,
      mutationFn,
      type = "Qualitative",
      kriId
    }: RiskKRIProfileFormProps<TData, TPayload, TResponse>) => {

    const {data: kri}  = useFetchKRI(kriId)

    const [rating, setRating] = useState<"Low" | "Medium" | "High" | "Very High" | undefined>(undefined);

    const handleSuccess = (data: TResponse) => {
        onSuccess?.(data);
    };

    const handleError = (error: Error) => {
        onError?.(error);
    };

    const value = methods.watch("value" as import("react-hook-form").Path<TData>);

    const lowResult = safeEval(kri?.low ?? "", value);
    const mediumResult = safeEval(kri?.medium ?? "", value);
    const highResult = safeEval(kri?.high ?? "", value);
    const veryHighResult = safeEval(kri?.very_high ?? "", value);

    const result = atLeastTwoTrue(lowResult, mediumResult, highResult, veryHighResult);


    useEffect(() => {
        if (veryHighResult) {
            setRating("Very High");
        } else if (highResult) {
            setRating("High");
        } else if (mediumResult) {
            setRating("Medium");
        } else if (lowResult) {
            setRating("Low");
        } else {
            setRating(undefined); // Optional: clear rating if none match
        }
    }, [highResult, lowResult, mediumResult, veryHighResult]);


    useEffect(() => {
        if(result){
            showToast("Invalid", "error")
        }
    }, [result]);


    return(
        <BaseForm<TData, TResponse, unknown>
            methods={methods}
            primaryButtonText={primaryButtonText}
            secondaryButtonText={secondaryButtonText}
            mutationFn={mutationFn}
            showSubmit={rating !== undefined}
            mutationKey={["createUser"]}
            handleSuccess={handleSuccess}
            handleError={handleError}
            optionalPayLoad={{rating: rating}}
            isNext={false}>
            <BaseTextAreaField
                id={"remark" as import("react-hook-form").Path<TData>}
                label="Remarks"
                placeholder={"Provide brief remarks"}
                register={methods.register}
                error={methods.formState.errors}
            />
            {
                type === "Qualitative" && (
                    <section className={"flex flex-col gap-5"}>
                        <section className={"flex flex-col gap-2"}>
                            <section>
                                <Label>Risk Rating</Label>
                            </section>
                            {
                                rating ? (
                                    <section className={"flex items-center gap-2 "}>
                                        <span className={`flex w-8 h-8 ${thresholdColors[rating]?.color} rounded-lg`}/>
                                        <Label>{rating}</Label>
                                    </section>
                                ):
                                    (
                                        <section className={"flex items-center gap-2 "}>
                                            <Label className={"font-normal text-sm text-neutral-600"}>Pick risk rating below</Label>
                                        </section>
                                    )
                            }
                        </section>
                        <section className={"h-auto flex items-center gap-3"}>
                            <ThresholdItem onRatingChange={setRating} color={"bg-green-700"} bgColor={"bg-green-300"} title={"Low"}/>
                            <ThresholdItem onRatingChange={setRating} color={"bg-yellow-400"} bgColor={"bg-yellow-200"} title={"Medium"}/>
                            <ThresholdItem onRatingChange={setRating} color={"bg-amber-700"} bgColor={"bg-amber-200"} title={"High"}/>
                            <ThresholdItem onRatingChange={setRating} color={"bg-red-700"} bgColor={"bg-red-300"} title={"Very High"}/>
                        </section>
                    </section>

                )
            }
            {
                type === "Quantitative" && (
                    <section className={"flex flex-col gap-4"}>
                        <BaseInputField
                            id={"value" as import("react-hook-form").Path<TData>}
                            label="Actual Value"
                            register={methods.register}
                            error={methods.formState.errors}

                        />
                        <section className={"flex flex-col gap-2"}>
                            <section>
                                <Label>Risk Rating</Label>
                            </section>
                            <section className={"flex items-center gap-2 "}>
                                <span className={`flex w-7 h-7 ${thresholdColors[rating ?? "undefined"]?.color} rounded-lg`}/>
                                <Label>{rating}</Label>
                            </section>
                        </section>
                    </section>

                )
            }

        </BaseForm>
    )
}



interface ThresholdItemProps{
    color: string
    bgColor: string,
    title: "Low" | "Medium" | "High" | "Very High",
    onRatingChange?: Dispatch<SetStateAction<"Low" | "Medium" | "High" | "Very High" | undefined>>
}

const ThresholdItem = ({
    color,
    bgColor,
    title,
    onRatingChange
    }: ThresholdItemProps) => {


    return(
        <section onClick={() => onRatingChange?.(title)} role={"button"} tabIndex={0} className={`flex cursor-pointer flex-col ${bgColor} hover:scale-[105%] py-3 rounded-lg items-center gap-1 flex-1`}>
            <Button  type={"button"}  className={`${color} w-7 h-7 hover:${color}`}>
            </Button>
            <Label className={"font-normal cursor-pointer text-sm"}>{title}</Label>
        </section>
    )
}