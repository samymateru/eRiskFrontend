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


export function describeInequality(expression: string): string {
    const trimmed = expression.replace(/\s+/g, '');

    // Match single inequality expressions (e.g., N>100)
    const singleRegex = /^([A-Za-z]+)([<>=!]+)(-?\d+(?:\.\d+)?)$/;
    const singleMatch = trimmed.match(singleRegex);
    if (singleMatch) {
        const [, variable, operator, value] = singleMatch;
        switch (operator) {
            case '>':
                return `${variable} greater than ${value}`;
            case '>=':
                return `${variable} greater than or equal to ${value}`;
            case '<':
                return `${variable} less than ${value}`;
            case '<=':
                return `${variable} less than or equal to ${value}`;
            case '=':
                return `${variable} equal to ${value}`;
            case '!=':
                return `${variable} not equal to ${value}`;
        }
    }

    const pattern = /^(-?\d+(?:\.\d+)?)(<=?|>=?)[A-Za-z]+(<=?|>=?)(-?\d+(?:\.\d+)?)$/;
    const match = trimmed.match(pattern);

    if (match) {
        const [, lower, op1, op2, upper] = match;

        const lowerInclusive = op1.includes('=');
        const upperInclusive = op2.includes('=');

        const rangeDesc = `N From ${lower} to ${upper}`;
        const inclusivity = lowerInclusive && upperInclusive
            ? 'inclusive'
            : !lowerInclusive && !upperInclusive
                ? 'exclusive'
                : 'semi-inclusive';

        return `${rangeDesc} ${inclusivity}`;
    }

    return 'Unrecognized expression';
}


export function abbreviate(input: string): string {
    return input
        .split(/\s+/)              // Split by one or more spaces
        .map(word => word[0])      // Take the first letter of each word
        .join('')                  // Join them together
        .toUpperCase();            // Optional: convert to uppercase
}

export function getTimeRelativeToReferenceInMinutes(currentTime: Date | string, reference: Date | string): number {
    const current = currentTime instanceof Date ? currentTime : new Date(currentTime);
    const ref = reference instanceof Date ? reference : new Date(reference);

    const diffMs = ref.getTime() - current.getTime();
    const diffMinutes = diffMs / (1000 * 60);
    return Math.floor(diffMinutes);
}

export function formatTimeLeft(minutes: number, reverse: boolean = false): string {
    if (minutes < 0 && !reverse) {
        return "Overdue";
    }
    if(reverse){
        minutes = -minutes
    }

    const MINUTES_IN_DAY = 24 * 60;
    const MINUTES_IN_HOUR = 60;

    const days = Math.floor(minutes / MINUTES_IN_DAY);
    const hours = Math.floor((minutes % MINUTES_IN_DAY) / MINUTES_IN_HOUR);
    const mins = minutes % MINUTES_IN_HOUR;

    const parts: string[] = [];

    if (days > 0) {
        parts.push(`${days}d`);
    }

    if (hours > 0 || (days > 0 && mins > 0)) {
        parts.push(`${hours}hrs`);
    }

    if (mins > 0 && days === 0) {
        parts.push(`${mins}min`);
    }

    return parts.join(" ") + (reverse ? " pass" : " left");
}



export type ThresholdLevel = 'Low' | 'Medium' | 'High' | 'Very High';

export function isThresholdLevel(value: string): value is ThresholdLevel {
    return ['Low', 'Medium', 'High', 'Very High'].includes(value);
}


