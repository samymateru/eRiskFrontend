import {BaseActions} from "@/components/shared/base-actions";
import {BaseActionItem} from "@/components/shared/base-action-item";
import {
    CircleCheck,
    Folder,
    Forward,
    Trash
} from "lucide-react";
import {ReactNode} from "react";
import {Row} from "@tanstack/table-core";
import {ReadRMPType} from "@/lib/schemas/rmp_schemas";

interface RMPTableActionsProps {
    children: ReactNode,
    row?: Row<ReadRMPType>
}

export const RMPTableActions = ({children, row}: RMPTableActionsProps) => {
    return(
        <BaseActions
            side="left"
            sideOffset="0"
            trigger={children}
            tooltip="Risk Register"
            text="Risk Register Actions">
            <section className="flex flex-col gap-1">
                {
                    row?.original.status !== "current" && (
                        <BaseActionItem icon={<Folder size={16} />} text="Set As Default" />
                    )
                }
                {
                    row?.original.status === "current" && (
                        <BaseActionItem icon={<Forward size={16} />} text="Roll Forward" />
                    )
                }
                {
                    row?.original.approver === null && (
                        <BaseActionItem icon={<CircleCheck size={16} />} text="Approve" />
                    )
                }
                {
                    row?.original.status !== "current" && (
                        <BaseActionItem icon={<Trash size={16} />} text="Remove RMP" />
                    )
                }
            </section>
        </BaseActions>
    )
}