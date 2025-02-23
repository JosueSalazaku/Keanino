import axios from "axios";
import type { Post } from "~/types";

export const getAllPosts = async () => {
  try {
    const response = await axios.get("api/posts");
    console.log(response.data);

    if (response.status === 200 || response.status === 201) {
      return response.data as Post[];
    }
  } catch (error) {
    console.error("Error fetching All posts:", error);
    throw new Error("Could not fetch All posts Please try again.");
  }
};
export const addPost = async (title: string, content: string, userId: string) => {
  try {
    const data = { title, content, userId };
    const response = await axios.post("/api/posts", data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

      if (response.status === 200 || response.status === 201) {
        console.log("Post added succesfully", response.data);

      return response.data as Post[];
    } else {
      throw new Error("Failed to add post");
    }
  } catch (error) {
    console.error("Error adding post:", error);
    throw new Error("Could not add post. Please try again.");
  }
};