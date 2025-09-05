"use client";

import { useEffect, useId, useState } from "react";
import { LoaderCircleIcon, MicIcon, SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

export default function SearchInput({ value, onChange }: SearchInputProps) {
  const id = useId();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setIsLoading(false);
  }, [value]);

  return (
    <div className="*:not-first:mt-2 w-full">
      <div className="relative w-full">
        <Input
          id={id}
          className="peer ps-9 pe-9 w-full bg-blue-200 text-neutral-700 rounded-full"
          placeholder="Search anything..."
          type="search"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
        <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
          {isLoading ? (
            <LoaderCircleIcon
              className="animate-spin"
              size={16}
              role="status"
              aria-label="Loading..."
            />
          ) : (
            <SearchIcon size={16} aria-hidden="true" />
          )}
        </div>
        <button
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Press to speak"
          type="submit">
          <MicIcon size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
