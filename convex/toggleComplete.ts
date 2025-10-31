import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const toggleComplete = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) {
      throw new Error("Todo not found");
    }

    await ctx.db.patch(args.id, {
      completed: !todo.completed,
    });

    return args.id;
  },
});

