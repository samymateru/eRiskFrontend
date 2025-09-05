import {ReactNode} from "react";
import {BaseActions} from "@/components/shared/base-actions";
import {BaseActionItem} from "@/components/shared/base-action-item";
import {Edit, Shield, TrashIcon} from "lucide-react";

interface UserTableActionsProps{
    children: ReactNode
}
export const UserTableActions = ({children}:UserTableActionsProps) => {
    return (
        <BaseActions
            trigger={children}
            side="right"
            sideOffset="100"
            text="User Actions">
            <BaseActionItem icon={<Edit size={16} />} text="Edit User" />
            <BaseActionItem icon={<Shield size={16} />} text="Set Role" />
            <BaseActionItem icon={<TrashIcon size={16} />} text="Remove User" />
        </BaseActions>
    )
}