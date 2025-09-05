import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Label} from "@/components/ui/label";
import {formatDate} from "@/lib/utils/datetime-formater";
import {Calendar, CircleCheck, Shield} from "lucide-react";
import {ReactNode} from "react";

interface UserDetails {
    isAction?: boolean;
    showLowerSection?: boolean;
    image?: string;
    name?: string;
    email?: string;
    status?: string;
    role?: string;
    date?: Date;
    action?: ReactNode;
    cursor?: boolean
}

export const UserDetails = ({
    isAction = true,
    showLowerSection = true,
    name = "Samwel Materu",
    email = "samymateru1999@gmail.com",
    role = "Administrator",
    status = "Active",
    date = new Date(),
    image = "https://github.com/shadcn.png",
    cursor = false,
    action = (
        <section
            id="actions"
            className="flex justify-center items-center bg-green-600 p-[4px] rounded-full">
            <CircleCheck size={16} strokeWidth={2} className="text-white"/>
        </section>
    ),
    }: UserDetails) => {
    return (
        <section className="flex flex-col gap-1">
            <section
                id="upper-details"
                className="flex items-center justify-between h-11">
                <section className="flex gap-1.5 items-center">
                <section id="logo">
                <div className="relative h-10 w-10">
                    <Avatar className="w-full h-full">
                        <AvatarImage
                            src={image ?? "https://github.com/shadcn.png"}
                            alt="Kelly King"
                        />
                        <AvatarFallback className="text-neutral-500">
                            KK
                        </AvatarFallback>
                    </Avatar>
                <span className="absolute -end-0.5 -top-1">
                <span className="sr-only">Verified</span>
                {
                status === "Active" ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true">
                        <path
                            className="fill-emerald-500"
                            d="M4.674 8.954a3.602 3.602 0 0 1 4.301-4.293 3.6 3.6 0 0 1 6.064 0 3.598 3.598 0 0 1 4.3 4.302 3.6 3.6 0 0 1 0 6.067 3.6 3.6 0 0 1-4.29 4.302 3.6 3.6 0 0 1-6.074 0 3.598 3.598 0 0 1-4.3-4.293 3.6 3.6 0 0 1 0-6.085Z"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            className="fill-red-500"
                            d="M4.674 8.954a3.602 3.602 0 0 1 4.301-4.293 3.6 3.6 0 0 1 6.064 0 3.598 3.598 0 0 1 4.3 4.302 3.6 3.6 0 0 1 0 6.067 3.6 3.6 0 0 1-4.29 4.302 3.6 3.6 0 0 1-6.074 0 3.598 3.598 0 0 1-4.3-4.293 3.6 3.6 0 0 1 0-6.085Z"
                        />
                    </svg>
                )
                }
                </span>
                </div>
                </section>
                <section id="names" className="flex flex-col gap-1.5">
                    <Label className={`font-semibold text-[14px] leading-1.5 ${cursor ? "cursor-pointer" : ""}`}>
                            {name}
                    </Label>
                    <Label className={`font-normal ${ cursor ? "cursor-pointer" : ""}`}>{email}</Label>
                </section>
                </section>
                {isAction ? action : null}
            </section>
            {showLowerSection ? (
                <section
                    id="lower-detials"
                    className="flex items-center justify-between">
                    <section className="flex items-center gap-1">
                        <Shield size={16}/>
                        <Label className="font-medium text-xs">{role}</Label>
                    </section>
                    <section className="flex items-center gap-1">
                        <Calendar size={16}/>
                        <Label className="font-medium text-xs">{formatDate(date)}</Label>
                    </section>
                </section>
            ) : null}
        </section>
    );
};
