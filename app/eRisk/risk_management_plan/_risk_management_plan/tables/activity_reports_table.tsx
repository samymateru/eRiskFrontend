"use client";
// import { UserDetails } from "@/components/shared/user-details";
import { BaseTable } from "@/components/tables/table";
import { TableHeaderCell } from "@/components/tables/table-header";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import { ActivitiesActions } from "../components/actions/activity_actions";
import {ReadActivityReportType} from "@/lib/schemas/activity_reports_schemas";
import {
    useFetchAllActivityReports
} from "@/lib/api/activity_reports_api";
import {
    formatDate
} from "@/lib/utils/datetime-formater";
import {
    UserDetails
} from "@/components/shared/user-details";

const columns: ColumnDef<ReadActivityReportType>[] = [
    {
        header: () => <TableHeaderCell align="left">Description</TableHeaderCell>,
        accessorKey: "description",
        cell: ({ row }) => (
            <TableHeaderCell align="left" className="font-normal text-[16px]">
                {row.original.description}
            </TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="left">Conclusion</TableHeaderCell>,
        accessorKey: "conclusion",
        cell: ({ row }) => (
            <TableHeaderCell align="left">{row.original.conclusion}</TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="left">Creator</TableHeaderCell>,
        accessorKey: "creator",
        cell: ({ row }) => (
            <UserDetails
                image={row.original?.creator?.usr_image}
                name={row.original?.creator?.usr_name}
                email={row.original?.creator?.usr_email}
                status={row.original?.creator?.usr_status}
                isAction={false}
                showLowerSection={false}
            />
        ),
    },
    {
        header: () => <TableHeaderCell align="left">Created</TableHeaderCell>,
        accessorKey: "created_at",
        cell: ({ row }) => (
            <TableHeaderCell align="left">{formatDate(row.original.created_at)}</TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="left">Attachment</TableHeaderCell>,
        accessorKey: "attachment",
        cell: ({ row }) => (
            <TableHeaderCell align="left">{row.original.attachment}</TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="center">Actions</TableHeaderCell>,
        accessorKey: "action",
        cell: ({ row }) => (
            <TableHeaderCell
                leadingIcon={
                    <ActivitiesActions activityId={row.original.activity_id ?? ""}>
                        <Button className="h-7 w-7 bg-secondary text-secondary-foreground hover:text-neutral-200 cursor-pointer">
                            <Ellipsis size={16} />
                        </Button>
                    </ActivitiesActions>
                }
                align="center"
            />
        ),
    },
];

interface ActivityReportsTableProps {
    activityId?: string | null;
}

export const ActivityReportsTable = ({ activityId }: ActivityReportsTableProps) => {
    const { data } = useFetchAllActivityReports(activityId);

    return (
        <section>
            <BaseTable<ReadActivityReportType> columns={columns} data={data ?? []} />
        </section>
    );
};
