/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as createTodo from "../createTodo.js";
import type * as deleteTodo from "../deleteTodo.js";
import type * as getTodo from "../getTodo.js";
import type * as listTodos from "../listTodos.js";
import type * as reorderTodos from "../reorderTodos.js";
import type * as toggleComplete from "../toggleComplete.js";
import type * as updateTodo from "../updateTodo.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  createTodo: typeof createTodo;
  deleteTodo: typeof deleteTodo;
  getTodo: typeof getTodo;
  listTodos: typeof listTodos;
  reorderTodos: typeof reorderTodos;
  toggleComplete: typeof toggleComplete;
  updateTodo: typeof updateTodo;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
