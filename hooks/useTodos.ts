import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
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

