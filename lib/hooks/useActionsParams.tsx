"use client";

import {
    useRouter,
    useSearchParams
} from "next/navigation";
import {useCallback} from "react";

export function useActionParam(pathname: string = "/eRisk") {
    const searchParams = useSearchParams();
    const router = useRouter();

    return useCallback(
        (action: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set("action", action);
            router.push(`${pathname}?${params.toString()}`);
        },
        [router, searchParams, pathname]
    );
}


export function useSetSearchParams(pathname: string = "/eRisk") {
    const searchParams = useSearchParams();
    const router = useRouter();

    return useCallback(
        (paramsObj: Record<string, string>) => {
            const params = new URLSearchParams(searchParams.toString());
            Object.entries(paramsObj).forEach(([key, value]) => {
                params.set(key, value);
            });
            router.push(`${pathname}?${params.toString()}`);
        },
        [router, searchParams, pathname]
    );
}

