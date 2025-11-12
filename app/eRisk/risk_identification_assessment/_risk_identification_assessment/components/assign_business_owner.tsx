import {ReactNode, useState} from "react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {SendHorizonal} from "lucide-react";
import {UserType} from "@/lib/schemas/user";
import {useLocalStorage} from "@/lib/hooks/use-localstorage";
import {useFetchModuleUsers} from "@/lib/api/users_api";
import {APIRequestBuilder} from "@/components/forms/base-api-client";
import {NewBusinessOwnerType,} from "@/lib/schemas/risk-schemas";
import {useMutation} from "@tanstack/react-query";
import {UserSingleSelector} from "@/components/select/user_single_select";

interface AssignBusinessOwnersProps{
    children?: ReactNode;
    riskIds?: string[]
}

export const AssignBusinessOwners = ({children, riskIds}: AssignBusinessOwnersProps) => {
    const [open, onOpenChange] = useState<boolean>();
    const [owner, setOwner] = useState<UserType>()
    const moduleId = useLocalStorage("module_id")
    const userId = useLocalStorage("user_id");
    const {data: allUsers} = useFetchModuleUsers(moduleId)

    const mutationFn = async (data: NewBusinessOwnerType) => {
        return APIRequestBuilder.to<NewBusinessOwnerType, unknown>(
            `/risks/business_owner/${userId}?business_user_id=${owner?.user_id}`,
        )
        .withMethod("POST")
        .withToken()
        .withBody(data)
        .fetch();
    };

    const { mutate } = useMutation({
        mutationKey: ["assign_business_owner", owner?.user_id],
        mutationFn: mutationFn,
    });

    const onRiskSubmit = () => {
        if(owner?.user_id !== undefined && riskIds?.length !== 0){
            const data: NewBusinessOwnerType = {
                risk_ids: riskIds ?? []
            }

            mutate(data, {
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
                        Risk Business Owner
                    </SheetTitle>
                    <SheetDescription>
                        Engage users to keep track of the risk life cycle
                    </SheetDescription>
                    <section className="mt-4">
                        <UserSingleSelector
                            allUsers={allUsers}
                            title="Select Risk Owners"
                            onValueChange={(owners) => setOwner(owners)}
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