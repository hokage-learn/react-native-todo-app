import { query } from "./_generated/server";
import { v } from "convex/values";

export const listTodos = query({
  args: {},
  handler: async (ctx) => {
    const todos = await ctx.db
      .query("todos")
      .withIndex("by_order")
      .order("asc")
      .collect();
    
    return todos;
  },
});

