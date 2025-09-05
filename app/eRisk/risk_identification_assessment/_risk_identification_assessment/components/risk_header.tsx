"use client";
import SearchInput from "@/components/inputs/search-input";
import { Button } from "@/components/ui/button";
import { Funnel, Menu, MessageCircleMore } from "lucide-react";
import { RegisterActions } from "./actions/risk_register_actions";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";

export const RiskHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("action", "control_list");

    router.push(`?${params.toString()}`);
  };
  return (
    <section className="flex items-end justify-between px-2">
      {/* ------------------------------------------------- */}
      <section className="flex flex-col gap-1">
        <section>
          <Label className="font-semibold text-[15px]">Approved Risks</Label>
        </section>
        <section className="flex items-center gap-2 w-[450px]">
          <section className="flex-1">
            <SearchInput />
          </section>
          <section>
            <Button>
              <Funnel />
            </Button>
          </section>
        </section>
      </section>

      {/* ------------------------------------------------------- */}
      <section className="flex-1 flex items-center justify-between">
        <section id="view"></section>
        <section className="actions">
          <section className="flex items-center gap-2">
            <Button onClick={handleClick} className="border-neutral-400 border rounded-full">
              <MessageCircleMore size={16} />
              Responses
            </Button>
            <RegisterActions>
              <Button>
                <Menu size={16} />
              </Button>
            </RegisterActions>
          </section>
        </section>
      </section>
    </section>
  );
};
