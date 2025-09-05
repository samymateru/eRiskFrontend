"use client";

import { useEffect, useState } from "react";

export const useLocalStorage = (key: string) => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      const data = localStorage.getItem(key);

      setData(data);
    }
  }, [key]);

  return data;
};
