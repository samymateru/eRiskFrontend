"use client";
import { BaseActionItem } from "@/components/shared/base-action-item";
import { BaseActions } from "@/components/shared/base-actions";
import {
    Activity,
    ChartBar,
    Eye
} from "lucide-react";
import { ReactNode } from "react";

interface KRIReviewActionsProps {
    children: ReactNode;
    side?: "top" | "bottom" | "left" | "right";
    offset?: number
}

export const KRIReviewActions = ({ children, side = "left", offset = 90 }: KRIReviewActionsProps) => {
    return (
        <BaseActions trigger={children} side={side} offset={offset} text="KRI Actions">
            <BaseActionItem icon={<Eye size={16} />} text="KRI Listings" />
            <BaseActionItem icon={<ChartBar size={16} />} text="Reports" />
            <BaseActionItem icon={<Activity size={16} />} text="Profile" />
        </BaseActions>
    );
};