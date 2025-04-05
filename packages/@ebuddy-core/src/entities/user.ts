export interface User { 
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    role: string; // e.g., 'admin', 'user', etc.
}