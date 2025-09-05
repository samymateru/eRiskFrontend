"use client";
import { BaseTable } from "@/components/tables/table";
import { TableHeaderCell } from "@/components/tables/table-header";
import { ReadKRIType } from "@/lib/schemas/kir-schemas";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { formatDate } from "@/lib/utils/datetime-formater";
import { RiskKRIActions } from "../components/actions/kri_actions";
import {useFetchRiskKRI} from "@/lib/api/risk_kri_api";

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
      <TableHeaderCell align="left">{row.original.frequency}</TableHeaderCell>
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
    cell: () => (
      <TableHeaderCell
        leadingIcon={
          <RiskKRIActions risk_id="">
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

interface KRITableProps {
  risk_id?: string | null;
}

export const KRITable = ({ risk_id }: KRITableProps) => {
  const { data } = useFetchRiskKRI(risk_id)
  return (
    <section>
      <BaseTable<ReadKRIType> data={data ?? []} columns={columns} />
    </section>
  );
};
