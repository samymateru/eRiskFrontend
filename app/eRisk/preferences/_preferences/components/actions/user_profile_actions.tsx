import {ReactNode} from "react";
import { BaseActions } from "@/components/shared/base-actions";
import { BaseActionItem } from "@/components/shared/base-action-item";
import {
    Edit, ImageIcon,
    LockIcon,
    TrashIcon
} from "lucide-react";


interface UserProfileActionsProps{
    children: ReactNode
}

export const UserProfileActions = ({children}: UserProfileActionsProps) => {
    return(
        <BaseActions
            trigger={children}
            side="bottom"
            sideOffset="-10"
            text="Profile Actions">
            <BaseActionItem icon={<Edit size={16} />} text="Edit Profile" />
            <BaseActionItem icon={<LockIcon size={16}/>} text="Change Password" />
            <BaseActionItem icon={<ImageIcon size={16} />} text="Change Photo" />
            <BaseActionItem icon={<TrashIcon size={16} />} text="Exit Module" />
        </BaseActions>
    )
}