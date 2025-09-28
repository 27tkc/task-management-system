export interface JwtPayload {
  id: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
}

// ===== Auth DTOs =====
export interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

// ===== Task DTOs =====
export interface TaskDTO {
  title: string;
  description: string;
  status?: 'pending' | 'in-progress' | 'done';
  assignedTo?: string; // userId
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: 'pending' | 'in-progress' | 'done';
  assignedTo?: string;
}
