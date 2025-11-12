"use client";
import {BaseTable} from "@/components/tables/table";
import {TableHeaderCell} from "@/components/tables/table-header";
import {ColumnDef} from "@tanstack/react-table";
import {Shield, User} from "lucide-react";
import {useFetchModuleUsers} from "@/lib/api/users_api";
import {useLocalStorage} from "@/lib/hooks/use-localstorage";
import {Label} from "@/components/ui/label";
import {ReadRoleType} from "@/lib/schemas/role_schemas";
import {UserDetails} from "@/components/shared/user-details";

const columns: ColumnDef<ReadRoleType>[] = [
    {
        header: () => (

            <TableHeaderCell leadingIcon={<Shield size={16}/>} align="left">
                Role Name
            </TableHeaderCell>
        ),
        accessorKey: "name",
        cell: ({row}) => (
            <TableHeaderCell align="left" className="font-normal text-sm">{row.original.name}</TableHeaderCell>
        ),
    },
    {
        header: () => (
            <TableHeaderCell leadingIcon={<Shield size={16}/>} align="center">
                Type
            </TableHeaderCell>
        ),
        accessorKey: "type",
        cell: ({row}) => (
            <TableHeaderCell
                align="center"
                className="px-2"
                leadingIcon={<Label
                    className="bg-primary text-primary-foreground font-medium text-[13px] w-[50px] flex items-center justify-center rounded-full px-7 py-[1px]">{row.original.type}</Label>}
            ></TableHeaderCell>
        ),
    },
    {
        header: () => (
            <TableHeaderCell leadingIcon={<User size={16}/>} align="left">
                Created By
            </TableHeaderCell>
        ),
        accessorKey: "left",
        cell: ({}) => (
                <UserDetails showLowerSection={false} isAction={false}/>
        ),
    }
];

interface RoleTableProps {
    moduleId?: string | null;
}

export const RoleTable = ({}: RoleTableProps) => {
    const moduleId = useLocalStorage("module_id")
    const {data} = useFetchModuleUsers(moduleId)

    return <BaseTable<ReadRoleType> data={data ?? []} columns={columns}/>;
};
