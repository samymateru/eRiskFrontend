// SearchInput.tsx
import { forwardRef, useId } from "react";
import { MicIcon, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

const RefSearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange }, ref) => {
    const id = useId();

    return (
      <div className="*:not-first:mt-2 w-full">
        <div className="relative w-full">
          <Input
            ref={ref}
            id={id}
            className="peer ps-9 pe-9 w-full bg-blue-200 text-neutral-700 rounded-full"
            placeholder="Search anything..."
            type="search"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground/80">
            <SearchIcon size={16} aria-hidden="true" />
          </div>
          <button
            type="button"
            className="absolute inset-y-0 end-0 flex w-9 items-center justify-center text-muted-foreground/80 hover:text-foreground"
            aria-label="Press to speak">
            <MicIcon size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }
);

RefSearchInput.displayName = "RefSearchInput";
export default RefSearchInput;
