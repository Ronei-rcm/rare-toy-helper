
import React from "react";
import NotificationCenter from "./NotificationCenter";

interface NavBarNotificationsProps {
  userId?: string;
}

export default function NavBarNotifications({ userId }: NavBarNotificationsProps) {
  return (
    <div className="ml-2">
      <NotificationCenter userId={userId} />
    </div>
  );
}
