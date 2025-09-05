import { Home } from "lucide-react";
import { Button } from "../ui/button";
import { MouseEventHandler, ReactNode } from "react";

interface BaseActionItemProps {
  icon?: ReactNode;
  text?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const BaseActionItem = ({
  icon = <Home size={16} />,
  text = "Placeholder",
  onClick,
}: BaseActionItemProps) => {
  return (
    <Button
      onClick={onClick}
      className="rounded-none font-normal hover:font-normal shadow-none bg-secondary text-sm hover:bg-primary hover:text-primary-foreground cursor-pointer h-8 text-neutral-800 w-full flex items-center justify-start gap-3">
      {icon}
      {text}
    </Button>
  );
};
