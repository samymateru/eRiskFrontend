"use client";
import { UserDetails } from "@/components/shared/user-details";
import NumberBadge from "@/components/tables/number-badge";
import StatusBadge from "@/components/tables/status-badge";
import { BaseTable } from "@/components/tables/table";
import { TableHeaderCell } from "@/components/tables/table-header";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import { ActivitiesActions } from "../components/actions/activity_actions";
import { useFetchAllActivities } from "@/lib/api/activities_api";
import { ReadActivityType } from "@/lib/schemas/activity-schemas";

const columns: ColumnDef<ReadActivityType>[] = [
  {
    header: () => <TableHeaderCell align="left">Reference</TableHeaderCell>,
    accessorKey: "reference",
    cell: ({ row }) => (
      <TableHeaderCell align="left">{row.original.activity_id}</TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="left">Title</TableHeaderCell>,
    accessorKey: "title",
    cell: ({ row }) => (
      <TableHeaderCell align="left" className="font-normal text-[16px]">
        {row.original.title}
      </TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="left">Category</TableHeaderCell>,
    accessorKey: "category",
    cell: ({ row }) => (
      <TableHeaderCell align="left">{row.getValue("category")}</TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="left">Creator</TableHeaderCell>,
    accessorKey: "creator",
    cell: ({ row }) => (
      <UserDetails
        image={row.original.user.usr_image}
        name={row.original.user.usr_name}
        email={row.original.user.usr_email}
        status={row.original.user.usr_status}
        isAction={false}
        showLowerSection={false}
      />
    ),
  },
  {
    header: () => <TableHeaderCell align="left">Type</TableHeaderCell>,
    accessorKey: "type",
    cell: ({ row }) => (
      <TableHeaderCell
        align="left"
        className="whitespace-break-spaces text-sm font-medium break-words">
        {row.original.type}
      </TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="left">Frequency</TableHeaderCell>,
    accessorKey: "frequency",
    cell: ({ row }) => (
      <TableHeaderCell
        align="left"
        className="whitespace-break-spaces text-sm font-medium break-words">
        {row.original.frequency}
      </TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="center">Leads</TableHeaderCell>,
    accessorKey: "leads",
    cell: ({ row }) => (
      <TableHeaderCell
        leadingIcon={<NumberBadge count={row.original.leads.length} />}
        align="center"
        className="whitespace-break-spaces text-sm font-medium break-words"
      />
    ),
  },
  {
    header: () => <TableHeaderCell align="center">Status</TableHeaderCell>,
    accessorKey: "status",
    cell: ({ row }) => (
      <TableHeaderCell
        leadingIcon={<StatusBadge title={row.getValue("status")} />}
        align="center"
      />
    ),
  },
  {
    header: () => <TableHeaderCell align="center">Actions</TableHeaderCell>,
    accessorKey: "action",
    cell: ({ row }) => (
      <TableHeaderCell
        leadingIcon={
          <ActivitiesActions sideOffset={"0"} side={"left"} activityId={row.original.activity_id ?? ""}>
            <Button className="h-7 w-7 bg-secondary text-secondary-foreground hover:text-neutral-200 cursor-pointer">
              <Ellipsis size={16} />
            </Button>
          </ActivitiesActions>
        }
        align="center"
      />
    ),
  },
];

interface ActivitiesTableProps {
  moduleId?: string | null;
}

export const ActivitiesTable = ({ moduleId }: ActivitiesTableProps) => {
  const { data } = useFetchAllActivities(moduleId);

  return (
    <section>
      <BaseTable<ReadActivityType> columns={columns} data={data ?? []} height={"205"}/>
    </section>
  );
};
