import { Label } from "../ui/label";

interface KeyItemProps {
  color: string;
  value: string;
  level: string;
}

export const KeyItem = ({ color, value, level }: KeyItemProps) => {
  return (
    <section className="flex items-center gap-2">
      <section className="flex items-center gap-1">
        <span className={`w-[10px] h-[10px] ${color} rounded-full`}></span>
        <section>
          <Label className="text-xs font-bold">{value}</Label>
        </section>
      </section>
      <section>
        <Label className="text-xs">{level}</Label>
      </section>
    </section>
  );
};
