export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
}

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'done';
  assignedTo?: string; // userId (optional, if you want to assign tasks)
  createdAt?: string;
  updatedAt?: string;
}

export interface Role {
  role: 'ADMIN' | 'MANAGER' | 'USER';
}
