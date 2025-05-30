
import React, { useEffect } from "react";
import { Bell, BellDot, Check, X, Tag } from "lucide-react";
import { format } from "date-fns";
import { connectToNotificationService, useNotificationStore } from "../services/notificationService";

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
    <div className="relative">
      <button className="relative p-2 rounded-full hover:bg-gray-100">
        {unreadCount > 0 ? (
          <>
            <BellDot className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs rounded-full">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          </>
        ) : (
          <Bell className="h-5 w-5" />
        )}
      </button>
      
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-semibold">Notificações</div>
          <div className="flex gap-1">
            <button
              className="p-1 text-xs hover:bg-gray-100 rounded"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="h-4 w-4 mr-1 inline" />
              <span>Marcar como lidas</span>
            </button>
            <button 
              className="p-1 text-xs hover:bg-gray-100 rounded"
              onClick={clearNotifications}
              disabled={notifications.length === 0}
            >
              <X className="h-4 w-4 mr-1 inline" />
              <span>Limpar</span>
            </button>
          </div>
        </div>
        
        <div className="border-b" />
        
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            Não há notificações
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto">
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
                      <div className="text-xs text-gray-500">
                        {format(new Date(notification.timestamp), "HH:mm")}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {notification.message}
                    </div>
                    <div className="text-xs mt-1 text-gray-500">
                      {format(new Date(notification.timestamp), "dd/MM/yyyy")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
