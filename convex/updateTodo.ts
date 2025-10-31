import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const updateTodo = mutation({
  args: {
    id: v.id("todos"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    completed: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // Only update fields that are provided
    const currentTodo = await ctx.db.get(id);
    if (!currentTodo) {
      throw new Error("Todo not found");
    }

    await ctx.db.patch(id, updates);
    return id;
  },
});

