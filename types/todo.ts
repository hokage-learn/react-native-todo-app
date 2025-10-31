import { Id } from "convex/values";

export type Todo = {
  _id: Id<"todos">;
  title: string;
  description?: string;
  dueDate?: number; // timestamp
  completed: boolean;
  createdAt: number;
  order: number;
};

export type CreateTodoInput = {
  title: string;
  description?: string;
  dueDate?: number;
  order?: number;
};

export type UpdateTodoInput = {
  title?: string;
  description?: string;
  dueDate?: number;
  completed?: boolean;
};

export type FilterType = "all" | "active" | "completed";

