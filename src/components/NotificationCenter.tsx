
import React, { useEffect } from "react";
import { Bell, BellDot, Check, X, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { connectToNotificationService, useNotificationStore } from "@/services/notificationService";

interface NotificationCenterProps {
  userId?: string;
}

export default function NotificationCenter({ userId }: NotificationCenterProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = useNotificationStore();

  useEffect(() => {
    if (userId) {
      // Conectar ao serviço de notificações em tempo real
      const disconnect = connectToNotificationService(userId);
      
      // Limpar na desmontagem
      return () => disconnect();
    }
  }, [userId]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "order":
        return <Bell className="h-4 w-4 text-blue-500" />;
      case "promotion":
        return <Tag className="h-4 w-4 text-green-500" />;
      case "system":
        return <Bell className="h-4 w-4 text-amber-500" />;
      case "message":
        return <BellDot className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const handleNotificationClick = (id: string, link?: string) => {
    markAsRead(id);
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {unreadCount > 0 ? (
            <>
              <BellDot className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                {unreadCount > 9 ? "9+" : unreadCount}
              </Badge>
            </>
          ) : (
            <Bell className="h-5 w-5" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <div className="font-semibold">Notificações</div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="h-4 w-4 mr-1" />
              <span className="text-xs">Marcar como lidas</span>
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearNotifications}
              disabled={notifications.length === 0}
            >
              <X className="h-4 w-4 mr-1" />
              <span className="text-xs">Limpar</span>
            </Button>
          </div>
        </div>
        <Separator />
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            Não há notificações
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-1 p-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`cursor-pointer flex p-3 rounded-md hover:bg-gray-100 ${
                    !notification.read ? "bg-gray-50" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification.id, notification.link)}
                >
                  <div className="mr-3 pt-1">{getCategoryIcon(notification.category)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="font-medium">{notification.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {format(new Date(notification.timestamp), "HH:mm")}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {notification.message}
                    </div>
                    <div className="text-xs mt-1 text-muted-foreground">
                      {format(new Date(notification.timestamp), "dd/MM/yyyy")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
}
