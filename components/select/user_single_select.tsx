"use client";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import SearchInput from "../inputs/search-input";
import React, { useEffect, useState } from "react";
import { CircleCheck, Users } from "lucide-react";
import {UserType} from "@/lib/schemas/user";

interface UserMultiSelectorProps {
    allUsers?: UserType[];
    title: string;
    description?: string;
    onValueChange?: (data: UserType) => void;
}

export const UserSingleSelector = ({
      title,
      description,
      onValueChange,
      allUsers
    }: UserMultiSelectorProps) => {
    const [users, setUsers] = useState<UserType[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<UserType>();
    const [searchTerm, setSearchTerm] = useState<string>("");

    useEffect(() => {
        setUsers(allUsers ?? []);
    }, [allUsers]);


    const toggleUser = (user: UserType) => {
        const exists = selectedUsers?.user_id === user.user_id;

        if(exists) {
            setSelectedUsers(undefined)
        }
        else {
            setSelectedUsers(user)
            onValueChange?.(user);
        }

    };

    const filteredUsers = users.filter((user) => {
        const term = searchTerm.toLowerCase();
        return (
            user.name.toLowerCase().includes(term) ||
            user.email.toLowerCase().includes(term)
        );
    });

    return (
        <Dialog>
            <DialogTrigger asChild>
                <section className="flex flex-col gap-1 bg-neutral-300 p-2 rounded-lg">
                    {selectedUsers?.user_id === undefined ? (
                        <section className="flex items-center gap-2 cursor-pointer py-1 pl-2">
                            <Users size={16} />
                            <Label className="font-medium cursor-pointer">Pick Users</Label>
                        </section>
                    ) : (

                          <section className="bg-neutral-300 rounded-lg">
                            <UserItem
                                name={selectedUsers?.name ?? "" }
                                email={selectedUsers?.email ?? ""}
                                image={selectedUsers?.image}
                                checked={true}
                            />
                          </section>
                    )}
                </section>
            </DialogTrigger>
            <DialogContent className="bg-secondary">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <section className="flex flex-col gap-4">
                    <section>
                        <SearchInput value={searchTerm} onChange={setSearchTerm} />
                    </section>
                    <section className="flex flex-col gap-1">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((user) => (
                                <UserItem
                                    key={user.email}
                                    name={user.name}
                                    email={user.email}
                                    image={user.image ?? ""}
                                    checked={selectedUsers?.user_id === user.user_id}
                                    onClick={() => toggleUser(user)}
                                />
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground px-2">
                                No users found.
                            </p>
                        )}
                    </section>
                </section>
                <DialogFooter>
                    <DialogClose className="bg-blue-300 w-[120px] flex items-center justify-center h-8 pr-1 cursor-pointer font-medium rounded-full mt-2 gap-2">
                        <CircleCheck size={16} />
                        Pick
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

interface UserItemProps {
    name: string;
    email: string;
    image? : string;
    checked: boolean;
    onClick?: () => void;
}

const UserItem = ({ name, email, image, checked, onClick }: UserItemProps) => {
    return (
        <section
            role="button"
            tabIndex={0}
            onClick={onClick}
            className="cursor-pointer flex items-center justify-between hover:bg-neutral-300 px-3 py-2 rounded-lg">
            <section className="flex items-center gap-1">
                <section id="checkbox">
                    <Checkbox
                        checked={checked}
                        onCheckedChange={() => {}} // optional: prevent user from clicking checkbox separately
                        style={
                            {
                                "--primary": "var(--color-emerald-500)",
                            } as React.CSSProperties
                        }
                        className="rounded-full"
                    />
                </section>
                <section id="image">
                    <section id="logo">
                        <Avatar>
                            <AvatarImage src={image} />
                            <AvatarFallback>SA</AvatarFallback>
                        </Avatar>
                    </section>
                </section>
                <section id="name&email">
                    <section>
                        <Label className="cursor-pointer">{name}</Label>
                    </section>
                    <section>
                        <Label className="font-normal cursor-pointer">{email}</Label>
                    </section>
                </section>
            </section>
        </section>
    );
};
