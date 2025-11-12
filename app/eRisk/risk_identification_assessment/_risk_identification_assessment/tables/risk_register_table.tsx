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
import {
    RiskRegisterTableActions
} from "@/app/eRisk/risk_identification_assessment/_risk_identification_assessment/components/actions/risk_register_table_actions";
import {Label} from "@/components/ui/label";

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
      <TableHeaderCell leadingIcon={<Label
          className={`${row.original.status === "current" ? "bg-green-800": "bg-primary"} text-primary-foreground font-normal text-[13px] w-[50px] flex items-center justify-center rounded-full px-7 py-[1px]`}>{row.original.status === "current" ? "Active" : "In Active"}</Label>} align="left"/>
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
        name={row.original.creator.usr_name}
        email={row.original.creator.usr_email}
        image={row.original.creator.usr_image}
        status={row.original.creator.usr_status}
        showLowerSection={false}
        isAction={false}
      />
    ),
  },
  {
    header: () => <TableHeaderCell align="left">Approver</TableHeaderCell>,
    accessorKey: "approver",
    cell: ({ row }) => {
        {
            if(row.original.approver) {
                return(
                    <UserDetails
                        name={row.original.approver?.usr_name}
                        email={row.original.approver?.usr_email}
                        image={row.original.approver?.usr_image}
                        status={row.original.approver?.usr_status}
                        showLowerSection={false}
                        isAction={false}
                    />
                )}
            else {
                return(
                    <Button className={"h-7 rounded-full text-sm font-medium"}>Approve</Button>
                )
            }
        }
    },
  },
  {
    header: () => <TableHeaderCell align="center">Actions</TableHeaderCell>,
    accessorKey: "action",
    cell: ({row}) => (
      <TableHeaderCell
        leadingIcon={
          <RiskRegisterTableActions row={row}>
              <Button className="h-7 w-7 bg-blue-500 text-secondary-foreground hover:text-neutral-200 cursor-pointer">
                  <Ellipsis size={16} />
              </Button>
          </RiskRegisterTableActions>
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
