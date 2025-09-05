"use client";
import { BaseTable } from "@/components/tables/table";
import { TableHeaderCell } from "@/components/tables/table-header";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { ReadRiskRegisterType } from "@/lib/schemas/risk_register_schemas";
import { UserDetails } from "@/components/shared/user-details";
import { useFetchAllRiskRegisters } from "@/lib/api/risk_registers_api";
import { useLocalStorage } from "@/lib/hooks/use-localstorage";

const columns: ColumnDef<ReadRiskRegisterType>[] = [
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
    header: () => <TableHeaderCell align="left">Status</TableHeaderCell>,
    accessorKey: "status",
    cell: ({ row }) => (
      <TableHeaderCell align="left">{row.original.status}</TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="left">Year</TableHeaderCell>,
    accessorKey: "year",
    cell: ({ row }) => (
      <TableHeaderCell align="left">{row.original.year}</TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="left">Creator</TableHeaderCell>,
    accessorKey: "creator",
    cell: ({ row }) => (
      <UserDetails
        name={row.original.creator.name}
        email={row.original.creator.email}
        image={row.original.creator.image}
        showLowerSection={false}
        isAction={false}
      />
    ),
  },
  {
    header: () => <TableHeaderCell align="left">Approver</TableHeaderCell>,
    accessorKey: "approver",
    cell: ({ row }) => (
      <UserDetails
        name={row.original?.approver?.name}
        email={row.original?.approver?.email}
        image={row.original?.approver?.image}
        showLowerSection={false}
        isAction={false}
      />
    ),
  },
  {
    header: () => <TableHeaderCell align="center">Actions</TableHeaderCell>,
    accessorKey: "action",
    cell: () => (
      <TableHeaderCell
        leadingIcon={
          <Button className="h-7 w-7 bg-blue-500 text-secondary-foreground hover:text-neutral-200 cursor-pointer">
            <Ellipsis size={16} />
          </Button>
        }
        align="center"
      />
    ),
  },
];

interface RiskRegisterTableProps {
  risk_id?: string | null;
}

export const RiskRegisterTable = ({}: RiskRegisterTableProps) => {
  const moduleId = useLocalStorage("module_id");
  const { data } = useFetchAllRiskRegisters(moduleId);

  return (
    <section>
      <BaseTable<ReadRiskRegisterType> data={data ?? []} columns={columns} />
    </section>
  );
};
