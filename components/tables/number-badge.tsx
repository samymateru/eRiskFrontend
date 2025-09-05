import { Badge } from "@/components/ui/badge";

interface NumberBadgeProps {
  count?: number;
}
export default function NumberBadge({ count = 0 }: NumberBadgeProps) {
  return <Badge className="w-5 h-5 rounded-full">{count}</Badge>;
}
