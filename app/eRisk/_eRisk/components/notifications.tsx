"use client";

import { ReactNode, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BasicTooltip } from "@/components/tooltips/basic-tooltip";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const initialNotifications = [
  {
    id: 1,
    image: "https://i.pravatar.cc/150?img=32",
    user: "Chris Tompson",
    action: "requested review on",
    target: "PR #42: Feature implementation",
    timestamp: "15 minutes ago",
    unread: true,
  },
  {
    id: 2,
    image: "https://i.pravatar.cc/150?img=31",
    user: "Emma Davis",
    action: "shared",
    target: "New component library",
    timestamp: "45 minutes ago",
    unread: true,
  },
  {
    id: 3,
    image: "https://i.pravatar.cc/150?img=12",
    user: "James Wilson",
    action: "assigned you to",
    target: "API integration task",
    timestamp: "4 hours ago",
    unread: false,
  },
  {
    id: 4,
    image: "https://i.pravatar.cc/150?img=30",
    user: "Alex Morgan",
    action: "replied to your comment in",
    target: "Authentication flow",
    timestamp: "12 hours ago",
    unread: false,
  },
  {
    id: 5,
    image: "https://i.pravatar.cc/150?img=10",
    user: "Sarah Chen",
    action: "commented on",
    target: "Dashboard redesign",
    timestamp: "2 days ago",
    unread: false,
  },
  {
    id: 6,
    image: "https://i.pravatar.cc/150?img=2",
    user: "Miky Derya",
    action: "mentioned you in",
    target: "Origin UI open graph image",
    timestamp: "2 weeks ago",
    unread: false,
  },
];

interface NotificationsProps {
  children: ReactNode;
}

export default function Notifications({ children }: NotificationsProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const unreadCount = notifications.filter((n) => n.unread).length;

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        unread: false,
      }))
    );
  };

  return (
    <Popover>
      <BasicTooltip show={true} text="Notifications" side="bottom">
        <PopoverTrigger asChild>{children}</PopoverTrigger>
      </BasicTooltip>
      <PopoverContent
        className="w-[400px] relative left-[-20px] bg-white border-[1px] border-neutral-400 shadow-md shadow-blue-200"
        style={{
          boxShadow: "0 0 10px 2px rgba(59, 130, 246, 0.4)", // blue shadow all around
        }}>
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Notifications</div>
          {unreadCount > 0 && (
            <button
              className="text-xs font-medium hover:underline"
              onClick={handleMarkAllAsRead}>
              Mark all as read
            </button>
          )}
        </div>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="bg-border -mx-1 my-1 h-px"></div>
        <ul className="flex flex-col gap-1 h-[calc(100svh-150px)] overflow-y-auto">
          {initialNotifications.map((item) => (
            <NotificationItem
              key={item.id}
              user={item.user}
              timestamp={item.timestamp}
              content={item.action + " " + item.target}
              unread={item.unread}
              image={item.image}
            />
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}

interface NotificationItemProps {
  user: string;
  timestamp: string;
  content: string;
  unread: boolean;
  image: string;
}

const NotificationItem = ({
  user,
  timestamp,
  content,
  unread,
  image,
}: NotificationItemProps) => {
  return (
    <section className="flex flex-col gap-2 cursor-pointer bg-secondary p-2 rounded-md hover:bg-white transition-colors duration-400">
      <section className="flex flex-col gap-1">
        <section
          id="upper-details"
          className="flex items-start justify-between h-12">
          <section className="flex gap-1 items-start">
            <section id="logo" className="self-start">
              <Avatar className="w-10 h-10">
                <AvatarImage src={image} />
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
            </section>
            <section id="names" className="flex flex-col">
              <Label className="font-medium text-sm cursor-pointer">
                {user}
              </Label>
              <div>
                <Label className="opacity-90 text-sm font-medium leading-4 cursor-pointer">
                  {content}
                </Label>
              </div>
            </section>
          </section>
        </section>
      </section>
      <section id="time" className="flex justify-end items-center">
        <section className="flex items-center gap-1.5">
          <span className="opacity-90 text-sm font-medium leading-4 cursor-pointer">
            {timestamp}
          </span>
          {unread ? (
            <span className="flex w-2 h-2 rounded-full bg-primary"></span>
          ) : null}
        </section>
      </section>
    </section>
  );
};
