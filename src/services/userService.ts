
interface User {
  id: string;
  nome: string;
  email: string;
  tipo: string;
  ativo: boolean;
  createdAt: string;
}

// Mock data for users
const mockUsers: User[] = [
  {
    id: "1",
    nome: "João Silva",
    email: "joao.silva@email.com",
    tipo: "client",
    ativo: true,
    createdAt: "2023-01-15T10:30:00.000Z"
  },
  {
    id: "2",
    nome: "Maria Oliveira",
    email: "maria.oliveira@email.com",
    tipo: "client",
    ativo: true,
    createdAt: "2023-02-20T14:45:00.000Z"
  },
  {
    id: "3",
    nome: "Pedro Santos",
    email: "pedro.santos@email.com",
    tipo: "admin",
    ativo: true,
    createdAt: "2023-03-05T09:15:00.000Z"
  }
];

export const userService = {
  getUsers(): Promise<User[]> {
    return Promise.resolve([...mockUsers]);
  },

  getUserById(id: string): Promise<User | undefined> {
    const user = mockUsers.find(user => user.id === id);
    return Promise.resolve(user);
  },

  createUser(user: Omit<User, "id" | "createdAt">): Promise<User> {
    const newUser = {
      ...user,
      id: String(Date.now()),
      createdAt: new Date().toISOString()
    };
    mockUsers.push(newUser);
    return Promise.resolve(newUser);
  },

  updateUser(id: string, userData: Partial<User>): Promise<User | undefined> {
    const index = mockUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...userData };
      return Promise.resolve(mockUsers[index]);
    }
    return Promise.resolve(undefined);
  },

  deleteUser(id: string): Promise<boolean> {
    const index = mockUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      mockUsers.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }
};
