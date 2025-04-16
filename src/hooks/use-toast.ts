
import { useState, useEffect } from "react";

type ToastType = "default" | "destructive";
type ToastAction = { label: string; onClick: () => void; altText?: string };

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactElement;
  type?: ToastType;
  duration?: number;
  onDismiss?: () => void;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  updateToast: (id: string, toast: Partial<Toast>) => void;
  dismissToast: (id: string) => void;
}

// Create a standalone toast object
export const toast = {
  // All the toast methods
  create: (props: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, ...props };
    const toastQueue = JSON.parse(localStorage.getItem('toastQueue') || '[]');
    localStorage.setItem('toastQueue', JSON.stringify([...toastQueue, newToast]));
    window.dispatchEvent(new Event('toast'));
    return id;
  },
  
  dismiss: (id: string) => {
    const toastQueue = JSON.parse(localStorage.getItem('toastQueue') || '[]');
    localStorage.setItem('toastQueue', JSON.stringify(toastQueue.filter((t: Toast) => t.id !== id)));
    window.dispatchEvent(new Event('toast'));
  },
  
  // Helper methods
  success: (title: string, description?: string) => {
    return toast.create({ title, description, duration: 3000 });
  },
  
  error: (title: string, description?: string) => {
    return toast.create({ title, description, type: "destructive", duration: 5000 });
  }
};

// Use this hook in components to access and manage toast notifications
export function useToast(): ToastContextType {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  useEffect(() => {
    const handleStorageChange = () => {
      const toastQueue = JSON.parse(localStorage.getItem('toastQueue') || '[]');
      setToasts(toastQueue);
    };
    
    window.addEventListener('toast', handleStorageChange);
    handleStorageChange(); // Initial load
    
    return () => window.removeEventListener('toast', handleStorageChange);
  }, []);
  
  const addToast = (props: Omit<Toast, "id">) => {
    toast.create(props);
  };
  
  const updateToast = (id: string, toast: Partial<Toast>) => {
    const toastQueue = JSON.parse(localStorage.getItem('toastQueue') || '[]');
    const index = toastQueue.findIndex((t: Toast) => t.id === id);
    
    if (index >= 0) {
      toastQueue[index] = { ...toastQueue[index], ...toast };
      localStorage.setItem('toastQueue', JSON.stringify(toastQueue));
      window.dispatchEvent(new Event('toast'));
    }
  };
  
  const dismissToast = (id: string) => {
    toast.dismiss(id);
  };
  
  return { toasts, addToast, updateToast, dismissToast };
}

export default useToast;
