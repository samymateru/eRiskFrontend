import SearchInput from "@/components/inputs/search-input";
import { Button } from "@/components/ui/button";
import { Funnel, Menu } from "lucide-react";
import { RMPActions } from "./actions/rmp_actions";
import { Label } from "@/components/ui/label";

export const RmpHeader = () => {
  return (
    <section className="flex items-end justify-between px-2">
      {/* ------------------------------------------------- */}
      <section className="flex flex-col gap-1">
        <section>
          <Label className="font-semibold text-[15px]">
            All RMP Activities
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
      <section>
        <RMPActions>
          <Button>
            <Menu />
          </Button>
        </RMPActions>
      </section>
    </section>
  );
};
