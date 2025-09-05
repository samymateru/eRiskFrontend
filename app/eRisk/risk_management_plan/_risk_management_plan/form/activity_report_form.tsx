"use client"
import {FieldValues, UseFormReturn} from "react-hook-form";
import {BaseForm} from "@/components/forms/base-form";
import {BaseTextAreaField} from "@/components/inputs/base-textarea-field";

interface ActivityReportFormProps<TData extends FieldValues, TResponse> {
    onError?: (error: Error) => void;
    onSuccess?: (data: TResponse) => void;
    primaryButtonText?: string;
    methods: UseFormReturn<TData>;
    mutationFn: (data: TData) => Promise<TResponse>;
}

export const ActivityReportForm = <TData extends FieldValues, TResponse>({
    methods,
    mutationFn,
    onSuccess,
    onError,
    primaryButtonText
    }: ActivityReportFormProps<TData, TResponse>) => {


    const handleSuccess = (data: TResponse) => {
        onSuccess?.(data);
    };

    const handleError = (error: Error) => {
        onError?.(error);
    };
    return(
        <BaseForm<TData, TResponse, unknown>
            methods={methods}
            primaryButtonText={primaryButtonText}
            mutationFn={mutationFn}
            mutationKey={["createUser"]}
            handleSuccess={handleSuccess}
            handleError={handleError}
            isNext={false}>
            <BaseTextAreaField
                id={"description" as import("react-hook-form").Path<TData>}
                label="Description"
                register={methods.register}
                error={methods.formState.errors}
            />
            <BaseTextAreaField
                id={"conclusion" as import("react-hook-form").Path<TData>}
                label="Conclusion"
                register={methods.register}
                error={methods.formState.errors}
            />
        </BaseForm>

    )
}