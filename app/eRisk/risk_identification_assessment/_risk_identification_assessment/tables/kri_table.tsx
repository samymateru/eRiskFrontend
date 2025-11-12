"use client";
import { BaseTable } from "@/components/tables/table";
import { TableHeaderCell } from "@/components/tables/table-header";
import { ReadKRIType } from "@/lib/schemas/kir-schemas";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { formatDate } from "@/lib/utils/datetime-formater";
import { RiskKRIActions } from "../components/actions/kri_actions";
import {Badge} from "@/components/ui/badge";
import {formatTimeLeft, getTimeRelativeToReferenceInMinutes} from "@/lib/utils";
import {ReactNode} from "react";


const days = 30

const columns: ColumnDef<ReadKRIType>[] = [
  {
    header: () => <TableHeaderCell align="left">Name</TableHeaderCell>,
    accessorKey: "name",
    cell: ({ row }) => (
      <TableHeaderCell align="left" className=" text-sm">
        {row.original.name}
      </TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="left">Type</TableHeaderCell>,
    accessorKey: "type",
    cell: ({ row }) => (
      <TableHeaderCell align="left">{row.original.type}</TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="left">Frequency</TableHeaderCell>,
    accessorKey: "frequency",
    cell: ({ row }) => (
      <TableHeaderCell align="left">{row.original.frequency === "specific_date" ? "Specific Date": row.original.frequency}</TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="left">Next At</TableHeaderCell>,
    accessorKey: "next_at",
    cell: ({ row }) => (
      <TableHeaderCell align="left">
        {formatDate(row.original.next_at)}
      </TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="center">Actions</TableHeaderCell>,
    accessorKey: "action",
    cell: ({row}) => (
      <TableHeaderCell
        leadingIcon={
          <RiskKRIActions kriId={row.original.risk_kri_id} risk_id={row.original.risk_id}>
            <Button className="h-7 w-7 bg-blue-500 text-secondary-foreground hover:text-neutral-200 cursor-pointer">
              <Ellipsis size={16} />
            </Button>
          </RiskKRIActions>
        }
        align="center"
      />
    ),
  },
];

const full_kri_columns: ColumnDef<ReadKRIType>[] = [
    {
        header: () => <TableHeaderCell align="left">Name</TableHeaderCell>,
        accessorKey: "name",
        cell: ({ row }) => (
            <TableHeaderCell align="left" className=" text-sm">
                {row.original.name}
            </TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="left">Type</TableHeaderCell>,
        accessorKey: "type",
        cell: ({ row }) => (
            <TableHeaderCell align="left">{row.original.type}</TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="center">Frequency</TableHeaderCell>,
        accessorKey: "frequency",
        cell: ({ row }) => (
            <TableHeaderCell align="center">
                {row.original.frequency}
            </TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="left">Status</TableHeaderCell>,
        accessorKey: "status",
        cell: ({ row }) => {
            const status =  formatTimeLeft(
                getTimeRelativeToReferenceInMinutes(new Date(Date.now() + (days * 24 * 60 * 60 * 1000)), row.original.next_reference),
            )

            return(
                <TableHeaderCell align="left">
                    {status === "Overdue" ? (<Badge className={"px-3 bg-red-200 text-red-800"}>{status}</Badge>) : status}
                </TableHeaderCell>
            )
        },
    },
    {
        header: () => <TableHeaderCell align="left">Risk ID</TableHeaderCell>,
        accessorKey: "risk_id",
        cell: ({ row }) => (
            <TableHeaderCell
                align="left"
                className="whitespace-break-spaces text-sm font-medium break-words">
                <Badge className={"bg-secondary text-secondary-foreground px-3"}>
                    {row.original?.risk_id}
                </Badge>
            </TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="left">Risk Name</TableHeaderCell>,
        accessorKey: "risk_name",
        cell: ({ row }) => (
            <TableHeaderCell
                align="left"
                className="whitespace-break-spaces text-sm font-medium break-words">
                {row.original?.risk_name}
            </TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="center">Actions</TableHeaderCell>,
        accessorKey: "action",
        cell: ({row}) => (
            <TableHeaderCell
                leadingIcon={
                    <RiskKRIActions
                        risk_id={row.original.risk_id}
                        kriId={row.original.risk_kri_id}
                        type={row.original.type}
                        description={row.original.description}
                        low={row.original.low}
                        high={row.original.high}
                        medium={row.original.medium}
                        very_high={row.original.very_high}
                    >
                        <Button className="h-7 w-7 bg-primary text-primary-foreground  cursor-pointer">
                            <Ellipsis size={16} />
                        </Button>
                    </RiskKRIActions>
                }
                align="center"
            />
        ),
    },
];

const review_kri_columns: ColumnDef<ReadKRIType>[] = [
    {
        header: () => <TableHeaderCell align="left">Name</TableHeaderCell>,
        accessorKey: "name",
        cell: ({ row }) => (
            <TableHeaderCell align="left" className=" text-sm">
                {row.original.name}
            </TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="left">Type</TableHeaderCell>,
        accessorKey: "type",
        cell: ({ row }) => (
            <TableHeaderCell align="left">{row.original.type}</TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="center">Frequency</TableHeaderCell>,
        accessorKey: "frequency",
        cell: ({ row }) => (
            <TableHeaderCell align="center">
                {row.original.frequency}
            </TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="left">Overdue</TableHeaderCell>,
        accessorKey: "status",
        cell: ({ row }) => {
            const status =  formatTimeLeft(
                getTimeRelativeToReferenceInMinutes(new Date(Date.now() + (days * 24 * 60 * 60 * 1000)), row.original.next_reference),
                true
            )

            return(
                <TableHeaderCell align="left">
                    {status === "Overdue" ? (<Badge className={"px-3 bg-red-200 text-red-800"}>{status}</Badge>) : status}
                </TableHeaderCell>
            )
        },
    },
    {
        header: () => <TableHeaderCell align="left">Risk ID</TableHeaderCell>,
        accessorKey: "risk_id",
        cell: ({ row }) => (
            <TableHeaderCell
                align="left"
                className="whitespace-break-spaces text-sm font-medium break-words">
                <Badge className={"bg-secondary text-secondary-foreground px-3"}>
                    {row.original?.risk_id}
                </Badge>
            </TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="left">Risk Name</TableHeaderCell>,
        accessorKey: "risk_name",
        cell: ({ row }) => (
            <TableHeaderCell
                align="left"
                className="whitespace-break-spaces text-sm font-medium break-words">
                {row.original?.risk_name}
            </TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="center">Actions</TableHeaderCell>,
        accessorKey: "action",
        cell: ({row}) => (
            <TableHeaderCell
                leadingIcon={
                    <RiskKRIActions
                        risk_id={row.original.risk_id}
                        kriId={row.original.risk_kri_id}
                        type={row.original.type}
                        description={row.original.description}
                        low={row.original.low}
                        high={row.original.high}
                        medium={row.original.medium}
                        very_high={row.original.very_high}
                    >
                        <Button className="h-7 w-7 bg-primary text-primary-foreground  cursor-pointer">
                            <Ellipsis size={16} />
                        </Button>
                    </RiskKRIActions>
                }
                align="center"
            />
        ),
    },
];



interface KRITableProps {
  data?: ReadKRIType[]
  height?: string,
  type?: "full" | "partial" | "review"
  groupColumn?: string,
  emptyTable?: ReactNode
}

export const KRITable = ({
  data,
  height,
  type = "partial",
  groupColumn,
  emptyTable

}: KRITableProps) => {

  return (
      <BaseTable<ReadKRIType>
          emptyTable={emptyTable}
          groupColumn={groupColumn}
          data={data ?? []}
          columns={
              type === "full" ? full_kri_columns :
              type === "review" ?  review_kri_columns : columns
          } height={height}
      />
  );
};
