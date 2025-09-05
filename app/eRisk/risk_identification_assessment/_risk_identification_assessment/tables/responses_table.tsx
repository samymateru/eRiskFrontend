"use client";
import { BaseTable } from "@/components/tables/table";
import { TableHeaderCell } from "@/components/tables/table-header";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { ReadRiskResponseType } from "@/lib/schemas/risk-responses-schemas";
import { RiskResponseActions } from "../components/risk_response-actions";

const columns: ColumnDef<ReadRiskResponseType>[] = [
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
      <TableHeaderCell align="left">{row.original.frequency}</TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="center">Actions</TableHeaderCell>,
    accessorKey: "action",
    cell: () => (
      <TableHeaderCell
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
}

export const RiskResponsesTable = ({ data }: RiskResponsesTableProps) => {
  return (
    <section>
      <BaseTable<ReadRiskResponseType> data={data ?? []} columns={columns} />
    </section>
  );
};
