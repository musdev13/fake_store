import axios from "axios";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const musAPI = {
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get<User[]>("/users");
    return response.data;
  },

  getUserPosts: async (userId: number, signal?: AbortSignal): Promise<Post[]> => {
    const response = await apiClient.get<Post[]>(`/posts`, {
      params: { userId },
      signal,
    });
    return response.data;
  },

  createPost: async (payload: { title: string; body: string; userId: number }): Promise<Post> => {
    const response = await apiClient.post<Post>("/posts", payload);
    return response.data;
  },
};