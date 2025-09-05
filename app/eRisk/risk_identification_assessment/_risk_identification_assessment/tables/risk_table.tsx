"use client";
import { BaseTable } from "@/components/tables/table";
import { TableHeaderCell } from "@/components/tables/table-header";
import { ReadRiskType } from "@/lib/schemas/risk-schemas";
import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "@/components/tables/status-badge";
import NumberBadge from "@/components/tables/number-badge";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { RiskActions } from "../components/actions/risk_actions";
import { ThresholdLevel } from "@/lib/utils";
import {
    useFetchAllRisks
} from "@/lib/api/risks_api";

const columns: ColumnDef<ReadRiskType>[] = [
  {
    header: () => <TableHeaderCell align="left">Reference</TableHeaderCell>,
    accessorKey: "reference",
    cell: ({ row }) => (
      <TableHeaderCell align="left">{row.original.risk_id}</TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="left">Risk</TableHeaderCell>,
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
    header: () => <TableHeaderCell align="left">Category</TableHeaderCell>,
    accessorKey: "category",
    cell: ({ row }) => (
      <TableHeaderCell align="left">{row.original.category}</TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="left">Department</TableHeaderCell>,
    accessorKey: "department",
    cell: ({ row }) => (
      <TableHeaderCell align="left">{row.original.department}</TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="center">Owners</TableHeaderCell>,
    accessorKey: "owners",
    cell: ({ row }) => (
      <TableHeaderCell
        leadingIcon={<NumberBadge count={row.original.owners?.length} />}
        align="center"
        className="whitespace-break-spaces text-sm font-medium break-words"
      />
    ),
  },
  {
    header: () => <TableHeaderCell align="center">Impact</TableHeaderCell>,
    accessorKey: "impact",
    cell: ({ row }) => (
      <TableHeaderCell align="center" leadingIcon={<NumberBadge count={row.original.inherent_impact} />}/>
    ),
  },
  {
    header: () => <TableHeaderCell align="center">Likelihood</TableHeaderCell>,
    accessorKey: "likehood",
    cell: ({ row }) => (
      <TableHeaderCell align="center" leadingIcon={<NumberBadge count={row.original.inherent_likelihood} />}/>
    ),
    meta: {
      className: "text-center",
    },
  },
  {
    header: () => <TableHeaderCell align="center">Inherent</TableHeaderCell>,
    accessorKey: "inherent_level",
    cell: ({ row }) => (
      <TableHeaderCell
        leadingIcon={<StatusBadge title={ThresholdLevel(row.original.inherent_impact * row.original.inherent_likelihood)} />}
        align="center"
      />
    ),
  },
  {
    header: () => <TableHeaderCell align="center">Residual</TableHeaderCell>,
    accessorKey: "residual_level",
    cell: ({ row }) => (
      <TableHeaderCell
        align="center"
        leadingIcon={<StatusBadge title={ThresholdLevel(row.original.residual_impact * row.original.residual_likelihood)} />}
      />
    ),
  },
  {
    header: () => <TableHeaderCell align="center">Actions</TableHeaderCell>,
    accessorKey: "action",
    cell: ({ row }) => (
      <TableHeaderCell
        leadingIcon={
          <RiskActions risk_id={row.original?.risk_id ?? ""}>
            <Button className="h-7 w-7 bg-secondary text-secondary-foreground hover:text-neutral-200 cursor-pointer">
              <Ellipsis size={16} />
            </Button>
          </RiskActions>
        }
        align="center"
      />
    ),
  },
];

interface RiskTableProps {
  moduleId?: string | null;
}

export const RiskTable = ({ moduleId }: RiskTableProps) => {
  const {data} = useFetchAllRisks(moduleId)

  return <BaseTable<ReadRiskType> data={data ?? []} columns={columns} />;
};
