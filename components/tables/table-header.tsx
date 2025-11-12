import {ReactNode} from "react";

interface TableHeaderCellProps {
    children?: ReactNode;
    align?: "left" | "center" | "right";
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    className?: string;
}

export const TableHeaderCell = ({
    children,
    align = "left",
    leadingIcon,
    trailingIcon,
    className = "",
    }: TableHeaderCellProps) => {
    const alignmentClass =
        align === "center"
            ? "justify-center text-center"
            : align === "right"
                ? "justify-end text-right"
                : "justify-start text-left";
    return (
        <div
            className={`flex whitespace-break-spaces break-words items-start gap-1 ${alignmentClass} font-normal text-[14x] ${className}`}>
            {leadingIcon && <span>{leadingIcon}</span>}
            <span>{children}</span>
            {trailingIcon && <span>{trailingIcon}</span>}
        </div>
    );
};
