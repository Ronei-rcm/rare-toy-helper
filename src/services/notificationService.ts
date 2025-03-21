
// Serviço para gerenciar notificações em tempo real
import { toast } from "sonner";
import { BellIcon, Bell, BellDot } from "lucide-react";
import { create } from "zustand";

// Tipos de notificações
export type NotificationType = "info" | "success" | "warning" | "error";
export type NotificationCategory = "order" | "promotion" | "system" | "message";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  category: NotificationCategory;
  read: boolean;
  timestamp: Date;
  link?: string;
}

// Interface do estado de notificações
interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

// Store de notificações usando Zustand
export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  addNotification: (notification) => 
    set((state) => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        timestamp: new Date(),
        read: false,
        ...notification,
      };
      
      // Mostrar toast para notificação em tempo real
      toast(newNotification.title, {
        description: newNotification.message,
        icon: notification.category === "message" ? <Bell size={18} /> : <BellDot size={18} />,
        action: newNotification.link 
          ? { label: "Ver", onClick: () => window.location.href = newNotification.link! }
          : undefined
      });
      
      return {
        notifications: [newNotification, ...state.notifications],
        unreadCount: state.unreadCount + 1,
      };
    }),
  markAsRead: (id) => 
    set((state) => {
      const notifications = state.notifications.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      );
      const unreadCount = notifications.filter(notif => !notif.read).length;
      return { notifications, unreadCount };
    }),
  markAllAsRead: () => 
    set((state) => ({
      notifications: state.notifications.map(notif => ({ ...notif, read: true })),
      unreadCount: 0,
    })),
  clearNotifications: () => 
    set({ notifications: [], unreadCount: 0 }),
}));

// Mock para simular notificações em tempo real
export const simulateIncomingNotification = () => {
  const categories: NotificationCategory[] = ["order", "promotion", "system", "message"];
  const types: NotificationType[] = ["info", "success", "warning", "error"];
  
  const category = categories[Math.floor(Math.random() * categories.length)];
  const type = types[Math.floor(Math.random() * types.length)];
  
  const notification = {
    title: `Nova ${category === "order" ? "atualização de pedido" : 
            category === "promotion" ? "promoção" : 
            category === "system" ? "atualização do sistema" : "mensagem"}`,
    message: `Exemplo de notificação de ${category} do tipo ${type}`,
    type,
    category,
    link: category === "order" ? "/client-area" : 
          category === "promotion" ? "/" : undefined
  };
  
  useNotificationStore.getState().addNotification(notification);
};

// Serviço de WebSocket (simulado)
let wsConnection: any = null;

export const connectToNotificationService = (userId: string) => {
  // Simulação de WebSocket para notificações em tempo real
  console.log(`Conectando às notificações em tempo real para o usuário ${userId}`);
  
  // Limpar conexão existente
  if (wsConnection) {
    clearInterval(wsConnection);
  }
  
  // Simular notificações a cada 30 segundos
  wsConnection = setInterval(() => {
    if (Math.random() > 0.7) { // 30% de chance de receber notificação
      simulateIncomingNotification();
    }
  }, 30000);
  
  return () => {
    if (wsConnection) {
      clearInterval(wsConnection);
      wsConnection = null;
    }
  };
};
