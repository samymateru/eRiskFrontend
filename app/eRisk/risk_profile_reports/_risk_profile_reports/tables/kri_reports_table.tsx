"use client";
import { BaseTable } from "@/components/tables/table";
import { TableHeaderCell } from "@/components/tables/table-header";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { formatDate } from "@/lib/utils/datetime-formater";
import {ReadKRIReportType} from "@/lib/schemas/risk_profiles_schemas";

const columns: ColumnDef<ReadKRIReportType>[] = [
    {
        header: () => <TableHeaderCell align="left">KRI Name</TableHeaderCell>,
        accessorKey: "risk_name",
        cell: ({ row }) => (
            <TableHeaderCell align="left" className=" text-sm">
                {row.original.kri_name}
            </TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="left">Risk Category</TableHeaderCell>,
        accessorKey: "risk_category",
        cell: ({ row }) => (
            <TableHeaderCell align="left">{row.original.risk_category}</TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="left">Actual Value</TableHeaderCell>,
        accessorKey: "actual_value",
        cell: ({ row }) => (
            <TableHeaderCell align="left">{row.original.value}</TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="left">Remarks</TableHeaderCell>,
        accessorKey: "remark",
        cell: ({ row }) => (
            <TableHeaderCell align="left">{row.original.remark}</TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="left">Rating</TableHeaderCell>,
        accessorKey: "rating",
        cell: ({ row }) => (
            <TableHeaderCell align="left">
                {row.original.rating}
            </TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="left">Issued On</TableHeaderCell>,
        accessorKey: "created_at",
        cell: ({ row }) => (
            <TableHeaderCell align="left">
                {formatDate(row.original.created_at)}
            </TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="center">Actions</TableHeaderCell>,
        accessorKey: "action",
        cell: () => (
            <TableHeaderCell
                leadingIcon={
                    <Button className="h-7 w-7 cursor-pointer">
                        <Ellipsis size={16} />
                    </Button>
                }
                align="center"
            />
        ),
    },
];


interface KRIReportsTableProps {
    data?: ReadKRIReportType[]
    height?: string,
    groupColumn?: string
}

export const KRIReportsTable = ({ data, height, groupColumn }: KRIReportsTableProps) => {
    return (
        <BaseTable<ReadKRIReportType>
            groupColumn={groupColumn}
            data={data ?? []} columns={columns} height={height}
        />
    );
};
