import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

