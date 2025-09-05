import { Badge } from "@/components/ui/badge";

export const badgeColors = {
  High: "bg-red-600",
  Medium: "bg-yellow-600",
  Low: "bg-green-600",
  Unknow: "bg-black",
};

interface StatusBadgeProps {
  title: keyof typeof badgeColors;
}
export default function StatusBadge({ title }: StatusBadgeProps) {
  return (
    <Badge variant="outline" className="gap-1.5">
      <span
        className={`size-2.5 rounded-full ${badgeColors[title]}`}
        aria-hidden="true"></span>
      {title}
    </Badge>
  );
}
