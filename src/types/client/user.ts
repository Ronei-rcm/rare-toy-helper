
import { Address } from './address';

// User and profile related types

export interface UserPreferences {
  newsletter?: boolean;
  notifications?: boolean;
  darkMode?: boolean;
}

export interface UserProfile {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  address?: Address;
  addresses?: Address[];
  notificationPreferences?: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
}

export interface User {
  id: string;
  nome: string;
  email: string;
  tipo: 'admin' | 'client';
  ativo: boolean;
  endereco?: Address;
  telefone?: string;
  preferences?: UserPreferences;
}
