import {ReactNode, useState} from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {UserMultiSelector} from "@/components/select/user_multi-select";
import {Button} from "@/components/ui/button";
import {SendHorizonal} from "lucide-react";
import {APIRequestBuilder} from "@/components/forms/base-api-client";
import {NewActivityOwnersType} from "@/lib/schemas/activity-schemas";
import {UserType} from "@/lib/schemas/user";


const allUsers = [
    {
        name: "Samwel Materu",
        email: "samymateru@gmail.com",
        image: "https://github.com/shadcn.png",
    },
    {
        name: "Materu Samwel",
        email: "materu@gmail.com",
        image: "https://github.com/shadcn.png",
    },
    {
        name: "Regina Materu",
        email: "regina@gmail.com",
        image: "https://github.com/shadcn.png",
    },
];

const users = [
    {
        user_id: "123",
        name: "Regina Materu",
        email: "regina@gmail.com",
        image: "https://github.com/shadcn.png",
    },
];

interface AssignActivityOwnersProps {
    children: ReactNode;
    activityId?: string;
}
export const AssignActivityOwners = ({children, activityId}:AssignActivityOwnersProps) => {
    const [open, onOpenChange] = useState<boolean>();
    const [owners, setOwners] = useState<UserType[]>([])

    const mutationFn = async (data: NewActivityOwnersType) => {
        return APIRequestBuilder.to<NewActivityOwnersType, unknown>(
            `/risk_registers/${activityId}`,
        )
            .withMethod("POST")
            .withToken()
            .withBody(data)
            .fetch();
    };

    const onSubmit = () => {
        console.log(owners);
    }


    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="rounded-lg top-0">
                <SheetHeader className="flex flex-col mt-3">
                    <SheetTitle className="font-bold  text-[18px]">
                        Activity Owners
                    </SheetTitle>
                    <SheetDescription>
                        Engage users to keep track of the activity life cycle
                    </SheetDescription>
                    <section className="mt-4">
                        <UserMultiSelector
                            allUsers={allUsers}
                            title="Select Users"
                            options={users}
                            onValueChange={(owners) => setOwners(owners)}
                        />
                        <section className="mt-4 flex items-center justify-end">
                            <Button onClick={onSubmit} className="rounded-full w-[130px] cursor-pointer font-normal">
                                <SendHorizonal size={16}/>
                                Submit
                            </Button>
                        </section>
                    </section>
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}