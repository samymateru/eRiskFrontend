"use client";
import { ReactNode, useEffect } from "react";
import {
  FieldValues,
  FormProvider,
  Path,
  PathValue,
  UseFormReturn,
} from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { FastForward, SendHorizonal } from "lucide-react";

interface BaseFormProps<TData extends FieldValues, TResponse, TPayload> {
  methods: UseFormReturn<TData>;
  children: ReactNode;
  mutationFn: (data: TData) => Promise<TResponse>;
  mutationKey: string[];
  invalidate?: string[];
  handleError?: (error: Error) => void;
  handleSuccess?: (data: TResponse) => void;
  onSkip?: () => void;
  isNext?: boolean;
  optionalPayLoad?: TPayload;
  primaryButtonText?: string;
  secondaryButtonText?: string;
}

export const BaseForm = <TData extends FieldValues, TResponse, TPayload>({
  children,
  methods,
  mutationFn,
  mutationKey,
  invalidate = ["risks"],
  handleError,
  handleSuccess,
  onSkip,
  isNext = true,
  optionalPayLoad,
  primaryButtonText = "Submit",
  secondaryButtonText = "Next",
}: BaseFormProps<TData, TResponse, TPayload>) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: mutationKey,
    mutationFn: mutationFn,
  });

  useEffect(() => {
    if (optionalPayLoad) {
      Object.entries(optionalPayLoad).forEach(([key, value]) => {
        const typedKey = key as Path<TData>;
        methods.setValue(typedKey, value as PathValue<TData, typeof typedKey>);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionalPayLoad]);

  const onSubmit = (data: TData) => {
    const payload = { ...data, ...optionalPayLoad };
    mutate(payload, {
      onSuccess: (data) => {
        if (!invalidate)
          queryClient.invalidateQueries({ queryKey: invalidate });
        handleSuccess?.(data);
      },
      onError: (error) => {
        handleError?.(error);
      },
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-8">
        <section className="flex flex-col w-full gap-4 px-1">
          {children}
        </section>
        <section className="flex items-center justify-end gap-4">
          {isNext ? (
            <section className="w-[250px]">
              <Button
                onClick={onSkip}
                className="w-full bg-secondary text-secondary-foreground border-2 border-neutral-400 rounded-full hover:bg-neutral-300 transition-all cursor-pointer duration-300">
                <FastForward size={16} />
                {secondaryButtonText}
              </Button>
            </section>
          ) : null}
          <section className="w-[250px]">
            <Button
              type="submit"
              // onClick={() => handleSuccess?.("")}
              disabled={isPending}
              className="w-full rounded-full cursor-pointer">
              <SendHorizonal size={16} />
              {isPending ? "Submitting..." : primaryButtonText}
            </Button>
          </section>
        </section>
      </form>
    </FormProvider>
  );
};
