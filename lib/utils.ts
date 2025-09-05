import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function ThresholdLevel (value: number){

  if(value < 10){
    return "Low"
  }
  if(value > 10 || value < 15){
    return "Medium"
  }
  if(value > 15 || value < 20){
    return "High"
  }
  return "Unknow"

}

export function jsonToFormData(data?: Record<string, unknown>): FormData {
    const formData = new FormData();

    Object.entries(data ?? {}).forEach(([key, value]) => {
        if (value === undefined || value === null) {
            return;
        }

        // Handle files
        if (value instanceof File || value instanceof Blob) {
            formData.append(key, value);
        }

        // Handle primitives
        else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            formData.append(key, value.toString());
        }

        // Fallback
        else {
            formData.append(key, String(value));
        }
    });

    return formData;
}

