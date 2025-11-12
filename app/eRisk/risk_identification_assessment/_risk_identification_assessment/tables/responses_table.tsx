"use client";
import { BaseTable } from "@/components/tables/table";
import { TableHeaderCell } from "@/components/tables/table-header";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { ReadRiskResponseType } from "@/lib/schemas/risk-responses-schemas";
import { RiskResponseActions } from "../components/risk_response-actions";
import {Badge} from "@/components/ui/badge";

const columns: ColumnDef<ReadRiskResponseType>[] = [
  {
    header: () => <TableHeaderCell align="left">Risk ID</TableHeaderCell>,
    accessorKey: "risk_id",
    cell: ({ row }) => (
        <TableHeaderCell
            align="left"
            className="whitespace-break-spaces text-sm font-medium break-words">
            {row.original.risk_id}
        </TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="left">Control</TableHeaderCell>,
    accessorKey: "control",
    cell: ({ row }) => (
      <TableHeaderCell
        align="left"
        className="whitespace-break-spaces text-sm font-medium break-words">
        {row.original.control}
      </TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="left">Objective</TableHeaderCell>,
    accessorKey: "objective",
    cell: ({ row }) => (
      <TableHeaderCell
        align="left"
        className="whitespace-break-spaces text-sm font-medium break-words">
        {row.original.objective}
      </TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="left">Action Plan</TableHeaderCell>,
    accessorKey: "action_plan",
    cell: ({ row }) => (
        <TableHeaderCell align="left">{row.original.action_plan}</TableHeaderCell>
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
    header: () => <TableHeaderCell className={""} align="center">Actions</TableHeaderCell>,
    accessorKey: "action",
    cell: () => (
      <TableHeaderCell
          className={""}
        leadingIcon={
          <RiskResponseActions risk_id="">
            <Button className="h-7 w-7 bg-blue-500 text-secondary-foreground hover:text-neutral-200 cursor-pointer">
              <Ellipsis size={16} />
            </Button>
          </RiskResponseActions>
        }
        align="center"
      />
    ),
  },
];

const joined_control_columns: ColumnDef<ReadRiskResponseType>[] = [
    {
        header: () => <TableHeaderCell align="left">Control</TableHeaderCell>,
        accessorKey: "control",
        cell: ({ row }) => (
            <TableHeaderCell
                align="left"
                className="whitespace-break-spaces text-sm font-medium break-words">
                {row.original.control}
            </TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="left">Objective</TableHeaderCell>,
        accessorKey: "objective",
        cell: ({ row }) => (
            <TableHeaderCell
                align="left"
                className="whitespace-break-spaces text-sm font-medium break-words">
                {row.original.objective}
            </TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell align="left">Action Plan</TableHeaderCell>,
        accessorKey: "action_plan",
        cell: ({ row }) => (
            <TableHeaderCell align="left">{row.original.action_plan}</TableHeaderCell>
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
        accessorKey: "name",
        cell: ({ row }) => (
            <TableHeaderCell
                align="left"
                className="whitespace-break-spaces text-sm font-medium break-words">
                {row.original.name}
            </TableHeaderCell>
        ),
    },
    {
        header: () => <TableHeaderCell className={""} align="center">Actions</TableHeaderCell>,
        accessorKey: "action",
        cell: () => (
            <TableHeaderCell
                className={""}
                leadingIcon={
                    <RiskResponseActions risk_id="">
                        <Button className="h-7 w-7 bg-blue-500 text-secondary-foreground hover:text-neutral-200 cursor-pointer">
                            <Ellipsis size={16} />
                        </Button>
                    </RiskResponseActions>
                }
                align="center"
            />
        ),
    },
];



interface RiskResponsesTableProps {
  data?: ReadRiskResponseType[];
  height?: string,
  type?: "full" | "partial"
}

export const RiskResponsesTable = ({ data, height, type = "partial" }: RiskResponsesTableProps) => {
  return (
    <section>
      <BaseTable<ReadRiskResponseType> data={data ?? []} columns={type === "full" ? joined_control_columns : columns} height={height}/>
    </section>
  );
};
