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
import {useFetchAllRisks} from "@/lib/api/risks_api";
import {Checkbox} from "@/components/ui/checkbox";
import {Badge} from "@/components/ui/badge";

const columns: ColumnDef<ReadRiskType>[] = [
    {
    id: "select",
    header: ({ table }) => {

        const eligibleRows = table.getRowModel().rows.filter(
            (row) => row.original.status === 'Draft'
        );

        const allEligibleSelected = eligibleRows.length > 0 && eligibleRows.every(row => row.getIsSelected());
        const someEligibleSelected = eligibleRows.some(row => row.getIsSelected());

        return (
            <TableHeaderCell
                align="center"
                leadingIcon={
                    <Checkbox
                        checked={allEligibleSelected}
                        onCheckedChange={(value) => {
                            eligibleRows.forEach(row => {
                                row.toggleSelected(!!value);
                            });
                        }}
                        aria-label="Select eligible rows"
                        className={`w-[18px] h-[18px] rounded-full 
                    ${allEligibleSelected ? "bg-green-800" : someEligibleSelected ? "bg-yellow-500" : "bg-neutral-500"}`}
                    />
                }
            />
        );
    },
    cell: ({ row }) => {
        if (row.original.status === "Draft"){
            return (
              <TableHeaderCell align="center"
                 leadingIcon={
                   <Checkbox
                     checked={row.getIsSelected()}
                     onCheckedChange={(value) => {
                         row.toggleSelected(!!value);
                     }}
                     aria-label="Select row"
                     className={"w-[18px] rounded-full h-[18px] data-[state=checked]:bg-green-800 data-[state=unchecked]:bg-neutral-500"}
                 />
                }/>
            )
        }
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: () => <TableHeaderCell align="left">Reference</TableHeaderCell>,
    accessorKey: "reference",
    cell: ({ row }) => (
      <TableHeaderCell align="left">
          <Badge className={"bg-secondary text-secondary-foreground px-3"}>
              {row.original?.risk_id}
          </Badge>
      </TableHeaderCell>
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
    header: () => <TableHeaderCell align="center">Status</TableHeaderCell>,
    accessorKey: "status",
    cell: ({ row }) => (
      <TableHeaderCell
        align="center"
        className="whitespace-break-spaces text-sm font-medium break-words"
      >
          {row.original.status}
      </TableHeaderCell>
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
    accessorKey: "likelihood",
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
          <RiskActions sideOffset={"0"} side={"left"} riskId={row.original?.risk_id ?? ""}>
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
  onSelectionChange?: (selectedIds: string[]) => void;
}

export const RiskTable = ({ moduleId, onSelectionChange }: RiskTableProps) => {
  const {data} = useFetchAllRisks(moduleId)
  // const sortedData: ReadRiskType[] = Array.isArray(data)
  //     ? [...data].sort((a, b) => a.category.localeCompare(b.category))
  //     : [];


    return <BaseTable<ReadRiskType>
      getRowId={(row) => row?.risk_id ?? ""}
      data={data ?? []}
      columns={columns} height={"208"}
      onSelectionChange={onSelectionChange}
  />;
};
