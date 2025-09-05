import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CircleMinus, CirclePlus } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

interface RiskInputItemProps {
  count: number;
  increment: Dispatch<SetStateAction<number>>;
  decrement: Dispatch<SetStateAction<number>>;
  label?: string;
}

const RiskInputItem = ({
  count,
  increment,
  decrement,
  label,
}: RiskInputItemProps) => {
  return (
    <section className="flex flex-col items-start gap-1 p-3 bg-secondary rounded-md drop-shadow-[4px_4px_3px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(0,0,0,0.2)]">
      <section>
        <Button
          size="icon"
          className="cursor-pointer"
          onClick={() => {
            if (count === 10) return;
            increment((prev) => prev + 1);
          }}>
          <CirclePlus size={16} />
        </Button>
      </section>
      <section className="flex items-center gap-2">
        <section className="h-9 w-9 flex bg-neutral-400 rounded-md items-center justify-center font-extrabold text-sm">
          {count}
        </section>
        <Label>{label}</Label>
      </section>

      <section>
        <Button
          size="icon"
          className="cursor-pointer"
          onClick={() => {
            if (count === 0) return;
            decrement((prev) => prev - 1);
          }}>
          <CircleMinus size={16} />
        </Button>
      </section>
    </section>
  );
};

interface RiskRatingInputProps {
  title?: string;
  impact?: number;
  setImpact: Dispatch<SetStateAction<number>>;
  likelihood: number;
  setLikelihood: Dispatch<SetStateAction<number>>;
}

export const RiskRatingInput = ({
  title = "Provide Rating Levels",
  impact = 0,
  setImpact,
  likelihood = 0,
  setLikelihood,
}: RiskRatingInputProps) => {
  return (
    <section className="flex-1 bg-secondary rounded-md p-3 flex h-fit flex-col gap-2">
      <Label className="ml-1 font-medium text-base pb-2">{title}</Label>
      <section className="flex-col gap-2 flex">
        <RiskInputItem
          count={impact}
          label="Impact Level"
          increment={setImpact}
          decrement={setImpact}
        />
        <RiskInputItem
          count={likelihood}
          label="Likelihood Level"
          decrement={setLikelihood}
          increment={setLikelihood}
        />
        <section className="p-3 bg-secondary rounded-md drop-shadow-[4px_4px_3px_rgba(0,0,0,0.2),-4px_-4px_8px_rgba(0,0,0,0.2)]">
          <section className="flex items-center gap-2">
            <section className="h-9 w-9 flex bg-neutral-400 rounded-md  items-center justify-center text-sm font-extrabold">
              {impact * likelihood}
            </section>
            <Label>{title}</Label>
          </section>
        </section>
      </section>
    </section>
  );
};
