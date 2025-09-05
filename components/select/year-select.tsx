import { useId } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function YearSelect() {
  const id = useId();
  const currentYear = new Date().getFullYear();

  // Example: Show years from 2015 → currentYear + 5
  const years = Array.from(
    { length: currentYear + 5 - 2015 + 1 },
    (_, i) => 2015 + i
  );

  return (
    <div className="*:not-first:mt-2">
      <Select defaultValue={currentYear.toString()}>
        <SelectTrigger id={id} className="w-[150px]">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem
              key={year}
              value={year.toString()}
              className={
                year === currentYear
                  ? "bg-primary text-primary-foreground font-semibold"
                  : ""
              }>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
