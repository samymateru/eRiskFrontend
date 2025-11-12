"use client";
import {BaseTable} from "@/components/tables/table";
import {TableHeaderCell} from "@/components/tables/table-header";
import {ColumnDef} from "@tanstack/react-table";
import {ReadUserType} from "@/lib/schemas/user";
import {UserDetails} from "@/components/shared/user-details";
import {Phone, Shield, User} from "lucide-react";
import {useFetchModuleUsers} from "@/lib/api/users_api";
import {useLocalStorage} from "@/lib/hooks/use-localstorage";
import {Label} from "@/components/ui/label";
import {UserTableActions} from "@/app/eRisk/preferences/_preferences/components/actions/user_table_actions";

const columns: ColumnDef<ReadUserType>[] = [
    {
        header: () => (
            <TableHeaderCell leadingIcon={<User size={16}/>} align="left">
                Profile
            </TableHeaderCell>
        ),
        accessorKey: "profile",
        cell: ({row}) => (
            <UserTableActions >
                <div onClick={() => {}} className="hover:bg-neutral-800 hover:text-primary-foreground pl-[6px] py-[2px] cursor-pointer rounded-full">
                    <TableHeaderCell
                    leadingIcon={
                        <UserDetails
                          cursor={true}
                          isAction={false}
                          showLowerSection={false}
                          name={row.original.name}
                          email={row.original.email}
                          status={row.original.status}
                        />
                    }
                align="left"/>
                </div>
            </UserTableActions>
        ),
    },
    {
        header: () => (

            <TableHeaderCell leadingIcon={<Phone size={16}/>} align="center">
                Telephone
            </TableHeaderCell>
        ),
        accessorKey: "telephone",
        cell: ({row}) => (
            <TableHeaderCell align="center" className="font-normal text-sm">{row.original.telephone ? row.original.telephone : "NA"}</TableHeaderCell>
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
            <TableHeaderCell leadingIcon={<Shield size={16}/>} align="left">
                Role
            </TableHeaderCell>
        ),
        accessorKey: "role",
        cell: ({row}) => (
            <TableHeaderCell
                align="left"
                className="font-normal"
            >{row.original.role}</TableHeaderCell>
        ),
    },
];

interface UserTableProps {
    moduleId?: string | null;
}

export const UserTable = ({}: UserTableProps) => {
    const moduleId = useLocalStorage("module_id")
    const {data} = useFetchModuleUsers(moduleId)

    return <BaseTable<ReadUserType> data={data ?? []} columns={columns}/>;
};
