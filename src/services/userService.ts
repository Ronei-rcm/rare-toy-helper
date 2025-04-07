
import { toast } from "sonner";

// Sample user data
const mockUsers = [
  {
    id: "1",
    nome: "Admin User",
    email: "admin@example.com",
    tipo: "admin",
    ativo: true,
    createdAt: "2023-01-15T10:30:00Z"
  },
  {
    id: "2",
    nome: "João Silva",
    email: "joao.silva@example.com",
    tipo: "cliente",
    ativo: true,
    createdAt: "2023-02-20T14:15:00Z"
  },
  {
    id: "3",
    nome: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    tipo: "cliente",
    ativo: true,
    createdAt: "2023-03-10T09:45:00Z"
  },
  {
    id: "4",
    nome: "Carlos Pereira",
    email: "carlos.pereira@example.com",
    tipo: "cliente",
    ativo: false,
    createdAt: "2023-04-05T16:20:00Z"
  },
  {
    id: "5",
    nome: "Ana Souza",
    email: "ana.souza@example.com",
    tipo: "cliente",
    ativo: true,
    createdAt: "2023-05-12T11:10:00Z"
  }
];

// In-memory storage
let users = [...mockUsers];

export const userService = {
  // Get all users
  getUsers: async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  },

  // Get user by ID
  getUserById: async (id: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const user = users.find(u => u.id === id);
      if (!user) {
        throw new Error("User not found");
      }
      
      return user;
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw new Error("Failed to fetch user details");
    }
  },

  // Create new user
  createUser: async (userData: Omit<typeof mockUsers[0], "id" | "createdAt">) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (users.some(u => u.email === userData.email)) {
        throw new Error("Email already in use");
      }
      
      const newUser = {
        ...userData,
        id: (users.length + 1).toString(),
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  // Update user
  updateUser: async (id: string, userData: Partial<Omit<typeof mockUsers[0], "id" | "createdAt">>) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const userIndex = users.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new Error("User not found");
      }
      
      // Check if email is being changed and if it's already in use
      if (userData.email && userData.email !== users[userIndex].email) {
        if (users.some(u => u.email === userData.email)) {
          throw new Error("Email already in use");
        }
      }
      
      users[userIndex] = {
        ...users[userIndex],
        ...userData
      };
      
      return users[userIndex];
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id: string) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const initialLength = users.length;
      users = users.filter(u => u.id !== id);
      
      if (users.length === initialLength) {
        throw new Error("User not found");
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }
};
