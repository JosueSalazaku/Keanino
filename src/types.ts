export interface Post {
  id: number;
  title: string;
  content: string;
  userId: string,
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
  id: number;
  postId: number;
  userId: string;
  content: string;
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
}

export interface Follower {
  followerId: string;
  followingId: string;
}

export interface Media {
  id: number,
  postId: number,
  url: string,
  mediatype: string
}