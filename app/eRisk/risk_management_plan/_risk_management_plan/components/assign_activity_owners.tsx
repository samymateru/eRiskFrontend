import {
    ReactNode,
    useState
} from "react";
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
import {useMutation} from "@tanstack/react-query";
import {useFetchModuleUsers} from "@/lib/api/users_api";
import {useLocalStorage} from "@/lib/hooks/use-localstorage";
import {
    useFetchActivityOwners
} from "@/lib/api/activities_api";

const users: UserType[] = []

interface AssignActivityOwnersProps {
    children: ReactNode;
    activityId?: string | null;
}
export const AssignActivityOwners = ({children, activityId}:AssignActivityOwnersProps) => {
    const [open, onOpenChange] = useState<boolean>();
    const [owners, setOwners] = useState<UserType[]>([])
    const moduleId = useLocalStorage("module_id")
    const {data: allUsers} = useFetchModuleUsers(moduleId)
    const {data: activityOwners} = useFetchActivityOwners(activityId)

    const availableUsers = (allUsers ?? []).filter(user => {
        return !(activityOwners ?? []).some(owner => owner.usr_id === user?.user_id);
    });

    const mutationFn = async (data: NewActivityOwnersType) => {
        return APIRequestBuilder.to<NewActivityOwnersType, unknown>(
            `/activities/owners/${activityId}`,
        )
            .withMethod("POST")
            .withToken()
            .withBody(data)
            .fetch();
    };

    const { mutate } = useMutation({
        mutationKey: ["assign_activity_owner", activityId],
        mutationFn: mutationFn,
    });


    const onSubmit = () => {
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
                            allUsers={availableUsers}
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