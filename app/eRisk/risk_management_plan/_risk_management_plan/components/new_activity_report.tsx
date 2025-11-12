import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ReactNode} from "react";
import {APIRequestBuilder} from "@/components/forms/base-api-client";
import {useLocalStorage} from "@/lib/hooks/use-localstorage";
import {NewActivityReportSchema, NewActivityReportType} from "@/lib/schemas/activity_reports_schemas";
import {
    ActivityReportForm
} from "@/app/eRisk/risk_management_plan/_risk_management_plan/form/activity_report_form";

interface NewActivityReportProps {
    children?: ReactNode;
    activityId?: string | null;
}

export const NewActivityReport = ({children, activityId}: NewActivityReportProps) => {
    const userId = useLocalStorage("user_id")
    const methods = useForm<NewActivityReportType>({
        resolver: zodResolver(NewActivityReportSchema),
        defaultValues: {},
    });

    const mutationFn = async (data: NewActivityReportType) => {
        return APIRequestBuilder.to<NewActivityReportType, unknown>(
            `/activity_reports/${activityId}?user_id=${userId}`
        )
        .withMethod("POST")
        .withToken()
        .asFormData()
        .withBody(data)
        .fetch();
    };

    return(
        <Drawer>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="ml-[56px] min-h-[calc(100svh-56px)] flex">
                <DrawerHeader>
                    <DrawerTitle className="text-base font-medium">
                        Adding New Activity
                    </DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <section id="main" className="w-[600px]  mx-auto justify-center">
                    <ActivityReportForm<NewActivityReportType, unknown>
                        methods={methods}
                        mutationFn={mutationFn}
                    />
                </section>
            </DrawerContent>
        </Drawer>
    )
}