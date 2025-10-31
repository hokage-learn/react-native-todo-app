import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const reorderTodos = mutation({
  args: {
    todoIds: v.array(v.id("todos")),
  },
  handler: async (ctx, args) => {
    // Update the order for each todo based on its position in the array
    for (let i = 0; i < args.todoIds.length; i++) {
      await ctx.db.patch(args.todoIds[i], {
        order: i,
      });
    }
    return args.todoIds;
  },
});

