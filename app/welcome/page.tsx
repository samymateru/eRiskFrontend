"use client";
import { RingLoader } from "react-spinners";
import { Label } from "@/components/ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchWelcomeToken } from "@/lib/api/splash_api";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { SplashResponse } from "@/lib/schemas/splash_schema";

export default function SplashPage() {
  const params = useSearchParams();
  const router = useRouter();
  const { data } = useFetchWelcomeToken(params.get("session_code"));

  useEffect(() => {
    if (data) {
      router.push("eRisk");
      try {
        const decoded = jwtDecode<SplashResponse>(data.token ?? "");
        if (typeof window !== undefined) {
          if (data.token) localStorage.setItem("token", data.token);

          localStorage.setItem("user_id", decoded.user_id ?? "");
          localStorage.setItem("module_id", decoded.module_id ?? "");
          localStorage.setItem(
            "organization_id",
            decoded.organization_id ?? ""
          );
          localStorage.setItem("entity_id", decoded.entity_id ?? "");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [data, router]);

  return (
    <section className="bg-gradient-to-br from-neutral-100 via-primary to-black h-svh overflow-hidden flex justify-center items-center">
      <section className="w-[300px] h-[250px] bg-neutral-200 rounded-lg flex flex-col px-2 py-4">
        <section
          id="logo"
          className="flex justify-center items-center flex-col">
          <Label className="font-extrabold text-[30px] text-center text-primary">
            eRiskNext
          </Label>
          <Label className="font-medium font-serif text-xs">V.0.0.1</Label>
        </section>
        <section className="flex-1 flex flex-col gap-2.5 items-center justify-center">
          <section id="loader">
            <RingLoader
              color={"oklch(37.831% 0.13457 289.319)"}
              loading={true}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </section>
          <section id="text">
            <Label className="font-medium text-sm font-serif">
              Loading Module...
            </Label>
          </section>
        </section>
      </section>
    </section>
  );
}
