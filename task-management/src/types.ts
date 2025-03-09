export interface User {
    id: string;
    role: 'user' | 'admin';
  }
  
  export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: 'pending' | 'completed';
    user: string;
    createdAt: string;
  }