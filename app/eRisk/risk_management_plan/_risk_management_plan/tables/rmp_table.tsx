"use client";
import { BaseTable } from "@/components/tables/table";
import { TableHeaderCell } from "@/components/tables/table-header";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Ellipsis } from "lucide-react";
import { UserDetails } from "@/components/shared/user-details";
import { ReadRMPType } from "@/lib/schemas/rmp_schemas";
import { useFetchAllRMP } from "@/lib/api/rmp_api";
import { useLocalStorage } from "@/lib/hooks/use-localstorage";
import {Label} from "@/components/ui/label";
import {
    RMPTableActions
} from "@/app/eRisk/risk_management_plan/_risk_management_plan/components/actions/rmp_table_actions";

const columns: ColumnDef<ReadRMPType>[] = [
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
          <RMPTableActions row={row}>
            <Button className="h-7 w-7 bg-blue-500 text-secondary-foreground hover:text-neutral-200 cursor-pointer">
                <Ellipsis size={16} />
            </Button>
          </RMPTableActions>

        }
        align="center"
      />
    ),
  },
];

interface RMPTableProps {
  risk_id?: string | null;
}

export const RMPTable = ({}: RMPTableProps) => {
  const moduleId = useLocalStorage("module_id");
  const { data } = useFetchAllRMP(moduleId);

  return (
    <section>
      <BaseTable<ReadRMPType> data={data ?? []} columns={columns} />
    </section>
  );
};
