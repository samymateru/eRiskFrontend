import {Button} from "@/components/ui/button";

interface CellProps{
    value?: number;
    label?: string;
    width?: number
    height?: number,
    onClick?: (data?: number) => void,
    largeText?: boolean,
    isSelected?: boolean
}

export const Cell = ({
    value,
    label,
    width = 45,
    height = 45,
    onClick,
    largeText = false,
    isSelected = false,
}: CellProps) => {

    return(
        <Button type={"button"}
            onClick={() => onClick?.(value) }
            style={{
            width: width,
            height: height
            }}
            variant={"outline"}
            className={`border border-neutral-400 font-normal 
                  ${largeText ? "text-sm" : "text-xs"} 
                  ${isSelected ? "bg-blue-300" : "hover:bg-blue-200"} 
                  transition duration-200`}>
            {label}
        </Button>
    )
}
