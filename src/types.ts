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
    firstName: string;
    username: string;
    email: string;
    clerkId: string;
    picture: string;
    // role: 'user' | 'Admin';
}

export interface Comment {
  id: number;
  postId: number;
  userId: string;
  content: string;
  createdAt: Date;
}

export interface Tag {
  id: number;
  name: string;
}

export interface PostTag {
  postId: number;
  tagId: number;
}

export interface Like {
  postId: number;
  userId: string;
  createdAt: Date;
}

export interface Like {
  postId: number;
  userId: string;
  createdAt: Date;
}

export interface Follower {
  followerId: string;
  followingId: string;
}