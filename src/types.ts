export interface Post {
  id: string;
  title: string;
  content: string;
  userId: string,
  username: string,
  pictureUrl: string,
}

export interface User { 
  id: string;
  name: string;
  firstName: string;
  username: string;
  email: string;
  clerkId: string;
  picture: string;
}

export interface Comment {
  id?: string;
  postId: string;
  userId: string;
  content: string;
}

export interface Tag {
  id?: string;
  name: string;
}

export interface PostTag {
  postId: string;
  tagId: string;
}

export interface Like {
  postId: string;
  userId: string;
}

export interface Follower {
  followerId: string;
  followingId: string;
}

export interface Media {
  id?: string,
  postId: number,
  url: string,
  mediatype: string
}