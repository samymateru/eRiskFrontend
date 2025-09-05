"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {ReactNode} from "react";
import {UserForm} from "../forms/user_form";
import {APIRequestBuilder} from "@/components/forms/base-api-client";
import {NewUserSchema, NewUserType} from "@/lib/schemas/user";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useLocalStorage} from "@/lib/hooks/use-localstorage";

interface NewUserProps {
    children: ReactNode;
}

export const NewUser = ({children}: NewUserProps) => {
    const entity_id = useLocalStorage("entity_id");
    const module_id = useLocalStorage("module_id");
    const organization_id = useLocalStorage("organization_id");

    const methods = useForm<NewUserType>({
        resolver: zodResolver(NewUserSchema),
        defaultValues: {
            role: "",
            type: "Risk"
        },
    });

    const mutationFn = async (data: NewUserType) => {
        return APIRequestBuilder.to<NewUserType, unknown>(`/risk_users/${module_id}?entity_id=${entity_id}&organization_id=${organization_id}`)
            .withMethod("POST")
            .withToken()
            .withBody(data)
            .fetch();
    };

    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className=" min-w-[420px] rounded-lg px-5">
                <SheetHeader className="mt-4">
                    <SheetTitle className="font-bold text-[18px]">
                        Invite New User
                    </SheetTitle>
                    <SheetDescription>
                        invite a new user to the system by entering their full name and
                        email address
                    </SheetDescription>
                </SheetHeader>
                <section className="px-1">
                    <UserForm methods={methods} mutationFn={mutationFn}/>
                </section>
            </SheetContent>
        </Sheet>
    );
};
