"use client";
import SearchInput from "@/components/inputs/search-input";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    Funnel,
    Menu, MessageCircleMore,
    Shield, ShieldAlert
} from "lucide-react";
import { RegisterActions } from "./actions/risk_register_actions";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";

export const ResponsesHeader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("action", "risk_list");

    router.push(`?${params.toString()}`);
  };
  return (
    <section className="flex items-end justify-between px-2">
      {/* ------------------------------------------------- */}
      <section className="flex flex-col gap-1">
        <section>
          <Label className="font-semibold text-[15px]">
            All Responses Registered
          </Label>
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
      <section className="flex-1 flex items-center justify-between pl-5">
        <section id="view"></section>
        <section className="actions">
          <section className="flex items-center gap-2">
              <section className="bg-blue-200 px-2 py-1 flex items-center gap-1 rounded-lg">
                  <Button variant={"default"} className="h-7 w-[100px] font-normal">
                      <ShieldAlert size={16}/>
                      Risks
                  </Button>
                  <Button variant={"outline"} className="h-7 w-[100px]">
                      <MessageCircleMore size={16}/>
                      Controls
                  </Button>
                  <Button variant={"outline"} className="h-7 w-[120px] px-2">
                      <Calendar size={16}/>
                      KRIs
                  </Button>
              </section>
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
