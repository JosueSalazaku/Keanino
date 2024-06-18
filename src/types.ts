// create a user interface

export interface Post {
  id: number;
  name: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User { 
    id: string;
    name: string;
    surname: string;
    username: string;
    age: number;
    email: string;
    password: string;
    role: 'user' | 'Admin';
}