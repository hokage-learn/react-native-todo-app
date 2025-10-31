import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createTodo = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    order: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // If no order is provided, get the max order and add 1
    let order = args.order;
    if (order === undefined) {
      const todos = await ctx.db
        .query("todos")
        .withIndex("by_order")
        .order("desc")
        .first();
      order = todos ? todos.order + 1 : 0;
    }

    const todoId = await ctx.db.insert("todos", {
      title: args.title,
      description: args.description,
      dueDate: args.dueDate,
      completed: false,
      createdAt: Date.now(),
      order: order,
    });

    return todoId;
  },
});

