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
import {UserType} from "@/lib/schemas/user";
import {useLocalStorage} from "@/lib/hooks/use-localstorage";
import {useFetchModuleUsers} from "@/lib/api/users_api";
import {NewActivityOwnersType} from "@/lib/schemas/activity-schemas";
import {APIRequestBuilder} from "@/components/forms/base-api-client";
import {NewRiskOwnersType} from "@/lib/schemas/risk-schemas";
import {useMutation} from "@tanstack/react-query";
import {useFetchRiskOwners} from "@/lib/api/risks_api";

interface AssignRiskOwnersProps{
    children?: ReactNode;
    riskId: string;
}

const users = [];

export const AssignRiskOwners = ({children, riskId}: AssignRiskOwnersProps) => {
    const [open, onOpenChange] = useState<boolean>();
    const [owners, setOwners] = useState<UserType[]>(users)
    const moduleId = useLocalStorage("module_id")
    const {data: allUsers} = useFetchModuleUsers(moduleId)
    const {data: riskOwners} = useFetchRiskOwners(riskId)

    const availableUsers = (allUsers ?? []).filter(user => {
        return !(riskOwners ?? []).some(owner => owner.usr_id === user.user_id);
    });

    const mutationFn = async (data: NewRiskOwnersType) => {
        return APIRequestBuilder.to<NewRiskOwnersType, unknown>(
            `/risks/owners/${riskId}`,
        )
            .withMethod("POST")
            .withToken()
            .withBody(data)
            .fetch();
    };

    const { mutate } = useMutation({
        mutationKey: ["assign_risk_owner", riskId],
        mutationFn: mutationFn,
    });

    const onRiskSubmit = () => {
        if(owners.length !== 0){
            const userIds: string[] = owners.map(user => user.user_id)
                .filter((id): id is string => id !== undefined);

            const ownersData: NewActivityOwnersType = {
                owners: userIds
            };

            mutate(ownersData, {
                onSuccess: () => {
                    onOpenChange(false)
                },
                onError: () => {
                    onOpenChange(false)
                },
            });

        }

    }

    return(
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="rounded-lg top-0">
                <SheetHeader className="flex flex-col mt-3">
                    <SheetTitle className="font-bold  text-[18px]">
                        Risk Owners
                    </SheetTitle>
                    <SheetDescription>
                        Engage users to keep track of the risk life cycle
                    </SheetDescription>
                    <section className="mt-4">
                        <UserMultiSelector
                            allUsers={availableUsers}
                            title="Select Risk Owners"
                            options={users}
                            onValueChange={(owners) => setOwners(owners)}
                        />
                        <section className="mt-4 flex items-center justify-end">
                            <Button onClick={onRiskSubmit} className="rounded-full w-[130px] cursor-pointer font-normal">
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