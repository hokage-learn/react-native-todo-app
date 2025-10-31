import { useQuery, useMutation } from "convex/react";
// Note: convex/_generated/api will be created when you run 'npx convex dev'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - Generated file
import { api } from "../convex/_generated/api";
import { CreateTodoInput, UpdateTodoInput } from "../types/todo";

export const useTodos = () => {
  return useQuery(api.listTodos.listTodos);
};

export const useCreateTodo = () => {
  return useMutation(api.createTodo.createTodo);
};

export const useUpdateTodo = () => {
  return useMutation(api.updateTodo.updateTodo);
};

export const useDeleteTodo = () => {
  return useMutation(api.deleteTodo.deleteTodo);
};

export const useToggleComplete = () => {
  return useMutation(api.toggleComplete.toggleComplete);
};

export const useReorderTodos = () => {
  return useMutation(api.reorderTodos.reorderTodos);
};

