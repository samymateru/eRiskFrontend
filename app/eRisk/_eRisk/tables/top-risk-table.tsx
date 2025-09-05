"use client";
import { BaseTable } from "@/components/tables/table";
import { TableHeaderCell } from "@/components/tables/table-header";
import { ReadRiskType } from "@/lib/schemas/risk-schemas";
import { UserDetailsSchema } from "@/lib/schemas/user";
import { ColumnDef } from "@tanstack/react-table";
import z from "zod";
import StatusBadge from "./../../../../components/tables/status-badge";
import NumberBadge from "@/components/tables/number-badge";

type UserDetailsType = z.infer<typeof UserDetailsSchema>;

export const dummyUsers: UserDetailsType[] = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    role: "Admin",
    date: new Date("2025-01-15"),
    image: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    role: "Editor",
    date: new Date("2025-03-22"),
    image: "https://i.pravatar.cc/150?img=2",
  },
  {
    name: "Carol Lee",
    email: "carol.lee@example.com",
    role: "Viewer",
    date: new Date("2025-05-10"),
    image: "https://i.pravatar.cc/150?img=3",
  },
];

export const risks: Array<ReadRiskType> = [
  {
    reference: "R-001",
    category: "Operational",
    name: "System Downtime",
    impact: 8,
    likelihood: 6,
    inherent_level: "Medium",
    residual_level: "Low",
    owners: dummyUsers,
  },
  {
    reference: "R-002",
    category: "Financial",
    name: "Budget Overrun",
    impact: 7,
    likelihood: 5,
    inherent_level: "Medium",
    residual_level: "High",
    owners: dummyUsers,
  },
  {
    reference: "R-003",
    category: "Compliance",
    name: "Regulatory Non-Compliance",
    impact: 9,
    likelihood: 4,
    inherent_level: "Low",
    residual_level: "Medium",
    owners: dummyUsers,
  },
];

const columns: ColumnDef<ReadRiskType>[] = [
  {
    header: () => <TableHeaderCell align="left">Reference</TableHeaderCell>,
    accessorKey: "reference",
    cell: ({ row }) => (
      <TableHeaderCell align="left">
        {row.getValue("reference")}
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
    header: () => <TableHeaderCell align="left">Risk</TableHeaderCell>,
    accessorKey: "name",
    cell: ({ row }) => (
      <TableHeaderCell
        align="left"
        className="whitespace-break-spaces text-sm font-medium break-words">
        {row.getValue("name")}
      </TableHeaderCell>
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
      <TableHeaderCell align="center">{row.getValue("impact")}</TableHeaderCell>
    ),
  },
  {
    header: () => <TableHeaderCell align="center">Likelihood</TableHeaderCell>,
    accessorKey: "likehood",
    cell: ({ row }) => (
      <TableHeaderCell align="center">
        {row.getValue("likehood")}
      </TableHeaderCell>
    ),
    meta: {
      className: "text-center", // optional if your Table component supports meta classNames
    },
  },
  {
    header: () => (
      <TableHeaderCell align="center">Inherent Level</TableHeaderCell>
    ),
    accessorKey: "inherent_level",
    cell: ({ row }) => (
      <TableHeaderCell
        leadingIcon={<StatusBadge title={row.getValue("inherent_level")} />}
        align="center"
      />
    ),
  },
  {
    header: () => (
      <TableHeaderCell align="center">Residual Level</TableHeaderCell>
    ),
    accessorKey: "residual_level",
    cell: ({ row }) => (
      <TableHeaderCell
        align="center"
        leadingIcon={<StatusBadge title={row.getValue("residual_level")} />}
      />
    ),
  },
];

export const TopRiskTable = () => {
  return (
    <section>
      <BaseTable data={risks} columns={columns} />
    </section>
  );
};
