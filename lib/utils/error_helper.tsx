"use client";
import {showToast} from "@/components/toast/base_toast";

type Body = {
    detail?: string;
};

export type ErrorHandlerSchema = {
    status?: number;
    body?: Body;
};

export const ErrorHandler = ({status, body}: ErrorHandlerSchema) => {
    if (status === 400) {
        showToast(body?.detail, "error");
    }
    if (status === 401) {
        if (typeof window !== "undefined") {
            showToast(body?.detail, "warning");
            setTimeout(() => {
                window.location.href = "/signin";
            }, 2000);
        }
    }
    if (status === 403) {
        showToast(body?.detail, "error");
        console.log(status);
    }
};


export const ErrorMessage = (error: unknown) => {
    if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        "body" in error
    ) {
        const err = error as { status: number; body?: { detail?: string } };
        ErrorHandler({
            status: err.status,
            body: {detail: err.body?.detail},
        });
    } else {
        showToast("Service Down", "error");
    }
}
